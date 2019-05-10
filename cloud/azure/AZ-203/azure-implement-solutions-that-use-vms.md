# AZ-203: Develop Azure Infrastructure as a Service Compute Solutions

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

# Self-research

## basic mgmt of ACR via CLI
- managed Docker container registry service for storing private Docker container images
- create container registry using `az acr create --resource-group ... --name ... --sku Basic`
- login to acr, `az acr login --name <acrname>`
- tag images with `docker tag <name> <acrLoginServer>/<name of app>:v#`
- do a `docker push` to send it to the acr
- to remove local instance of image, run `docker rmi ...`
- to list container images, `az acr repository list --name <acrName> --output table`
  - to show tags, run the same specifying `show-tags` and `--repository <name>`
- to run image from registry, `docker run <acrLoginServer>/hello-world:v1`

## Create ACR, create, prep, push
- create resource group, `az group create --name ... --location ...`
- create acr
- login to acr
- to query acr, `az acr show --name <acrName> --query loginServer --output table`
- tag image

## Create AKS cluster
- only pay for the agent nodes, not the masters
- for improved security and mgmt, AKS can integrate with Azure AD and use K8s RBAC
- for scaling, can use horizontal pod autoscaler or cluster autoscaler
- supports creation of GPU enable d node pools (single or multiple GPU enabled VMs allowed)
- can mount storage volumes for persistent data
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
    --generate-ssh-keys
```
- to connect local kubectl to remote, use the following `az aks get-credentials --resource-group myResourceGroup --name myAKSCluster`
- use of Azure Dev Spaces helps to rapidly iterate and debug code directly in AKS cluster
- to watch for changes of deployment `kubectl get service azure-vote-front --watch`

## Create container images for solutions
- `docker build ./ -t <name of repository>`, where `-t` is the tag followed by the name of the image you want to create
- `-d` is to run in the background, `-p` is to map the port

## Publish an image to ACR
- use a service principal for authentication in headless scenarios
  - `az ad sp create-for-rbac --name ... --scopes ... --role ... --query password --output tsv`
  - pass in via `--registry-username SPID` and `--registry-password SPPWD`
- to deploy container, `az container create --resource-group myResourceGroup --name aci-tutorial-app --image <acrLoginServer>/aci-tutorial-app:v1 --cpu 1 --memory 1 --registry-login-server <acrLoginServer> --registry-username <service-principal-ID> --registry-password <service-principal-password> --dns-name-label <aciDnsLabel> --ports 80`
- to check state, `az container show --resource-group myResourceGroup --name aci-tutorial-app --query instanceView.state`
- to check fqdn, `az container show --resource-group myResourceGroup --name aci-tutorial-app --query ipAddress.fqdn`


# Self Study

# Implement solutions that use virtual machines (VM)

## Enable Azure Disk Encryption for Windows IaaS VMs
- only supported for Windows server versions, client versions
  - certain Linux distros
- requires key vault and VMs to reside in the same Azure region and subscription
- for Linux OS, requires 7GB of RAM
- must be able to connect to AAD endpoint, key vault endpoint, azure storage endpoint
- take a snapshot before disks are encrypted, mandatory for a managed disk based VM instance
- to encrypt a running VM, powershell
```s
$KVRGname = 'MyKeyVaultResourceGroup';
$VMRGName = 'MyVirtualMachineResourceGroup';
$vmName = 'MySecureVM';
$KeyVaultName = 'MySecureVault';
$KeyVault = Get-AzKeyVault -VaultName $KeyVaultName -ResourceGroupName $KVRGname;
$diskEncryptionKeyVaultUrl = $KeyVault.VaultUri;
$KeyVaultResourceId = $KeyVault.ResourceId;

Set-AzVMDiskEncryptionExtension -ResourceGroupName $VMRGname -VMName $vmName -DiskEncryptionKeyVaultUrl $diskEncryptionKeyVaultUrl -DiskEncryptionKeyVaultId $KeyVaultResourceId;
```
- encrypting via az CLI: `az vm encryption enable --resource-group "MyVirtualMachineResourceGroup" --name "MySecureVM" --disk-encryption-keyvault "MySecureVault" --volume-type [All|OS|Data]`
  - for KEK: `--key-encryption-key "MyKEK_URI" --key-encryption-keyvault "MySecureVaultContainingTheKEK"`
- to verify encryption status: `Get-AzVmDiskEncryptionStatus -ResourceGroupName 'MyVirtualMachineResourceGroup' -VMName 'MySecureVM'`
- verify encryption status via CLI: `az vm encryption show --name "MySecureVM" --resource-group "MyVirtualMachineResourceGroup"`
- to disable disk encryption: `Disable-AzVMDiskEncryption -ResourceGroupName 'MyVirtualMachineResourceGroup' -VMName 'MySecureVM'`
- to disable disk encryption via CLI: `az vm encryption disable --name "MySecureVM" --resource-group "MyVirtualMachineResourceGroup" --volume-type [ALL, DATA, OS]`
- in the portal, do the same with ARM templates by going to Deploy to Azure > selecting subscription, rg, location, settings, legal terms, agreement > Purchase
- to encrypt virtual machine scale sets (sets of load-balanced VMs) in Powershell:
```s
$KVRGname = 'MyKeyVaultResourceGroup';
$VMSSRGname = 'MyVMScaleSetResourceGroup';
$VmssName = "MySecureVmss";
$KeyVaultName= "MySecureVault";
$KeyVault = Get-AzKeyVault -VaultName $KeyVaultName -ResourceGroupName $KVRGname;
$DiskEncryptionKeyVaultUrl = $KeyVault.VaultUri;
$KeyVaultResourceId = $KeyVault.ResourceId;
Set-AzVmssDiskEncryptionExtension -ResourceGroupName $VMSSRGname -VMScaleSetName $VmssName -DiskEncryptionKeyVaultUrl $diskEncryptionKeyVaultUrl -DiskEncryptionKeyVaultId $KeyVaultResourceId;
```
- to encrypt VM scale sets in az CLI: `az vmss encryption enable --resource-group "MyVMScaleSetResourceGroup" --name "MySecureVmss" --disk-encryption-keyvault "MySecureVault"`
- to verify encryption status: `get-AzVmssVMDiskEncryption -ResourceGroupName "MyVMScaleSetResourceGroup" -VMScaleSetName "MySecureVmss"`
- to verify encryption status in az CLI: `az vmss encryption show --resource-group "MyVMScaleSetResourceGroup" --name "MySecureVmss"`
- to disable disk encryption: `Disable-AzVmssDiskEncryption -ResourceGroupName "MyVMScaleSetResourceGroup" -VMScaleSetName "MySecureVmss"`
- to disable disk encryption in az CLI: `az vmss encryption disable --resource-group "MyVMScaleSetResourceGroup" --name "MySecureVmss"`
- for encrypting VMs with pre-encrypted VHDs:
```s
$VirtualMachine = New-AzVMConfig -VMName "MySecureVM" -VMSize "Standard_A1"
$VirtualMachine = Set-AzVMOSDisk -VM $VirtualMachine -Name "SecureOSDisk" -VhdUri "os.vhd" Caching ReadWrite -Windows -CreateOption "Attach" -DiskEncryptionKeyUrl "https://mytestvault.vault.azure.net/secrets/Test1/514ceb769c984379a7e0230bddaaaaaa" -DiskEncryptionKeyVaultId "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myKVresourcegroup/providers/Microsoft.KeyVault/vaults/mytestvault"
New-AzVM -VM $VirtualMachine -ResourceGroupName "MyVirtualMachineResourceGroup"
```
- on a newly added data disk, you have to increment the sequence version number, so similar to previous:
```s
$KVRGname = 'MyKeyVaultResourceGroup';
$VMRGName = 'MyVirtualMachineResourceGroup';
$vmName = 'MySecureVM';
$KeyVaultName = 'MySecureVault';
$KeyVault = Get-AzKeyVault -VaultName $KeyVaultName -ResourceGroupName $KVRGname;
$diskEncryptionKeyVaultUrl = $KeyVault.VaultUri;
$KeyVaultResourceId = $KeyVault.ResourceId;
$sequenceVersion = [Guid]::NewGuid();

Set-AzVMDiskEncryptionExtension -ResourceGroupName $VMRGname -VMName $vmName -DiskEncryptionKeyVaultUrl $diskEncryptionKeyVaultUrl -DiskEncryptionKeyVaultId $KeyVaultResourceId -VolumeType "All" –SequenceVersion $sequenceVersion;
```
- same thing but with az CLI: the sequence version is created automatically
- to disable with ARM, run the template

## Review ARM templates
- stores metadata, parameters, variables, resources, outputs 

## Provision VMs

### Provision Windows VMs
- powershell to create rg: `New-AzResourceGroup -Name myResourceGroup -Location EastUS`
- azure CLI to create rg: `az group create --name myResourceGroup --location eastus`
- powershell for new VM:
```s
New-AzVm `
    -ResourceGroupName "myResourceGroup" `
    -Name "myVM" `
    -Location "East US" `
    -VirtualNetworkName "myVnet" `
    -SubnetName "mySubnet" `
    -SecurityGroupName "myNetworkSecurityGroup" `
    -PublicIpAddressName "myPublicIpAddress" `
    -OpenPorts 80,3389
```
- azure CLI to create new VM:
```s
az vm create \
    --resource-group myResourceGroup \
    --name myVM \
    --image win2016datacenter \
    --admin-username azureuser \
    --admin-password myPassword12
```
- azure CLI to open port for Windows VM (typically only RDP port is open): `az vm open-port --port 80 --resource-group myResourceGroup --name myVM`
- powershell to see IP: `Get-AzPublicIpAddress -ResourceGroupName "myResourceGroup" | Select "IpAddress"`
- powershell to rdp: `mstsc /v:publicIpAddress`
- powershell to remove rg: `Remove-AzResourceGroup -Name myResourceGroup`
- azure CLI to remove rg: `az group delete --name myResourceGroup`

### Provision Linux VMs
- generate SSH key pair: `ssh-keygen -t rsa -b 2048`
- create rg
- powershell to create vnet, subnet, IP address: 
```s
# Create a subnet configuration
$subnetConfig = New-AzVirtualNetworkSubnetConfig `
  -Name "mySubnet" `
  -AddressPrefix 192.168.1.0/24

# Create a virtual network
$vnet = New-AzVirtualNetwork `
  -ResourceGroupName "myResourceGroup" `
  -Location "EastUS" `
  -Name "myVNET" `
  -AddressPrefix 192.168.0.0/16 `
  -Subnet $subnetConfig

# Create a public IP address and specify a DNS name
$pip = New-AzPublicIpAddress `
  -ResourceGroupName "myResourceGroup" `
  -Location "EastUS" `
  -AllocationMethod Static `
  -IdleTimeoutInMinutes 4 `
  -Name "mypublicdns$(Get-Random)"
```
- powershell to create network security group, traffic rule, and inbound rule for TCP port 80:
```s
# Create an inbound network security group rule for port 22
$nsgRuleSSH = New-AzNetworkSecurityRuleConfig `
  -Name "myNetworkSecurityGroupRuleSSH"  `
  -Protocol "Tcp" `
  -Direction "Inbound" `
  -Priority 1000 `
  -SourceAddressPrefix * `
  -SourcePortRange * `
  -DestinationAddressPrefix * `
  -DestinationPortRange 22 `
  -Access "Allow"

# Create an inbound network security group rule for port 80
$nsgRuleWeb = New-AzNetworkSecurityRuleConfig `
  -Name "myNetworkSecurityGroupRuleWWW"  `
  -Protocol "Tcp" `
  -Direction "Inbound" `
  -Priority 1001 `
  -SourceAddressPrefix * `
  -SourcePortRange * `
  -DestinationAddressPrefix * `
  -DestinationPortRange 80 `
  -Access "Allow"

# Create a network security group
$nsg = New-AzNetworkSecurityGroup `
  -ResourceGroupName "myResourceGroup" `
  -Location "EastUS" `
  -Name "myNetworkSecurityGroup" `
  -SecurityRules $nsgRuleSSH,$nsgRuleWeb
```
- powershell to create NIC:
```s
# Create a virtual network card and associate with public IP address and NSG
$nic = New-AzNetworkInterface `
  -Name "myNic" `
  -ResourceGroupName "myResourceGroup" `
  -Location "EastUS" `
  -SubnetId $vnet.Subnets[0].Id `
  -PublicIpAddressId $pip.Id `
  -NetworkSecurityGroupId $nsg.Id
```
- powershell to define SSH credentials, OS info, and VM size, then finally creating VM: 
```s
# Define a credential object
$securePassword = ConvertTo-SecureString ' ' -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential ("azureuser", $securePassword)

# Create a virtual machine configuration
$vmConfig = New-AzVMConfig `
  -VMName "myVM" `
  -VMSize "Standard_D1" | `
Set-AzVMOperatingSystem `
  -Linux `
  -ComputerName "myVM" `
  -Credential $cred `
  -DisablePasswordAuthentication | `
Set-AzVMSourceImage `
  -PublisherName "Canonical" `
  -Offer "UbuntuServer" `
  -Skus "16.04-LTS" `
  -Version "latest" | `
Add-AzVMNetworkInterface `
  -Id $nic.Id

# Configure the SSH key
$sshPublicKey = cat ~/.ssh/id_rsa.pub
Add-AzVMSshPublicKey `
  -VM $vmconfig `
  -KeyData $sshPublicKey `
  -Path "/home/azureuser/.ssh/authorized_keys"

New-AzVM `
  -ResourceGroupName "myResourceGroup" `
  -Location eastus -VM $vmConfig
```
- powershell to get public IP: `Get-AzPublicIpAddress -ResourceGroupName "myResourceGroup" | Select "IpAddress"`
- azure CLI to create VM:
```s
az vm create \
  --resource-group myResourceGroup \
  --name myVM \
  --image UbuntuLTS \
  --admin-username azureuser \
  --generate-ssh-keys
```
- azure CLI to open port 80 for web traffic: `az vm open-port --port 80 --resource-group myResourceGroup --name myVM`

### Creating VM using C#
- the following statements are useful for creation, including creating the management client:
```C#
using Microsoft.Azure.Management.Compute.Fluent;
using Microsoft.Azure.Management.Compute.Fluent.Models;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;

var credentials = SdkContext.AzureCredentialsFactory
    .FromFile(Environment.GetEnvironmentVariable("AZURE_AUTH_LOCATION"));

var azure = Azure
    .Configure()
    .WithLogLevel(HttpLoggingDelegatingHandler.Level.Basic)
    .Authenticate(credentials)
    .WithDefaultSubscription();
```
- to create everything:
```C#
var groupName = "myResourceGroup";
var vmName = "myVM";
var location = Region.USWest;
    
Console.WriteLine("Creating resource group...");
var resourceGroup = azure.ResourceGroups.Define(groupName)
    .WithRegion(location)
    .Create();

Console.WriteLine("Creating availability set...");
var availabilitySet = azure.AvailabilitySets.Define("myAVSet")
    .WithRegion(location)
    .WithExistingResourceGroup(groupName)
    .WithSku(AvailabilitySetSkuTypes.Managed)
    .Create();

Console.WriteLine("Creating public IP address...");
var publicIPAddress = azure.PublicIPAddresses.Define("myPublicIP")
    .WithRegion(location)
    .WithExistingResourceGroup(groupName)
    .WithDynamicIP()
    .Create();

Console.WriteLine("Creating virtual network...");
var network = azure.Networks.Define("myVNet")
    .WithRegion(location)
    .WithExistingResourceGroup(groupName)
    .WithAddressSpace("10.0.0.0/16")
    .WithSubnet("mySubnet", "10.0.0.0/24")
    .Create();

Console.WriteLine("Creating network interface...");
var networkInterface = azure.NetworkInterfaces.Define("myNIC")
    .WithRegion(location)
    .WithExistingResourceGroup(groupName)
    .WithExistingPrimaryNetwork(network)
    .WithSubnet("mySubnet")
    .WithPrimaryPrivateIPAddressDynamic()
    .WithExistingPrimaryPublicIPAddress(publicIPAddress)
    .Create();

Console.WriteLine("Creating virtual machine...");
azure.VirtualMachines.Define(vmName)
    .WithRegion(location)
    .WithExistingResourceGroup(groupName)
    .WithExistingPrimaryNetworkInterface(networkInterface)
    .WithLatestWindowsImage("MicrosoftWindowsServer", "WindowsServer", "2012-R2-Datacenter")
    .WithAdminUsername("azureuser")
    .WithAdminPassword("Azure12345678")
    .WithComputerName(vmName)
    .WithExistingAvailabilitySet(availabilitySet)
    .WithSize(VirtualMachineSizeTypes.StandardDS1)
    .Create();

/* to use existing disk instead of a marketplace image
var managedDisk = azure.Disks.Define("myosdisk")
    .WithRegion(location)
    .WithExistingResourceGroup(groupName)
    .WithWindowsFromVhd("https://mystorage.blob.core.windows.net/vhds/myosdisk.vhd")
    .WithSizeInGB(128)
    .WithSku(DiskSkuTypes.PremiumLRS)
    .Create();

azure.VirtualMachines.Define("myVM")
    .WithRegion(location)
    .WithExistingResourceGroup(groupName)
    .WithExistingPrimaryNetworkInterface(networkInterface)
    .WithSpecializedOSDisk(managedDisk, OperatingSystemTypes.Windows)
    .WithExistingAvailabilitySet(availabilitySet)
    .WithSize(VirtualMachineSizeTypes.StandardDS1)
    .Create();
*/
```
- to access VM, you require the instance: `var vm = azure.VirtualMachines.GetByResourceGroup(groupName, vmName);`
- turn off VM: `vm.PowerOff();`, to deallocate: `vm.Deallocate();`, to start: `vm.Start();`
- to resize VM: `vm.Update().WithSize(VirtualMachineSizeTypes.StandardDS2).Apply();`
- to delete resource group: `azure.ResourceGroups.DeleteByName(groupName);`

## Create ARM templates
- parameters section to customize deployment
- variables section 
- function section for customized template expressions
- resources section which shows resources that are deployed to your subscription
- outputs
- can add tags to organize and divide billing costs
- functions use `[some-expression]`
- can duplicate resources with `copy` property with `count` and `name`
- can add `condition` to deploy resources
- add `dependsOn` for dependencies when explicitly required, can slow down deployment or cause circular dependencies

## Configure Azure Disk Encryption for VMs
- disks are encrypted using cryptographic keys secured in an Azure Key Vault
- virtual disks are encrypted at rest by using BitLocker, no charge
  - keys are stored in Azure Key Vault or can import/generate in Hardware Security Models (HSMs)
- the process is as follows:
  - create key in AKV
  - configure cryptographic key to be usable for encrypting disks
  - enable disk encryption for your virtual disks
  - cryptographic keys are requested from AKV
  - virtual disks are encrypted using the provided cryptographic key
- not supported for basic tier VMs, VMs via Classic deployment model, updating crypto keys on already encrypted VMs, integration with on-prem Key Mgmt Service

### Encrypt a Windows VM
- create AKV and add key:
```s
$keyVaultName = "myKeyVault$(Get-Random)"
New-AzKeyVault -Location $location `
    -ResourceGroupName $rgName `
    -VaultName $keyVaultName `
    -EnabledForDiskEncryption
Add-AzureKeyVaultKey -VaultName $keyVaultName `
    -Name "myKey" `
    -Destination "Software"
```
- using HSM requires premium Key Vault at $$
- encrypt VM:
```s
$keyVault = Get-AzKeyVault -VaultName $keyVaultName -ResourceGroupName $rgName;
$diskEncryptionKeyVaultUrl = $keyVault.VaultUri;
$keyVaultResourceId = $keyVault.ResourceId;
$keyEncryptionKeyUrl = (Get-AzKeyVaultKey -VaultName $keyVaultName -Name myKey).Key.kid;

Set-AzVMDiskEncryptionExtension -ResourceGroupName $rgName `
    -VMName "myVM" `
    -DiskEncryptionKeyVaultUrl $diskEncryptionKeyVaultUrl `
    -DiskEncryptionKeyVaultId $keyVaultResourceId `
    -KeyEncryptionKeyUrl $keyEncryptionKeyUrl `
    -KeyEncryptionKeyVaultId $keyVaultResourceId
```
- check encryption status with: `Get-AzVmDiskEncryptionStatus  -ResourceGroupName $rgName -VMName "myVM"`

### Encrypt a Linux VM
- only handles Ubuntu, CentOS, SUSE and SUSE Linux Enterprise Server (SLES), and Red Hat Enterprise Linux.
- same Azure region and subscription
- register AKV and create RG:
```s
az provider register -n Microsoft.KeyVault
resourcegroup="myResourceGroup"
az group create --name $resourcegroup --location eastus
```
- create AKV:
```s
keyvault_name=myvaultname$RANDOM
az keyvault create \
    --name $keyvault_name \
    --resource-group $resourcegroup \
    --location eastus \
    --enabled-for-disk-encryption True
```
- create key:
```s
az keyvault key create \
    --vault-name $keyvault_name \
    --name myKey \
    --protection software
```
- to encrypt VM:
```s
az vm encryption enable \
    --resource-group $resourcegroup \
    --name myVM \
    --disk-encryption-keyvault $keyvault_name \
    --key-encryption-key myKey \
    --volume-type all
```
- to check status: `az vm encryption show --resource-group $resourcegroup --name myVM --query 'status'`
