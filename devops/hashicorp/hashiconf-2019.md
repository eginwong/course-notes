# Hashiconf 2019

## Transforming the Management of Application Configurations & Secrets at 24 Hour Fitness
[ref](https://youtu.be/vxT_WGaIhaA)
- for continuous improvement
  - identify the challenges
  - find the value
  - define the path
    - single source for configurations in Consul KV store
    - single source for secrets using Vault
    - apps can receive run-time config changes
    - approvals for config changes
  - walk the path
    - for CONSUL
      - for configs across apps, start keypath with `/default`
      - for configs for specific apps, /env/ENVNAME/APPNAME/KEY -> `/env/dev/app1/datasource/db1`
      - for host specific configs, /host/HOSTNAME/KEY
      - for key names, words separated by dash
    - for VAULT
      - for secret engine, /apps/ENV
      - for secrets, APPNAME
      - for secret key names, words separated by .
    - on app start up
      - 1. read Consul props (listener port, local agent, key paths)
      - 2. load data via local Consul Agent
    - on config reload
      - 1. have watcher for key prefix
      - 2. watch initiates running a handler script
      - 3. handler script sends signal to local host on configured port
      - 4. app instance listening receives signal
      - 5. app instance updates props from Consul KV
    - dev makes change in PR merged, Jenkins updates Consul KV Store
    - in production, adds a gate before submitting change
    - Vault admin for production is done through encrypted email and manually updated for security purposes
    - issues: 
      - Consul agents communicating across vlans for firewall
      - dynamic password generation is still manual, need to automate
      - split property files into individual app files by app and environment

## Sentinel Policy as Code: Use Cases for Terraform, Vault, Nomad & Consul
[ref](https://youtu.be/TdDnrrsUNKc)
- policy as code
- enables IT governance in HashiCorp enterprise products
- IaC at Scale leaves security holes/lapses possible
  - need to be concerned about Compliance
- PaC
  - automate, version, document policies
- Sentinel
  - embedded directly into runtimes
  - trace data available for auditing purposes
  - can add policy sets to terraform/app workflows
  - can test
  - use Sentinel Simulator

## Client-Side Response Caching Using Vault Agent
[ref](https://youtu.be/aEc-UCaYgY4)
- Vault Agent will do the renewal of tokens and manage secrets on client-side so your apps may not even need to know
- `auto-auth` configuration
  - automatically injects role id / secret id into app so that they can retrieve tokens as required
- app will pick up token info from the sink
  - does not need to implement any renewal/authN methods for Vault Server
- agent-caching would store the token to reduce token creation
  - misconfigured apps will create new tokens instead of reusing them
  - only caches tokens and leases

## Demystifying Service Mesh
[ref](https://youtu.be/bEFILWrRJJ4)
- routing apps through phone operators analogy
- what if there is no IP?
  - how would services find each other?
  - how to connect securely?
- What about k8s?
  - same problems
  - if you include Consul, you change each k8s pod as discoverable
- After you use terraform, next bottleneck is firewall + service discovery
  - Consul using envoy can create dynamically signed certs between two services
- instead of having all services talking to all other services, they created a service mesh so that two large meshes communicate with one another (each representing a data center)
- start with NO IP
- service discovery is non-negotiable

## Everybody Talks: Understanding the Key Algorithms Behind Consul
[ref](https://www.hashicorp.com/resources/everybody-talks-understanding-the-key-algorithms-behind-consul)

- Gossip Protocols
  - structure matters
    - mesh vs tree, ring
  - visibility matters
    - more or less members known and speed
  - conclusion:
    - randomized, peer-to-peer, full visibility
    - SWIM
      - states: alive, suspect, dead
      - scalable
      - weakly-consistent
      - focus on dissemination and failure detection
      - propagating membership
        - joining, leaving, disconnecting
    - implemented by Memberlist
- To make money, they built SERF which has even more improvements
- Consul was made on top of SERF + RAFT
  - Strongly Consistent
  - multiple gossip pools
  - agent can be either server or client
  - server is stateful and can communicate across states

## How we accelerated our Vault adoption with Terraform
[ref](https://youtu.be/vD3_jeqGx6M)
- time consuming to administer vault and making changes
- problems
  - lack of audit trail
  - full rights for all admins
- solution
  - vault config Ruby gem with source control
  - Goldfish Vault UI for policy approval process
- design problems when using TF
  - want PRs 
  - want to minimize churn between TF and Vault APIs
  - start small with only policy changes
- solution
  - using slack bot for tracing JIRA issue + channel for discussion
  - terraform set of scripts to run in Jenkins
  - `terraform plan` to display the intended changes
  - another library to ensure entire enterprise uses same vault + tf clis
  - would create a temporary appRole to make the write change
- improvements
  - aws auth roles (use aws to access vault)
  - k8s auth roles
- results
  - get users to do more of the work
  - allow users to debug their own problems
  - auditability
  - reduce time to handle resources
  - reducing our own permissions
- future
  - PKI support
  - Sentinel Policies
  - Namespaces
    - vault within a vault
  - auto-generated PRs for common functionality
  - service discovery for AppRole CIDR ranges
    - pull from Consul?
  - security updates
    - Vault 2FA policy
    - Enterprise Control Groups
      - require multiple humans to approve changes
  - more validation for PRs
    - might not be worth time-wise
  - generic-ize Jenkins pipeline
  - try something new and work incrementally
  
## Enabling, Integrating, and Automating Consul ACLs at Scale
[ref](https://youtu.be/lwAs5vCH8D8)
- Kong Cloud, API gateway
- Consul ACLs
  - RBAC
  - tokens/rules/policies
  - assign tokens to policies
  - policies are groupings of rules
  - can have positive or negative security models
  - v1.4
- HCL
  - read/write/deny
  - resource, service, agent
  - can create token from consul ACL API or via CLI
- why?
  - to minimize blast radius
  - compliance
- how?
  - associate IAM to Vault
- requirements for ACL Token Generation
  - rotation support
  - Consul Secrets Engine
    - tie ACL token and IAM token

## Crawl, Walk, Run with Terraform
[ref](https://youtu.be/iQYWJrdnZ9I)
- typical files (tf, tfvars, tfstate, terraform)
- phases
  - init
  - plan
  - apply
  - destory
- commands
  - fmt
    - rewrites config files to canonical format
  - refresh
    - update local state file against real resources
  - console
    - repl
  - state
- walk
  - understand how modules work
  - be wary of keeping state private
  - test!
    - terratest (for your own modules)
    - kitchen-terraform (for your infra)
  - repo structure
    - recommended: multiple workspaces per repo

## Breaking the Ice: Secure Introduction With Vault and Kubernetes
[ref](https://youtu.be/myvAkGwCA0s)
- @rewatch
- integrating K8s with Vault
  - read service account token
  - ask Vault to login
  - ask Vault (again) for secrets with token
- can use Vault Agent instead
  - Vault in client daemon mode in a sidecar/init
  - automatic authentication
  - manages token lifecycle
- Vault as a Service in K8s
  - using Helm
- Secret Injection
  - with Agent++
  - launch a pod and get secrets directly (in alpha)

## Our Terraform Journey: The good, The bad, The ugly
[ref](https://youtu.be/zxXkvO49kbo)

## Consul Service Mesh: Deep Dive
[ref](https://youtu.be/Aq1uTozNajI)
- multi-cloud service networking platform to connect and secure any service across any runtime platform and public/private cloud
- patterns
  - configurations
    - json
    - proxy defaults
    - service defaults
    - service router
    - service splitter
    - service resolver
    - router -> splitter -> resolver
  - traffic routing
    - can route from monolith to microservice
    - can do this routing without making any change in code, can match via path
  - traffic resolver
    - for canary testing
    - add header to specify traffic routing/resolution
  - traffic splitting
    - increase routing traffic % over time
    - can combine all three together
  - multi-cluster gateway
    - Consul gateway can forward between gateways across clusters automatically in mTLS