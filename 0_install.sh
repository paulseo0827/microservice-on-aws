sudo yum update; 

# install kubectl
sudo curl --silent --location -o /usr/local/bin/kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.15.10/2020-02-22/bin/linux/amd64/kubectl
sudo chmod +x /usr/local/bin/kubectl

# update awscli
sudo pip install --upgrade awscli && hash -r

# install jq, envsubst
sudo yum -y install jq gettext bash-completion moreutils

# install eksctl
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp

sudo mv -v /tmp/eksctl /usr/local/bin

# install node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

# install aws cdk 
npm install -g aws-cdk

# install glooctl
curl -sL https://run.solo.io/gloo/install | sh
sudo cp ~/.gloo/bin/glooctl /usr/local/bin

# codecommit
git config --global credential.helper '!aws codecommit credential-helper $@'
git config --global credential.Usehttppath true

# check
echo "##### kubectl version check #####"
kubectl version --short

echo "##### eksctl version check #####"
eksctl version

echo "##### cdk version check #####"
cdk version

echo "##### glooctl version check #####"
glooctl version
