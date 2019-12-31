# Create and deploy apps

## App Services PaaS
- create an app service
  - way to create code and upload that into azure
  - provide FQDN
  - can upload code as zip or via Docker image
  - App Service Plan (Dev v Production v Isolated)
    - Dev: F1, D1, B1
    - Prod: S1, P1V2, P2V2, P3V2
    - Isolated: min cost is $1000, single tenant system, dedicated hardware
  - use Azure Compute Units (ACU) that determine performance
- deploy an app service
  - can scale up
  - can multiple web apps running on the same app service plan (10 app on the free, 100 on the shared) but limited by storage and resources
  - can deploy via FTPS too
  - can hook up with CI/CD through Github too
  - deployment slot with production, testing environments + swapping environments
- create app services container app
  - can deploy from docker hub, azure container registry
- upload webjobs as background jobs
  - > Webjobs
  - trigger is continuous, scheduled, triggered
    - could be cron, could have multi-instance
  - supported file types
    - bat, bash, php, python, js, java, cmd, exe
  - times out after 20 minutes of inactivity
    - can set always on for the webjob to keep it running
- using powershell to deploy a web app
  - create rg
  - create app service plan
    - `New-AzAppServiecPlan -Name, -Location, -ResourceGroupName, -Tier`
  - creat web app
    - `New-AzWebApp -Name, -Location`
  - TODO: LAB: Implement autoscaling for web apps

<!-- ## Service Fabric
- containers and microservices
  - clusters run anywhere
  - windows or linux
- creating a service fabric via CLI
  - `az group create --name .. --location ..`
  - `az sf cluster create --resource-group .. --location .. --certificate-output-folder . --certificate-password .. --certificate-subject-name ""  --cluster-name "" --cluster-size 2 --os UbuntuServer1604 --vault-name "" --vault-resource-group .. --vm-password .. --vm-user-name ..`
- managing a service fabric via CLI
  - can scale
  - download keys (pem, pfx) to local and upload into browser
  - `sfctl`
- reliable services vs reliable actors
  - guest executable has no tie in to sf
  - reliable services is a framework that makes use of sf runtime
    - services oriented architecture (SOA)
    - stateful servers are reliable connections within the sf framework
    - the API provides health, alerts about system changes
    - communicates with other services
    - uses reliable connections for state if needed -->

## Azure Kubernetes Service
- Create an AKS
  - include k8s version, fqdn (dns name prefix)
  - scale with min of 1 node
  - service principal (account in which nodes will run), enable RBAC, monitoring
- Deploy an AKS
  - `az aks get-credentials --resource-group .. -name ..`
  - `kubectl get nodes`
  - `kubectl apply -f .yaml`
  - kubernetes dashboard
- Use AKS Dashboard
  - follow prompts from portal for AKS dashboard
- creating our own containers


## Tips
    - Creating web WebApps
    - Deployment slots and how to enable auto-swap
    - Function Apps 
    - Consumption Plan vs App Service Plan
    - TLS Certificates: where are they stored and in what encoding
    - Auto-scaling patterns and when to use them
    - Different webjob types (continous vs triggered)
    - Different tiers of App Service Plans and features they come with (Free, basic, Standard, etc..)