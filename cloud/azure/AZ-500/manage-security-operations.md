# Manage security operations (15-20%)

## Configure security services
- configure diagnostic logging and log retention
  - save diagnostic logs to a storage account for auditing
  - stream to event hubs for analytics through PBI
  - analyze through Azure Monitor Logs (aka Azure Log Analytics)
  - can test queries using Log Analytics
  - uses Kusto query language
  - collects app monitoring, guest os, azure resource, azure subscription, and azure tenant monitoring data
  - can also use with AKS with Azure Monitor for Containers and for VMs
  - can have alerts with ITSM tools + action groups for sending the notifications
- Log Analytics data security
  - uses TLS for transport
  - max storage is 730 days, 31 days by default
  - Log Analytics workspace is created and access control mode is set
  - also allows per-table security level with custom roles
- vulnerability scanning through Azure Security Center for VMs


## Configure security policies
- use built-in security policies
  - configure in Azure Policy
  - policy is a rule, initiative is a collection
- JIT VM access in Azure Security Center
  - on Standard tier
  - requires NSG to allow bypass for


## Manage security alerts
- enable Azure Sentinel for alerts