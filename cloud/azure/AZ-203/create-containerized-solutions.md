# Create Containerized Solutions

- container is lightweight alternative to virtual machines, smaller less expensive, fast to start-up, self-contained
- docker is the de-facto container application
  - leading open-source containerization platform
  - supported natively in Azure
  - client: CLI to interface with Docker
  - Dockerfile: text to assemble a Docker image
  - Image: hierarchies of files built from a Dockerfile
  - container: running instance of an image from `docker run`
  - Registry: image repository
  - build and run docker image
    - `docker build -t aspnetapp .`
    - `docker run -p 8080:80 --name myapp aspnetapp`
- docker compose
  - compose is a tool for defining multi-container Docker applications
  - need to build Dockerfile
  - must create a `docker-compose.yml` to define the app
  - Run `docker-compose up` and the entire app is run
- working with docker
  - `docker images` pulls the docker images available locally
  - `docker ps` shows the process currently running
  - `docker rm` will remove the container, `-f` will force kill
  - to kill all containers, `docker rm $(docker ps -a -q)`
  - `docker build -t webappdemo .`, you can pass name with `-t` parameter, and `.` indicates where the Dockerfile is located locally
- Kubernetes
  - container orchestration
- Azure Kubernetes Service
  - managed k8s cluster
  - easily integrate with RBAC and Azure AD
  - Azure Monitor
  - Azure DevOps
  - VNet Integration
  - only have to pay for the worker nodes, not the master
- Container Registry
  - public Docker Hub
  - Azure Container Registry
    - geo-replication
    - reduced network latency
    - private repository
  - admin user should only be used in development, create proper user + service principal in for production
- Kubernetes objects to know
  - pod 
    - smallest unit in terms of deployment and scaling
    - encapsulates containers, storage, network IPs, deployment options
    - containers within a pod share an IP address and port space, communicate via `localhost`
  - service
    - pod objects will die, can't rely on IP addresses
    - services define logical set of pods and a policy to access them
    - provides a stable IP
    - virtual load balancer in front of pods
  - replica set
    - HA
    - defines how many copies of pods
    - reconciles desired and actual state
    - self-healing
  - deployment
    - declarative
    - zero downtime with application deployment
    - happens in rolling fashion
    - rollout history is kept and can be rolled back at any time

## Self-research

### basic mgmt of ACR via CLI
- managed Docker container registry service for storing private Docker container images
- create container registry using `az acr create --resource-group ... --name ... --sku Basic`
- login to acr, `az acr login --name <acrname>`
- tag images with `docker tag <name> <acrLoginServer>/<name of app>:v#`
- do a `docker push` to send it to the acr
- to remove local instance of image, run `docker rmi ...`
- to list container images, `az acr repository list --name <acrName> --output table`
  - to show tags, run the same specifying `show-tags` and `--repository <name>`
- to run image from registry, `docker run <acrLoginServer>/hello-world:v1`

### Create ACR, create, prep, push
- create resource group, `az group create --name ... --location ...`
- create acr
- login to acr
- to query acr, `az acr show --name <acrName> --query loginServer --output table`
- tag image

### Create AKS cluster
- only pay for the agent nodes, not the masters
- for improved security and mgmt, AKS can integrate with Azure AD and use K8s RBAC
- for scaling, can use horizontal pod autoscaler or cluster autoscaler
- supports creation of GPU enabld node pools (single or multiple GPU enabled VMs allowed)
- can mount storage volume sfor persistent data
- can be deployed into an existing vnetwork and every pod in the cluster has an assigned IP address and can directly communicate with other pods in the cluster, and other nodes in the vnet
- can work well with K8S ingress resources as normal
- Helm, Draft, and other tools work seamlessly with AKS
- regulatory compliance with SOC, ISO, PCI DSS, and HIPAA
- create AKS cluster
```s
az aks create \
    --resource-group myResourceGroup \
    --name myAKSCluster \
    --node-count 1 \
    --enable-addons monitoring \
    --generate-ssh-keyss
```
- to connect local kubectl to remote, use the following `az aks get-credentials --resource-group myResourceGroup --name myAKSCluster`
- use of Azure Dev Spaces helps to rapidly iterate and debug code directly in AKS cluster
- to watch for changes of deployment `kubectl get service azure-vote-front --watch`

### Create container images for solutions
- `docker build ./ -t <name of repository>`, where `-t` is the tag followed by the name of the image you want to create
- `-d` is to run in the background, `-p` is to map the port

### Publish an image to ACR
- use a service principal for authentication in headless scenarios
  - `az ad sp create-for-rbac --name ... --scopes ... --role ... --query password --output tsv`
  - pass in via `--registry-username SPID` and `--registry-password SPPWD`
- to deploy container, `az container create --resource-group myResourceGroup --name aci-tutorial-app --image <acrLoginServer>/aci-tutorial-app:v1 --cpu 1 --memory 1 --registry-login-server <acrLoginServer> --registry-username <service-principal-ID> --registry-password <service-principal-password> --dns-name-label <aciDnsLabel> --ports 80`
- to check state, `az container show --resource-group myResourceGroup --name aci-tutorial-app --query instanceView.state`
- to check fqdn, `az container show --resource-group myResourceGroup --name aci-tutorial-app --query ipAddress.fqdn`