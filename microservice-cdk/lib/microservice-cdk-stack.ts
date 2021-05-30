import ec2 = require('@aws-cdk/aws-ec2');
import ecr = require('@aws-cdk/aws-ecr');
import cdk = require('@aws-cdk/core');
import eks = require('@aws-cdk/aws-eks');
import iam = require('@aws-cdk/aws-iam');
import {
	  AccountRootPrincipal,
	    ManagedPolicy,
	      Role,
} from '@aws-cdk/aws-iam';
import codebuild = require('@aws-cdk/aws-codebuild');
import codecommit = require('@aws-cdk/aws-codecommit');
import targets = require('@aws-cdk/aws-events-targets');

export class MicroserviceCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'microservice-vpc', {
      cidr: '10.0.0.0/16',
      maxAzs: 3,
      natGateways: 1
    })


    const eksClusterAdmin = new iam.Role(this, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    eksClusterAdmin.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSClusterPolicy'));
    eksClusterAdmin.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSServicePolicy'));

    const eksNodeRole = new iam.Role(this, 'NodeRole', {
      //assumedBy: new iam.AccountRootPrincipal(),
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
    });

    eksNodeRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSWorkerNodePolicy'));
    eksNodeRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryReadOnly'));
    eksNodeRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonEKS_CNI_Policy'));
    eksNodeRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('CloudWatchAgentServerPolicy'));


    const eksClusterName = 'microservice'

    const cluster = new eks.Cluster(this, 'microserviceEksCluster', {
      vpc,
      clusterName: `${eksClusterName}`,
      version: eks.KubernetesVersion.V1_19,
      defaultCapacity: 0,
      mastersRole: eksClusterAdmin,
      outputClusterName: true,
      outputMastersRoleArn: true
    });


    cluster.addManifest('namespace', {	
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: { name: 'microservice' }
    })


    const nodegroup1 = cluster.addNodegroupCapacity('microservice-ng1', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.M5, ec2.InstanceSize.LARGE),
      //associatePublicIpAddress: false,
      //bootstrapEnabled: true,
      desiredSize: 3,
      minSize: 3,
      maxSize: 10,
      nodeRole: eksNodeRole
      //mapRole: true
    });


    var applicationList:string[];
    applicationList = ['adservice','cartservice','checkoutservice','currencyservice',
                        'emailservice','frontend','paymentservice','productcatalogservice',
                        'recommendationservice','shippingservice']

    for (let index = 0; index < applicationList.length; index++) {
      const applicationName = applicationList[index];

      const ecrRepository = new ecr.Repository(this, `${applicationName}ECRRepository`, {
        repositoryName: `${applicationName}`
      });
  
      const codecommitRepository = new codecommit.Repository(this, `${applicationName}CodecommitRepository`, {
        repositoryName: `${applicationName}-repo`
      })

      const codebuildProject = new codebuild.Project(this, `${applicationName}CodebuildProject`, {
        projectName: `${applicationName}-build`,
        source: codebuild.Source.codeCommit({ repository: codecommitRepository }),
        environment: {
          buildImage: codebuild.LinuxBuildImage.STANDARD_3_0,
          privileged: true
        },
        environmentVariables: {
          'CLUSTER_NAME': {
            value: `${cluster.clusterName}`
          },
          'ECR_REPO_URI': {
            value: `${ecrRepository.repositoryUri}`
          }
        },
        buildSpec: codebuild.BuildSpec.fromObject({
          version: "0.2",
          phases: {
            pre_build: {
              commands: [
                'env',
                'export TAG=${CODEBUILD_RESOLVED_SOURCE_VERSION}',
                "wget -O /usr/local/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/v1.17.0/bin/linux/amd64/kubectl",
                "chmod +x /usr/local/bin/kubectl"
              ]
            },
            build: {
              commands: [
                `docker build -t $ECR_REPO_URI:$TAG .`,
                `docker build -t $ECR_REPO_URI:latest .`,
                '$(aws ecr get-login --no-include-email)',
                'docker push $ECR_REPO_URI:$TAG',
                'docker push $ECR_REPO_URI:latest'
              ]
            },
            post_build: {
              commands: [
                "aws eks update-kubeconfig --name microservice --verbose",
                'kubectl get no',
                `sed s%IMAGE_TAG_PLACEHOLDER%$ECR_REPO_URI:$TAG% k8s/${applicationName}.yaml | kubectl -n ${eksClusterName} apply -f - --record`
              ]
            }
          }
        })
      })
  
      codecommitRepository.onCommit('OnCommit', {
        target: new targets.CodeBuildProject(codebuild.Project.fromProjectArn(this, `${applicationName}OnCommitEvent`, codebuildProject.projectArn))
      });
  
      ecrRepository.grantPullPush(codebuildProject.role!)
      cluster.awsAuth.addMastersRole(codebuildProject.role!)
      codebuildProject.addToRolePolicy(new iam.PolicyStatement({
        actions: ['eks:DescribeCluster'],
        resources: [`${cluster.clusterArn}`],
      }))
      
    }
  }
}
