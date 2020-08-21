# Develop a Site Reliability Engineering (SRE) strategy (5-10%)

## Develop an actionable alerting strategy
- identify and recommend metrics on which to base alerts
- implement alerts using appropriate metrics
- implement alerts based on appropriate log messages
- implement alerts based on application health checks
- analyze combinations of metrics
- develop communication mechanism to notify users of degraded systems
- implement alerts for self-healing activities (e.g. scaling, failovers)

## Design a failure prediction strategy
- analyze behavior of system with regards to load and failure conditions
- calculate when a system will fail under various conditions
- measure baseline metrics for system
- recommend the appropriate tools for a failure prediction strategy

## Design and implement a health check
- analyze system dependencies to determine which dependency should be included in health check
- calculate healthy response timeouts based on SLO for the service
- design approach for partial health situations
- integrate health check with compute environment
- implement different types of health checks (liveness, startup, shutdown)

- SRE
  - sustainably achieve reliable systems, services, products
  - Service Level Indicator (SLI)
  - Service Level Objective (SLO)
  - blameless post mortems
  - busy-work == toil
  - aim for 50% reactive at max
- Incident Response
  - alert rule
    - resource, condition, actions, alert details
  - metric alert
    - static/dynamic
  - activity log alerts for specific Azure instance changes
  - smart groups use ML
- Manage Site Reliability
  - categories of problems
    - availability and basic functionality
    - latency
    - correctness
    - feature-specific problems
  - able to create meaningful alert rules
- VM Monitoring
  - Enable Azure Guest-Level Monitoring with an agent
  - Azure Diagnostics Extension
- Scale cloud resources with elasticity
  - time-based
  - metrics-based
  - load-balancing
    - TCP handoff (let client talk to server directly)
    - proxying (through lb between front and back)
  - serverless good for frequent tasks that are not constant
    - there are even serverless dbs now
- Build apps in the cloud
  - fault tolerance
    - transient, permanent, intermittent faults
  - tail problem
    - 1% of functions is super slow and massively impacts overall perf
- Troubleshoot inbound network connectivity for Azure LB
  - no health probe means VM will still get routed traffic
  - if port is blocked on vnet, requests are queued up and timeout
  - tcping, pcping, netsh to test vms
  - average packet would increase if one of the VMs are down for backend pool
  - could be firewall or NSG, wrong health probe port, stopped VM