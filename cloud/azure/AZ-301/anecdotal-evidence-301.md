# Anecdotal Evidence 301

Andrii Deresh

I had ~45 questions, 1 case study, 2 labs 5-7 tasks each.
 
QUESTIONS:
 
There were more questions like “Which service should you use to achieve ….” compared to az-300. Also, there were a lot of questions with 2 pairs of two similar answers, for instance:
Use storage account and LRS
Use storage account and GRS
Use Premium managed disk
Use Standard managed disk
Often, you can get rid of the falsy pair of answers right away. 
 
Below is a questions’/case studies’/lab’s topics:
SQL Migration: supported features, Azure SQL Database vs Elastic pool vs Managed Instance vs SQL on Azure VM
SQL PiTR and LTR
SQL audit and where to store
SQL Data Migration Assistant
DataFactory - 2 question. Data Migration mostly + SSIS packages.
SQL Data Migration vs DataFactory vs Cosmos DB Data Migration Tool
AD DS - 2 question - e.g. group policies
Azure AD conditional access, guest accounts/B2B, roles/custom roles/ permissions - 4 questions
Azure Adviser - 2 questions
Azure Policy - know how policy works, a scope of the policy, rules. E.g. restrict VM size or a region.
Storage Blobs: tiers, Hot/Cool/Archive(!). Which one has the lowest cost of storage/retrieval - 2 questions
Managed disk: when to use, premium vs standard
Recovery Service Vault: which services are supported.
VM: Azure Disk Encryption, user-managed encryptions keys
VM: diagnostic extensions: Microsoft Monitoring agent vs Azure Diagnostics Extension for Windows VMs
VNET: Peering and IP addresses overlap
VNET: subnet gateway and addressing
VNET: service endpoints - 2 questions
RecoveryServiceVault: backup policies
RecoveryServiceVault: RTO vs RPO
Traffic manager
Application gateway: SSL offloading, routing, WAF.
AKS vs Azure Container instance (group of containers) vs Web app with containers
Application Insights vs Service Map vs Activity Log vs Log Analytics
BitLocker vs Azure Storage Service Encryption vs Azure Disk Encryption vs Always Encryption
Autoscale: how it works, what is duration, what is cool down
Diagnostic settings: maximum/minimum retention time for 1) storage account 2) log anaylitics.
APIM: vnet integration, products, policies, OAuth service - 3 questions
PIM vs Managed Identity vs Identity Protection
 
CASE STUDY:
The case study was mostly about AzureAD + AzureAD Connect and SQL migration.
 
LABS:
 
There were 2 labs. The main difference between az-300 and az-301 labs is in az-300 you need to create/configure resources when in az-301
you need to answer questions based on an existing configuration. I didn't have to modify or create anything – just answered questions based on the existing configuration.  
My opinion – az-301 labs are harder since you have to spend more time on investigation. Live yourself at least 120 minutes for two labs. However, 3 hours is still enough😊
 
I highly recommend to check all answers - had around two questions with valid at least two valid options(I think they were valid:)) but the questions asked what to do FIRST?.
 
Labs 1
Vnet: peering: you need to link two vnets
Vnet: IP address fix overlap
VM: make sure a user can access VM via SSH. Check for Public IP, NSG, how to configure via NAT and load balancer
VM: check if it's possible to assign second NIC to a VM(vnet, region, vm size)
Managed disk: minimize cost by downgrading to a low cost disk type
Vnet: something about gateway subnet and regular subnets
Vnet: check if you need to create/modify new/existing addressing space
 
Labs 2
Check why a user cannot modify a resource. Resource Lock + User permissions
Web APP: inefficient scale out autoscale rule. Find the reason and fix
App Service: you need to migrate to a different region, what should you do first?
Storage: you have a blob in Archive tier, you need to access it.
Storage: check if a firewall allows to access from a azure vnet only
 
Based on the tasks, I'd say you need to know:
- how to create Vnets
- How to create Subnets in Vnets
- Check if two IP addresses overlap (e.g. 10.0.0.0/16 and 10.0.1.0/24)
- Create/modify Addressing spaces in VNETS
- Create Global peering between two or more vnets (considering address overlap)
- NSG: assign NSG to NIC, assign NSG to a subnet
- UDR and how to configure a virtual appliance
- Load Balancers
- Managed Disks: skus, upgrade
- Autoscale in VMs/Web Apps/ScaleSet
- App Service migration. App Service and its web apps should be in the same region.
- Resource Locks: Delete vs ReadOnly, permissions to change
- Storage: pros and cons of each tier and how to move between tiers
 
Hint: sometimes, if you try to create a resource mentioned in the questions, it may give you an idea about the answer. I don't think you can create any resources during az-301 but at least you can see resource’s settings.
 
Hint 2: Use azure portal information to your advantage. 