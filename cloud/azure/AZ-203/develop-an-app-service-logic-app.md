# Develop an App Service Logic App

- Azure logic apps is a cloud service to help orchestrate and automate tasks
- every logic app starts with a trigger, creates new instance
- write once, reuse often
- pay fr what you use
- templates
- visually build workflows
- logic connectors proxy/wrap an API
  - talks to Ms Flow, powerapps, logic apps
- actions are changes directed by a user
- triggers are polling or pushing
- meant for automating workflows
- everything is GUI-based

# Redis
- atomic operations
- kv can have max size of 512 mb
- usage
  - cache-aside, load data items and cache as required
  - content caching, store static data to decrease load times
  - use session caching, store cookie
  - job and message queuing, defer longer running jobs
  - distributed transactions, executes a batch of commands as a single operation in the form of Transactions
- TODO: know the tiers of Azure Redis
  - premium (cluster, persistence, enhanced security, import/export, geo-replication, schedule updates), standard (includes SLA), basic (security via firewall rules, reboot)
- know the Azure Redis integration API, `StackExchange`
  - `ICacheable` and `IDatabase`
  - know methods for execute, delete value, delete etc...

# CDN
- Content Delivery Network, distributed network of servers can efficiently deliver web content to users
- minimize latency, point-of-presence (POP)
- TODO: know the feature comparison for Microsoft, Akamai, Verizon, and Premium Verizon
- TODO: Azure CDN lab
- `using Microsoft.Azure.Management.Cdn`
- to connect to CDN, require the `TokenCredentials` from `Microsoft.Rest` to authenticate
- Caching Rules
  - global caching rules
  - custom caching rules
    - override the global caching rule, if set
- either create a storage account or let it be created for you
  - can define caching behaviour (bypass cache, override, set if missing, not set)
  - query string caching behaviour (cache every unique, etc.)