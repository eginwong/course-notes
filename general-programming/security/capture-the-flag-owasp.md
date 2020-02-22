# Capture the Flag OWASP Juice Shop
[ref](https://pwning.owasp-juice.shop/)

- need to determine configuration of CTF server
  - prepare config file
```yaml
ctfFramework: CTFd
juiceShopUrl: https://juice-shop.herokuapp.com
ctfKey: .ctfd_secret_key # OVERRIDE can also be actual key instead URL
countryMapping: https://raw.githubusercontent.com/bkimminich/juice-shop/master/config/fbctf.yml # ignored for CTFd and RootTheBox
insertHints: free
insertHintUrls: free
```
- do we want to theme this?
- figure out how to distribute or run on each person's computer
  - node.js + specifically generated key?
  - could do packaged distributions (that's not so hard)
  - EW: Should we host juicyCTF on Azure instance and then connect indepedently?
    - TODO: TEST THIS

- NOTE: doesn't work with Azure because missing load balancer + ip guide
- running kubernetes on Azure (make sure `helm` is installed)
  - `az login`
  - `az group create --location canadacentral --name juicy-ctf`
  - `az aks create --resource-group juicy-ctf --name juicy-k8s --node-count 2`
  - `az aks get-credentials --resource-group juicy-ctf --name juicy-k8s`
  - `helm repo add juicy-ctf https://iteratec.github.io/juicy-ctf/`
  - `helm install juicy-ctf juicy-ctf/juicy-ctf`

## Step #0-1: create ctfd key
- You can also run python -c "import os; f=open('.ctfd_secret_key', 'a+'); f.write(os.urandom(64)); f.close()" within the CTFd repo to generate a .ctfd_secret_key file.

## Step #0: create CTFd server
- `git clone https://github.com/CTFd/CTFd.git`
- `git checkout tags/2.1.5`
- `pip install -r requirements.txt`
- `docker build -t ctfd-avanade .`
- `// publish docker image to a registry so that it can get pulled from Azure; using Docker Registry for freebies`
- `docker tag ctfd-avanade eginwong/ctfd-avanade:1`
- `docker push eginwong/ctfd-avanade:1`
- `az group create --name owasp-juice-shop --location canadacentral`
- `az container create --resource-group owasp-juice-shop --name ctfd-avanade --image eginwong/ctfd-avanade:1 --dns-name-label scoreboard --ports 8000 --ip-address public`

## Step #0a: create custom image
- `git clone https://github.com/bkimminich/juice-shop`
- add custom yaml file under `/config`
- `docker build -t juice-shop-avanade .`
- `// publish docker image to a registry so that it can get pulled from Azure; using Docker Registry for freebies`
- `docker tag juice-shop-avanade eginwong/juice-shop-avanade:1`
- `docker push eginwong/juice-shop-avanade:1`

## Step #1: create instances

- running from Azure Container Instance
  - `az group create --name owasp-juice-shop --location canadacentral`
  - `az container create --resource-group owasp-juice-shop --name team-1 --image eginwong/juice-shop-avanade:1 --dns-name-label ava-juice-shop --ports 3000 --ip-address public --environment-variables 'NODE_ENV'='avanade' 'CTF_KEY'=.ctfd_secret_key`
  - `az container create --resource-group owasp-juice-shop --name team-2 --image eginwong/juice-shop-avanade:1 --dns-name-label ava-juice-shop2 --ports 3000 --ip-address public --environment-variables 'NODE_ENV'='avanade' 'CTF_KEY'=.ctfd_secret_key`
  - go to `http://ava-juice-shop.canadacentral.azurecontainer.io:3000`
  - go to `http://ava-juice-shop2.canadacentral.azurecontainer.io:3000`

- once complete, remember to delete resources
- `az container delete --name team-1 --resource-group owasp-juice-shop`
- `az container delete --name team-2 --resource-group owasp-juice-shop`
- `az container delete --name ctfd-avanade --resource-group owasp-juice-shop`