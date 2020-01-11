# Implement workloads and security

## Migrate Servers to Azure
- Setting up Azure Site Recovery
  - > Recovery Services vaults
  - we want to make sure the recovery services vault is in another location
    - if on-prem, same location is okay for potentially faster migration
- prepare ASR resource
  - prepare infrastructure
    - download app for on-prem, to Azure, and virtualization (hyperv, vmware, not virtualized)
    - deployment planning (it will take time to replicate)
    - configure source (download Azure Site Recovery Unified Setup) + vault registration key
- Using VMWare P2V for Migration
  - it's a possibility
- LAB: Use ASR to Duplicate an Azure Solution
  - create a RG, and select Disaster Recovery and start replicating
  - then when all is done, test failover

## Implement Serverless Computing
- consumption plan determines if serverless
  - cost by CPU time and executions
  - requires storage account
- create function
  - trigger: webhook + API, timer, more templates
  - authorization-level: function, anonymous, admin
  - use `context.bindings._name` to access output or input properties
- logic apps
  - use triggers and set logic
  - define parameter with `{_}`
- Azure Event Grid
  - listen to topics and passes to event subscriptions
- Messaging with Service Bus
  - can have hybrid connections
    - from external to internal behind firewalls via relaying with service bus
  - subscription details: event grid schema or open source schema
  - creating queue with options for dead-lettering, etc.

## Load Balancer
- Create a load balancer
  - splits based on source ip/port, destination ip/port, and protocol
  - public (ip address) or internal, dynamic or static
  - basic (100) v standard (1000 instances)
    - standard handles HTTPS, multiple vmss, multiple availability zones, azure monitor, secure by default via whitelist, SLA
- understand lb settings
  - in backend pool
    - can associate with vm, availability set, or vmss
    - must be in same region as your lb
    - choose VM + associated NIC 
  - health probe will detect if vm is alive and kick out the vm if it is not
    - ping per interval
  - load balancing rule
    - can configure session persistence via client ip etc.
- frontend ip configuration
  - standard lb can have multiple backend pools
- create an application gateway
  - standard, WAF (firewall), ...
  - scaling (autoscale, manual)
  - need to put onto vnet
  - can handle external IPs as well, and handles cookies as well. LBs do not, but can handle TCP/UDP level calls
- configure the app gateway
  - WAF has default backend pool
  - can use lb that points to external vm/containers via IP addresses
  - add path-based rule
- creat frontier service
  - runs like a lb that is global, with built-in CDN, SLA
  - session options
  - WAF for security
  - can encrypt
    - can redirect

## MFA
- more than just pw for logging in
- enable Azure conditional access
  - extra protection based on the specific set of users/people/location
  - sign-in risk which uses ML to determine level of risk
  - set Named Locations for trusted locations
- setup fraud alerts
  - allow users to report fraud
  - can automatically block those users that are reported
    - shutdown for 90 days
- MFA one-time bypass
  - can allow a user to get a one-time bypass within a specified time interval
- verifying your identity with MFA
  - call phone
  - text message
  - mobile app
  - verification code from mobile app or hardware tokens
  - can enable trusted ips 
- RBAC
  - authZ
  - > Access Control (IAM)
  - three main roles
    - Owner (grants access)
    - Contributor (write)
    - Reader (read only)
  - can create and deny assignment
- create custom RBAC roles
  - can create via PS
  - download an existing role and modify as required in JSON
  - `New-AzRmRoleDefinition`
- Custom roles: https://github.com/microsoft/csa-misc-utils/tree/master/sample-AzGuardRails-Governance/CustomRBAC
- LAB: https://azurecitadel.com/infra/vdc/lab5/

## Tips
Security:
  - SQL database encryption types
  - How to prevent a db admin from seeing columns
  - Azure Active Directory roles and assignments + RBAC in general
  - Azure Key Vault