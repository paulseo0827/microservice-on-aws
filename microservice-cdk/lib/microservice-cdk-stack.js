"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ec2 = require("@aws-cdk/aws-ec2");
const ecr = require("@aws-cdk/aws-ecr");
const cdk = require("@aws-cdk/core");
const eks = require("@aws-cdk/aws-eks");
const iam = require("@aws-cdk/aws-iam");
const codebuild = require("@aws-cdk/aws-codebuild");
const codecommit = require("@aws-cdk/aws-codecommit");
const targets = require("@aws-cdk/aws-events-targets");
class MicroserviceCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpc = new ec2.Vpc(this, 'microservice-vpc', {
            cidr: '10.0.0.0/16',
            maxAzs: 3,
            natGateways: 1
        });
        const eksClusterAdmin = new iam.Role(this, 'AdminRole', {
            assumedBy: new iam.AccountRootPrincipal()
        });
        const eksClusterName = 'microservice';
        const cluster = new eks.Cluster(this, 'microserviceEksCluster', {
            vpc,
            clusterName: `${eksClusterName}`,
            version: eks.KubernetesVersion.V1_16,
            defaultCapacity: 0,
            mastersRole: eksClusterAdmin,
            outputClusterName: true,
            outputMastersRoleArn: true
        });
        cluster.addResource('namespace', {
            apiVersion: 'v1',
            kind: 'Namespace',
            metadata: { name: 'microservice' }
        });
        const nodegroup1 = cluster.addCapacity('microservice-ng1', {
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.M5, ec2.InstanceSize.LARGE),
            associatePublicIpAddress: false,
            bootstrapEnabled: true,
            desiredCapacity: 3,
            minCapacity: 3,
            maxCapacity: 10,
            mapRole: true
        });
        nodegroup1.addToRolePolicy(new iam.PolicyStatement({ effect: iam.Effect.ALLOW, resources: ['*'],
            actions: ['appmesh:*', 'servicediscovery:CreateService', 'servicediscovery:GetService', 'servicediscovery:RegisterInstance', 'servicediscovery:DeregisterInstance', 'servicediscovery:ListInstances', 'servicediscovery:ListNamespaces', 'servicediscovery:ListServices', 'route53:GetHealthCheck', 'route53:CreateHealthCheck', 'route53:UpdateHealthCheck', 'route53:ChangeResourceRecordSets', 'route53:DeleteHealthCheck'] }));
        nodegroup1.addToRolePolicy(new iam.PolicyStatement({ effect: iam.Effect.ALLOW, resources: ['*'],
            actions: ['autoscaling:DescribeAutoScalingGroups', 'autoscaling:DescribeAutoScalingInstances', 'autoscaling:DescribeLaunchConfigurations', 'autoscaling:DescribeTags', 'autoscaling:SetDesiredCapacity', 'autoscaling:TerminateInstanceInAutoScalingGroup', 'ec2:DescribeLaunchTemplateVersions'] }));
        nodegroup1.addToRolePolicy(new iam.PolicyStatement({ effect: iam.Effect.ALLOW, resources: ['*'],
            actions: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords', 'xray:GetSamplingRules', 'xray:GetSamplingTargets', 'xray:GetSamplingStatisticSummaries'] }));
        nodegroup1.addToRolePolicy(new iam.PolicyStatement({ effect: iam.Effect.ALLOW, resources: ['*'],
            actions: ['cloudwatch:PutMetricData', 'ec2:DescribeVolumes', 'ec2:DescribeTags', 'logs:PutLogEvents', 'logs:DescribeLogStreams', 'logs:DescribeLogGroups', 'logs:CreateLogStream', 'logs:CreateLogGroup'] }));
        nodegroup1.addToRolePolicy(new iam.PolicyStatement({ effect: iam.Effect.ALLOW, resources: ['arn:aws:ssm:*:*:parameter/AmazonCloudWatch-*'],
            actions: ['ssm:GetParameter'] }));
        var applicationList;
        applicationList = ['adservice', 'cartservice', 'checkoutservice', 'currencyservice',
            'emailservice', 'frontend', 'paymentservice', 'productcatalogservice',
            'recommendationservice', 'shippingservice'];
        for (let index = 0; index < applicationList.length; index++) {
            const applicationName = applicationList[index];
            const ecrRepository = new ecr.Repository(this, `${applicationName}ECRRepository`, {
                repositoryName: `${applicationName}`
            });
            const codecommitRepository = new codecommit.Repository(this, `${applicationName}CodecommitRepository`, {
                repositoryName: `${applicationName}-repo`
            });
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
            });
            codecommitRepository.onCommit('OnCommit', {
                target: new targets.CodeBuildProject(codebuild.Project.fromProjectArn(this, `${applicationName}OnCommitEvent`, codebuildProject.projectArn))
            });
            ecrRepository.grantPullPush(codebuildProject.role);
            cluster.awsAuth.addMastersRole(codebuildProject.role);
            codebuildProject.addToRolePolicy(new iam.PolicyStatement({
                actions: ['eks:DescribeCluster'],
                resources: [`${cluster.clusterArn}`],
            }));
        }
    }
}
exports.MicroserviceCdkStack = MicroserviceCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm9zZXJ2aWNlLWNkay1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pY3Jvc2VydmljZS1jZGstc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBeUM7QUFDekMsd0NBQXlDO0FBQ3pDLHFDQUFzQztBQUN0Qyx3Q0FBeUM7QUFDekMsd0NBQXlDO0FBQ3pDLG9EQUFxRDtBQUNyRCxzREFBdUQ7QUFDdkQsdURBQXdEO0FBRXhELE1BQWEsb0JBQXFCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDakQsWUFBWSxLQUFjLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDaEQsSUFBSSxFQUFFLGFBQWE7WUFDbkIsTUFBTSxFQUFFLENBQUM7WUFDVCxXQUFXLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQTtRQUVGLE1BQU0sZUFBZSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3RELFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTtTQUMxQyxDQUFDLENBQUM7UUFFSCxNQUFNLGNBQWMsR0FBRyxjQUFjLENBQUE7UUFFckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUM5RCxHQUFHO1lBQ0gsV0FBVyxFQUFFLEdBQUcsY0FBYyxFQUFFO1lBQ2hDLE9BQU8sRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSztZQUNwQyxlQUFlLEVBQUUsQ0FBQztZQUNsQixXQUFXLEVBQUUsZUFBZTtZQUM1QixpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLG9CQUFvQixFQUFFLElBQUk7U0FD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PSByZXF1aXJlKCdAYXdzLWNkay9hd3MtZWMyJyk7XG5pbXBvcnQgZWNyID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWVjcicpO1xuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NvcmUnKTtcbmltcG9ydCBla3MgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtZWtzJyk7XG5pbXBvcnQgaWFtID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWlhbScpO1xuaW1wb3J0IGNvZGVidWlsZCA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1jb2RlYnVpbGQnKTtcbmltcG9ydCBjb2RlY29tbWl0ID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWNvZGVjb21taXQnKTtcbmltcG9ydCB0YXJnZXRzID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWV2ZW50cy10YXJnZXRzJyk7XG5cbmV4cG9ydCBjbGFzcyBNaWNyb3NlcnZpY2VDZGtTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB2cGMgPSBuZXcgZWMyLlZwYyh0aGlzLCAnbWljcm9zZXJ2aWNlLXZwYycsIHtcbiAgICAgIGNpZHI6ICcxMC4wLjAuMC8xNicsXG4gICAgICBtYXhBenM6IDMsXG4gICAgICBuYXRHYXRld2F5czogMVxuICAgIH0pXG5cbiAgICBjb25zdCBla3NDbHVzdGVyQWRtaW4gPSBuZXcgaWFtLlJvbGUodGhpcywgJ0FkbWluUm9sZScsIHtcbiAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5BY2NvdW50Um9vdFByaW5jaXBhbCgpXG4gICAgfSk7XG5cbiAgICBjb25zdCBla3NDbHVzdGVyTmFtZSA9ICdtaWNyb3NlcnZpY2UnXG5cbiAgICBjb25zdCBjbHVzdGVyID0gbmV3IGVrcy5DbHVzdGVyKHRoaXMsICdtaWNyb3NlcnZpY2VFa3NDbHVzdGVyJywge1xuICAgICAgdnBjLFxuICAgICAgY2x1c3Rlck5hbWU6IGAke2Vrc0NsdXN0ZXJOYW1lfWAsXG4gICAgICB2ZXJzaW9uOiBla3MuS3ViZXJuZXRlc1ZlcnNpb24uVjFfMTQsXG4gICAgICBkZWZhdWx0Q2FwYWNpdHk6IDAsXG4gICAgICBtYXN0ZXJzUm9sZTogZWtzQ2x1c3RlckFkbWluLFxuICAgICAgb3V0cHV0Q2x1c3Rlck5hbWU6IHRydWUsXG4gICAgICBvdXRwdXRNYXN0ZXJzUm9sZUFybjogdHJ1ZVxuICAgIH0pO1xuXG4gICAgY2x1c3Rlci5hZGRSZXNvdXJjZSgnbmFtZXNwYWNlJywge1xuICAgICAgYXBpVmVyc2lvbjogJ3YxJyxcbiAgICAgIGtpbmQ6ICdOYW1lc3BhY2UnLFxuICAgICAgbWV0YWRhdGE6IHsgbmFtZTogJ21pY3Jvc2VydmljZScgfVxuICAgIH0pXG5cbiAgICBjb25zdCBub2RlZ3JvdXAxID0gY2x1c3Rlci5hZGRDYXBhY2l0eSgnbWljcm9zZXJ2aWNlLW5nMScsIHtcbiAgICAgIGluc3RhbmNlVHlwZTogZWMyLkluc3RhbmNlVHlwZS5vZihlYzIuSW5zdGFuY2VDbGFzcy5NNSwgZWMyLkluc3RhbmNlU2l6ZS5MQVJHRSksXG4gICAgICBhc3NvY2lhdGVQdWJsaWNJcEFkZHJlc3M6IGZhbHNlLFxuICAgICAgYm9vdHN0cmFwRW5hYmxlZDogdHJ1ZSxcbiAgICAgIGRlc2lyZWRDYXBhY2l0eTogMyxcbiAgICAgIG1pbkNhcGFjaXR5OiAzLFxuICAgICAgbWF4Q2FwYWNpdHk6IDEwLFxuICAgICAgbWFwUm9sZTogdHJ1ZVxuICAgIH0pO1xuXG5cbiAgICBub2RlZ3JvdXAxLmFkZFRvUm9sZVBvbGljeShcbiAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHsgZWZmZWN0OiBpYW0uRWZmZWN0LkFMTE9XLHJlc291cmNlczogWycqJ10sXG4gICAgICBhY3Rpb25zOiBbJ2FwcG1lc2g6KicsJ3NlcnZpY2VkaXNjb3Zlcnk6Q3JlYXRlU2VydmljZScsJ3NlcnZpY2VkaXNjb3Zlcnk6R2V0U2VydmljZScsJ3NlcnZpY2VkaXNjb3Zlcnk6UmVnaXN0ZXJJbnN0YW5jZScsJ3NlcnZpY2VkaXNjb3Zlcnk6RGVyZWdpc3Rlckluc3RhbmNlJywnc2VydmljZWRpc2NvdmVyeTpMaXN0SW5zdGFuY2VzJywnc2VydmljZWRpc2NvdmVyeTpMaXN0TmFtZXNwYWNlcycsJ3NlcnZpY2VkaXNjb3Zlcnk6TGlzdFNlcnZpY2VzJywncm91dGU1MzpHZXRIZWFsdGhDaGVjaycsJ3JvdXRlNTM6Q3JlYXRlSGVhbHRoQ2hlY2snLCdyb3V0ZTUzOlVwZGF0ZUhlYWx0aENoZWNrJywncm91dGU1MzpDaGFuZ2VSZXNvdXJjZVJlY29yZFNldHMnLCdyb3V0ZTUzOkRlbGV0ZUhlYWx0aENoZWNrJ119KVxuICAgICk7XG5cbiAgICBub2RlZ3JvdXAxLmFkZFRvUm9sZVBvbGljeShcbiAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHsgZWZmZWN0OiBpYW0uRWZmZWN0LkFMTE9XLHJlc291cmNlczogWycqJ10sXG4gICAgICBhY3Rpb25zOiBbJ2F1dG9zY2FsaW5nOkRlc2NyaWJlQXV0b1NjYWxpbmdHcm91cHMnLCdhdXRvc2NhbGluZzpEZXNjcmliZUF1dG9TY2FsaW5nSW5zdGFuY2VzJywnYXV0b3NjYWxpbmc6RGVzY3JpYmVMYXVuY2hDb25maWd1cmF0aW9ucycsJ2F1dG9zY2FsaW5nOkRlc2NyaWJlVGFncycsJ2F1dG9zY2FsaW5nOlNldERlc2lyZWRDYXBhY2l0eScsJ2F1dG9zY2FsaW5nOlRlcm1pbmF0ZUluc3RhbmNlSW5BdXRvU2NhbGluZ0dyb3VwJywnZWMyOkRlc2NyaWJlTGF1bmNoVGVtcGxhdGVWZXJzaW9ucyddfSlcbiAgICApO1xuXG4gICAgbm9kZWdyb3VwMS5hZGRUb1JvbGVQb2xpY3koXG4gICAgICBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7IGVmZmVjdDogaWFtLkVmZmVjdC5BTExPVyxyZXNvdXJjZXM6IFsnKiddLFxuICAgICAgYWN0aW9uczogWyd4cmF5OlB1dFRyYWNlU2VnbWVudHMnLCd4cmF5OlB1dFRlbGVtZXRyeVJlY29yZHMnLCd4cmF5OkdldFNhbXBsaW5nUnVsZXMnLCd4cmF5OkdldFNhbXBsaW5nVGFyZ2V0cycsJ3hyYXk6R2V0U2FtcGxpbmdTdGF0aXN0aWNTdW1tYXJpZXMnXX0pXG4gICAgKTtcblxuICAgIG5vZGVncm91cDEuYWRkVG9Sb2xlUG9saWN5KFxuICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoeyBlZmZlY3Q6IGlhbS5FZmZlY3QuQUxMT1cscmVzb3VyY2VzOiBbJyonXSxcbiAgICAgIGFjdGlvbnM6IFsnY2xvdWR3YXRjaDpQdXRNZXRyaWNEYXRhJywnZWMyOkRlc2NyaWJlVm9sdW1lcycsJ2VjMjpEZXNjcmliZVRhZ3MnLCdsb2dzOlB1dExvZ0V2ZW50cycsJ2xvZ3M6RGVzY3JpYmVMb2dTdHJlYW1zJywnbG9nczpEZXNjcmliZUxvZ0dyb3VwcycsJ2xvZ3M6Q3JlYXRlTG9nU3RyZWFtJywnbG9nczpDcmVhdGVMb2dHcm91cCddfSlcbiAgICApO1xuXG4gICAgbm9kZWdyb3VwMS5hZGRUb1JvbGVQb2xpY3koXG4gICAgICBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7IGVmZmVjdDogaWFtLkVmZmVjdC5BTExPVyxyZXNvdXJjZXM6IFsnYXJuOmF3czpzc206KjoqOnBhcmFtZXRlci9BbWF6b25DbG91ZFdhdGNoLSonXSxcbiAgICAgIGFjdGlvbnM6IFsnc3NtOkdldFBhcmFtZXRlciddfSlcbiAgICApO1xuXG4gICAgdmFyIGFwcGxpY2F0aW9uTGlzdDpzdHJpbmdbXTtcbiAgICBhcHBsaWNhdGlvbkxpc3QgPSBbJ2Fkc2VydmljZScsJ2NhcnRzZXJ2aWNlJywnY2hlY2tvdXRzZXJ2aWNlJywnY3VycmVuY3lzZXJ2aWNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdlbWFpbHNlcnZpY2UnLCdmcm9udGVuZCcsJ3BheW1lbnRzZXJ2aWNlJywncHJvZHVjdGNhdGFsb2dzZXJ2aWNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZWNvbW1lbmRhdGlvbnNlcnZpY2UnLCdzaGlwcGluZ3NlcnZpY2UnXVxuXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFwcGxpY2F0aW9uTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGFwcGxpY2F0aW9uTmFtZSA9IGFwcGxpY2F0aW9uTGlzdFtpbmRleF07XG5cbiAgICAgIGNvbnN0IGVjclJlcG9zaXRvcnkgPSBuZXcgZWNyLlJlcG9zaXRvcnkodGhpcywgYCR7YXBwbGljYXRpb25OYW1lfUVDUlJlcG9zaXRvcnlgLCB7XG4gICAgICAgIHJlcG9zaXRvcnlOYW1lOiBgJHthcHBsaWNhdGlvbk5hbWV9YFxuICAgICAgfSk7XG4gIFxuICAgICAgY29uc3QgY29kZWNvbW1pdFJlcG9zaXRvcnkgPSBuZXcgY29kZWNvbW1pdC5SZXBvc2l0b3J5KHRoaXMsIGAke2FwcGxpY2F0aW9uTmFtZX1Db2RlY29tbWl0UmVwb3NpdG9yeWAsIHtcbiAgICAgICAgcmVwb3NpdG9yeU5hbWU6IGAke2FwcGxpY2F0aW9uTmFtZX0tcmVwb2BcbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGNvZGVidWlsZFByb2plY3QgPSBuZXcgY29kZWJ1aWxkLlByb2plY3QodGhpcywgYCR7YXBwbGljYXRpb25OYW1lfUNvZGVidWlsZFByb2plY3RgLCB7XG4gICAgICAgIHByb2plY3ROYW1lOiBgJHthcHBsaWNhdGlvbk5hbWV9LWJ1aWxkYCxcbiAgICAgICAgc291cmNlOiBjb2RlYnVpbGQuU291cmNlLmNvZGVDb21taXQoeyByZXBvc2l0b3J5OiBjb2RlY29tbWl0UmVwb3NpdG9yeSB9KSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICBidWlsZEltYWdlOiBjb2RlYnVpbGQuTGludXhCdWlsZEltYWdlLlNUQU5EQVJEXzNfMCxcbiAgICAgICAgICBwcml2aWxlZ2VkOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGVudmlyb25tZW50VmFyaWFibGVzOiB7XG4gICAgICAgICAgJ0NMVVNURVJfTkFNRSc6IHtcbiAgICAgICAgICAgIHZhbHVlOiBgJHtjbHVzdGVyLmNsdXN0ZXJOYW1lfWBcbiAgICAgICAgICB9LFxuICAgICAgICAgICdFQ1JfUkVQT19VUkknOiB7XG4gICAgICAgICAgICB2YWx1ZTogYCR7ZWNyUmVwb3NpdG9yeS5yZXBvc2l0b3J5VXJpfWBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkU3BlYzogY29kZWJ1aWxkLkJ1aWxkU3BlYy5mcm9tT2JqZWN0KHtcbiAgICAgICAgICB2ZXJzaW9uOiBcIjAuMlwiLFxuICAgICAgICAgIHBoYXNlczoge1xuICAgICAgICAgICAgcHJlX2J1aWxkOiB7XG4gICAgICAgICAgICAgIGNvbW1hbmRzOiBbXG4gICAgICAgICAgICAgICAgJ2VudicsXG4gICAgICAgICAgICAgICAgJ2V4cG9ydCBUQUc9JHtDT0RFQlVJTERfUkVTT0xWRURfU09VUkNFX1ZFUlNJT059JyxcbiAgICAgICAgICAgICAgICBcIndnZXQgLU8gL3Vzci9sb2NhbC9iaW4va3ViZWN0bCBodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20va3ViZXJuZXRlcy1yZWxlYXNlL3JlbGVhc2UvdjEuMTcuMC9iaW4vbGludXgvYW1kNjQva3ViZWN0bFwiLFxuICAgICAgICAgICAgICAgIFwiY2htb2QgK3ggL3Vzci9sb2NhbC9iaW4va3ViZWN0bFwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgICBjb21tYW5kczogW1xuICAgICAgICAgICAgICAgIGBkb2NrZXIgYnVpbGQgLXQgJEVDUl9SRVBPX1VSSTokVEFHIC5gLFxuICAgICAgICAgICAgICAgIGBkb2NrZXIgYnVpbGQgLXQgJEVDUl9SRVBPX1VSSTpsYXRlc3QgLmAsXG4gICAgICAgICAgICAgICAgJyQoYXdzIGVjciBnZXQtbG9naW4gLS1uby1pbmNsdWRlLWVtYWlsKScsXG4gICAgICAgICAgICAgICAgJ2RvY2tlciBwdXNoICRFQ1JfUkVQT19VUkk6JFRBRycsXG4gICAgICAgICAgICAgICAgJ2RvY2tlciBwdXNoICRFQ1JfUkVQT19VUkk6bGF0ZXN0J1xuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9zdF9idWlsZDoge1xuICAgICAgICAgICAgICBjb21tYW5kczogW1xuICAgICAgICAgICAgICAgIFwiYXdzIGVrcyB1cGRhdGUta3ViZWNvbmZpZyAtLW5hbWUgbWljcm9zZXJ2aWNlIC0tdmVyYm9zZVwiLFxuICAgICAgICAgICAgICAgICdrdWJlY3RsIGdldCBubycsXG4gICAgICAgICAgICAgICAgYHNlZCBzJUlNQUdFX1RBR19QTEFDRUhPTERFUiUkRUNSX1JFUE9fVVJJOiRUQUclIGs4cy8ke2FwcGxpY2F0aW9uTmFtZX0ueWFtbCB8IGt1YmVjdGwgLW4gJHtla3NDbHVzdGVyTmFtZX0gYXBwbHkgLWYgLSAtLXJlY29yZGBcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIFxuICAgICAgY29kZWNvbW1pdFJlcG9zaXRvcnkub25Db21taXQoJ09uQ29tbWl0Jywge1xuICAgICAgICB0YXJnZXQ6IG5ldyB0YXJnZXRzLkNvZGVCdWlsZFByb2plY3QoY29kZWJ1aWxkLlByb2plY3QuZnJvbVByb2plY3RBcm4odGhpcywgYCR7YXBwbGljYXRpb25OYW1lfU9uQ29tbWl0RXZlbnRgLCBjb2RlYnVpbGRQcm9qZWN0LnByb2plY3RBcm4pKVxuICAgICAgfSk7XG4gIFxuICAgICAgZWNyUmVwb3NpdG9yeS5ncmFudFB1bGxQdXNoKGNvZGVidWlsZFByb2plY3Qucm9sZSEpXG4gICAgICBjbHVzdGVyLmF3c0F1dGguYWRkTWFzdGVyc1JvbGUoY29kZWJ1aWxkUHJvamVjdC5yb2xlISlcbiAgICAgIGNvZGVidWlsZFByb2plY3QuYWRkVG9Sb2xlUG9saWN5KG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgYWN0aW9uczogWydla3M6RGVzY3JpYmVDbHVzdGVyJ10sXG4gICAgICAgIHJlc291cmNlczogW2Ake2NsdXN0ZXIuY2x1c3RlckFybn1gXSxcbiAgICAgIH0pKVxuICAgICAgXG4gICAgfVxuICB9XG59XG4iXX0=
