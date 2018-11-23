# Azure Virtual Networks

[ref](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-vnet-plan-design-arm)
* all azure resources have a name
    * must be unique within resource group but can be duplicated within a subscription or region
* can deploy as many virtual networks required within each subscription
    * can make multiple subnets within each vnetwork
    * if you need inter-vnetwork communication, may need firewall (network virtual appliance)
* security
    * can filter network traffic between resources in a vnetwork using a network security group (NVA) that filters network traffic or both
    * NSG contains several default security rules that allow or deny traffic
        * associate with subnet or network interface, or both
    * inbound traffic can be handled via filtering
    * outbound traffic, use route tables 
        * force through Azure VPN gateway is called `forced tunnelling`
* connectivity
    * vnetwork to vnetwork done through Azure VPN gateway
        * peering, bandwidth is the same if resources were in same vnetwork if they are in the same region
    * hub and spoke style through site-to-site VPN
    * peered vnetwork will need custom DNS server
* Permissions (RBAC)   
    * handled through subscription > management group > resource group > resource
* Policy    will be able to enforce different rule over different resources to stay compliant with organizational standards and SLAs

## Application Security Groups (ASG)
* grouping of application resources in azure
* enable fine-grained network security policies based on workloads instead of explicit IP addresses
* single NSG is nice to keep a single place for management
* for zero-trust models, limit access to application flows that are permitted
    * less NSGs
    * centralized logging
    * enforce policies

## Network Security Groups (NSG), kinda like firewalls
* used to filter network traffic to and from Azure resources in a Azure vnetwork with NSG
* contain rules to allow or deny inbound network to or outbound network traffic from Azure resources
* definitions required:
    * establish priority of rules
        * specify target source or destination IP address (can be app security group, service tag, range of IP)
    * protocol (TCP, UDP, Any)
    * direction (in/outbound)
    * port range
    * action (allow or deny)
* Inbound traffic is NSG for subnet and then NSG to network interface
* Outbound traffic is NSG for network interface and then NSG for subnet
* try to avoid rules in NSG for NIC AND NSG for subnet as conflicts will occur

## Network Interface (NI)
* with new VM, will create a NI with default settings 