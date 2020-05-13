# Implement platform protection (35-40%)

## Implement network security
- vnet 
  - create few larger subnets but leave some room for the future
  - have non-overlapping address spaces
  - each is isolated from other vnets
  - specify custom private IP address space
  - segment into 1+ subnets
  - use Azure-provided name resolution / DNS server
  - all resource in a vnet can communicate outbound to the internet
  - can communicate inbound to resource by assigning a public IP address or a public load balancer
  - communicate between Azure resources through vnet or vnet endpoint
  - for on-prem
    - P2S, S2S (Azure VPN Gateway), ExpressRoute 
- Filter network traffic
  - using NSGs
    - assigned to NIC or subnet
    - plan out Application Security Groups to minimize mgmt
      - allows a grouping of NICs from same vnet
    - can also use service tags in place of IP addresses
      - vnet, alb, internet, azure Cloud, ATraffic Manager, Storage
    - cannot remove default rules, but can override with higher priorities
    - port 25 often blocked because of spam, but can enter EA with MSFT to get around it
  - virtual appliance
  - with Azure firewall
    - managed, cloud-based network security service
    - stateful 
    - uses a static public IP address for vnet resources allowing outside firewalls to identify traffic coming from original vnet
    - FQDN filtering, threat intelligence, SNAT support, DNAT support (port forwarding)
    - recommend firewall in its own vnet (hub/spoke) for production
    - application rules: can define FQDN that can be access from a subnet
    - network rules: specify source address, protocol, destination port, and address
  - can further harden internet facing VMs
  - db-level IP firewall rules for master and user dbs can only be created through TSQL, and only after first server-level firewall
  - Azure routes by default
    - can override with UDR or BGP routes
  - Network map has traffic view and topology view 
- Azure Storage security
  - network rules first, and then also apply SAS afterwards
  - classic storage accounts do not support firewalls and vnets
  - begin by denying all traffic to the SAs
  - access to main SA will automatically grant access to any RA-GRS instance
- Db-level firewall rules -> Server-level firewall rules
  - 128 db-level rules, stored in master db
  - server-level rules require TSQL/powershell/azure cli
  - use db-level rules when possible, TSQL only
  - use server-level ip firewall rules for mass administration
  - check db-level rules and if not, check if server-level, else fail


## Implement host security
- use RBAC
- use availability sets/zones for better availability
- monitor perf -> Azure Monitor
- Encrypt -> ADE
- Security posture -> Azure Security Center
  - anti-malware
  - JIT access is standard tier for security center
  - Security center creates an NSG rule for inbound traffic
    - can also change firewall rules temporarily to allow JIT access
    - requires a NSG
- for update management
  - log analytics workspace + automation account + hybrid runbook worker (on a VM)
    - hybrid runbook worker for on-prem
  - OS security configuration customization (only on Standard tier)
  - can create alerts 


## Configure container security
- can plug in vnet to containers to get IPs
  - used with AKS, AKS-engine, your own K8s, or vnet attached to Docker Containers in Azure
- aks cluster pods can send/receive traffic without limitations 
  - network policy feature in k8s can define rules for ingress/egress between pods in a cluster
  - apply network policy (YAML Manifest)
  - can match namespace or label or pod
  - only works with Azure CNI (advanced)
  - can have NSGs and routes applied directly to pods
  - pods can be behind LBs
  - azure CNI manages IPs in a pod
    - automatically included in AKS
  - can grant service principal for AKS to auto pull images from ACR/networking/storage
  - for updates, use cordon and drain for nodes so that pods can be added to a newly updated node
- ACR best practices
  - nw-close deployment
  - geo-replicate multi-region deployments
  - reside in its own rg
- Aqua for vuln mgmt


## Implement Microsoft Azure Resource management security
- lock resources to protect them 
  - most restrictive lock takes precedence
  - CanNotDelete, ReadOnly
- RBAC
  - security principal + role definition + scope
  - custom roles
    - actions/notActions
    - limited to 5000 custom roles per directory
    - created through Powershell, CLI
- Create and manage policies for compliance
