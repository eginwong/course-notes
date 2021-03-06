# Design for identity and security

- Cloud Adoption Framework
  - Strategy > Plan > Ready > Adopt > Govern > Manage > Organize
  - Strategy
    - motivations, business justifications, business outcomes, first project
  - Plan
    - inventory of digital estate, organizational alignment, skills readiness, cloud adoption plan
  - Ready
    - Azure setup, landing zone, expand landing zone, best practices
  - Adopt
    - Migrate first workload, migration secnarios, best practices, process improvements
    - Innovate business value, innovation guide, best practices, feedback loops
  - Govern
    - Methodology, Benchmark, Initial governance foundation, improve
  - Manage
    - management baseline, business commitments, expand mgmt baseline, advanded ops and design principles
  - Organize
- Azure security best practices
  - boundary security
    - zero trust approach
    - enable JIT Access on VMs from Azure Security Center
    - conditional access based on device/location/etc
  - db security
    - firewall rules
    - db authN
    - TDE, row-level security
    - db auditing
    - db vulnerability assessment
    - db threat detection
  - data security and encryption
    - choose a key mgmt solution
    - if sending data from Azure vnet to on-prem over public internet, consider VPN Gateway
      - site-to-site VPN, point-to-site VPN, ExpressRoute
  - identity management and access control
    - centralize identity management
    - enable password hash synchronization
      - syncs between on-prem and AAD passwords
    - plan security reviews
    - SSO
    - Conditional Access
    - Password Management
    - MFA
  - network security
    - use strong network controls
    - use subnets
    - use network security groups to protect against unsolicited traffic
  - operational security
    - incident notifications
    - manage passwords and users
    - streamline environment creation with blueprints
    - enable Azure policy
  - VM security
  - use DMZs
  - RBAC
  - use AAD
  - Protect your keys
  - use SAS for your data access
  - use least privilege
  - use ARM
  - encrypt disk for VHDs

## Design Authentication
- AAD
  - creating a custom AAD domain
  - AD connect is to sync between on-prem and AAD
  - (AD Premium) Self-service Password reset
  - can create auth methods and determine which are available 
  - on-prem integration
    - allow unlock, allow password change online
- Authentication
  - user ID/Password, MFA, federation of identity
  - what are they authorized to do? (read-only, contributor, owner)
- AD Synchronization
  - SSO with AD Connect
  - if access is revoked, it is everywhere
- Protecting AuthN
  - IPSec
    - IP-level security
    - encrypting data packets
    - Authentication Header (AH) signing
    - usually for VPNs
  - Site-to-Site VPN
    - with IPSec
  - MFA
- Password Hash Synchronization
  - sign-in method for hybrid identity
  - hash of a hash of a users password from on-prem AD to AAD
  - reduces helpdesk cost, single password for both
  - install AAD connect, configure directory sync, enable password hash
- Pass-through authN
  - alternative to password hash synchronization, for enforcing on-prem AD policies
  - nothing stored in cloudHA
  - free
- AAD SSO
  - combined with password hash sync or pass-through authN
  - SSO is not applicable with ADFS
  - needs user to be domain joined only
  - free
  - creates new AZUREADSSOACC account and Kerberos decryption key
  - AAD connect trace log files stores personal data
    - can extra data from person and remove on log OR don't keep data longer than 48 hours
  - to roll out, need to turn on feature and then update Intranet zones to be able to hit Kerberos
- Application Proxy
  - enables users to access on-prem apps by signing in with AAD account
  - requires Windows Server 2012 R2
  - enable TLS
  - do not put AAD Password Protection Proxy with App Proxy together
    - bad mix of versions of AAD Connect Agent Updater service
  - download connector service from Azure under Application Proxy
  - windows service
  - in Azure portal, add link to internal and external URLs to be accessed through the proxy
- Design for security in Azure (course)
  - defend integrity, availability, confidentiality
  - PIM requires AAD Premium P2
  - SSE automatically encrypts all Azure Storage services
  - both performance tiers / deployment models

## Design Authorization
- Could be person or application
  - role-based
  - claim-based
    - in position of a token/api_key
- Approach to Authorization
  - delegating authN
  - register apps with AAD
  - AAD conditional access
    - can check location/device/mfa
  - delegate secret holding through Azure Key Vault
  - principle of least privilege
- AAD Groups and Roles
  - Groups
  - built-in roles
    - owner
    - contributor
    - reader
  - custom roles through AAD Premium
- Azure security best practices
  - follow Security Center recommendations
  - store keys in Azure Key vault
  - Install WAF
  - MFA
  - encrypt VHD
  - connect machines via Azure VNETs
  - DDoS protection
  - ILB if stateless
    - App Gateway to maintain sessions/state
    - Traffic Manager for global traffic
  - data encryption
    - cell-level, always encrypted, or row-level security
- RBAC
  - role-based authZ
    - admin, creator, reader
  - resource-based authZ
    - depends on resource
  - must also check the tenant id because some are across tenants
- API Management
  - admin create APIs of (1+ operations) and each can be added to 1+ products
  - made up of
    - API Gateway
      - verifies API calls and routes them to backend
      - API Keys, JWT tokens, certs, other creds
      - enforces usage quotas and rate limits
      - caches backend responses when set up
      - logs call metadata for analytics
    - Azure Portal
    - Developer Portal
      - try out API
      - documentation
      - create account + API keys
      - access personal analytics
  - Products can be Open or Protected
  - Policies can also serve as interceptors and transform inputs/outputs and rate limit
  - add a cert and set it as backend policy

## Design for Risk Prevention for Identity
- things that have negative effects to the business
- how likely and how bad
- data loss, financial loss, DoS, loss of trust, government compliance
- risk from expired users, too high permissions, physical access
- access reviews
  - policy to be forced to review user membership
- company policy engine
- Azure AD Connect Health
- should have layers of security
  - RBAC, NSG, HTTPS
- Privileged Identity Management (PIM)
  - only admin has additional identity
- Advanced Threat Protection (ATP)
  - suspicious activity
- Choose a solution for integrating on-prem AD with Azure
  - can use AAD + AD Connect
    - may need AAD Domain Services to authenticate service + computer accounts
  - OR have VPN + ExpressRoute and have a VM in Azure with AD DS as a Domain Controller
    - replicate an ADFS deployment to Azure
    - allows for partner organization AuthN/Z and outside of firewall
      - requires AD FS Web App proxy, ADFS, ADDS in Azure

## Design Monitoring Strategy for Identity and Security
- Alert Notification (PIM)
  - can customize values that trigger alerts
- Stream Azure monitoring data to an event hub
  - best to use Azure Event Hubs
  - can do manual streaming with Logic Apps
  - outbound ports 5671 and 5672
- Identity is the secure doorway into your app
- Root of attack is in On-prem AD > AD Connect > Log Analytics
- Patching/anti-virus/firewall
- Sign-in activity reports in the AAD portal
  - sign-ins, audit logs
  - risky sign-ins, users flagged for risk
  - data access for security admin/reader, global reader, report reader, global admins
  - sign-in data is stored in AAD premium
- Securing your identity infra
  - strengthen credentials
    - Azure's dynamic banned password stops users from setting guessable passwords
  - reduce attack surface area
  - automate threat response
  - utilize cloud intelligence
  - enable end-user self-service
  - ENABLE MFA FOR PRIVILEGED USERS
- Monitor and review logs for on-prem AAD Password Protection Environments
  - DC agent event logging
  - `Get-AzureADPasswordProtectionSummaryReport`
- AAD activity logs in Azure Monitor
  - can route to storage account, event hub, custom log solutions, Azure Monitor
  - audit logs, sign-in logs
  - B2C audit logs not included
  - 2-5 min delay for event hubs
  - 5-15 min delay for storage accounts
- Optimize your AD env with AD Health Check Solution in Azure Monitor
  - install Log Analytics agent for Windows to each DC
  - create storage for the logs
  - Security and Compliance, Availability and Business Continuity, Performance and Scalability, Upgrade, Migration and Deployment
  - can add a IgnoreRecommendations.txt file to each computer agent
  - log query is `ADAssessmentRecommendation`
- Security, responsibility and trust in Azure
  - Azure Application Gateway includes load balancer and Web Application Firewall
  - Azure Firewall protects Azure VNETs
  - Network virtual applicances (NVAs) are good for non-HTTP services