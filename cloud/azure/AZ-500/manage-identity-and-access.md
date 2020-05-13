# Manage identity and access (20-25%)

## Configure Azure Active Directory for workloads
- check if user can register apps to create service principals
  - app Id, secret, tenant id (AAD tenant), and subscription id
  - can retrieve through `az account list`
  - assign application to a role at the subscription level
  - must configure access policy on resource to use service principal
- auth through OAuth2.0, apps that integrate have an app id URI
  - finer-level permissions are called scopes/permissions
    - string value, i.e., Calendars.Read
  - permission types
    - delegated (signed-in user)
      - least-privileged intersection of your app's permissions and the privilege of the user
    - application (daemons, by admin only)
- MFA options
  - Account Lockout/Block/Fraud alert/Notifications/OATH tokens/Phone Call settings
  - MFA server
    - one-time bypass, caching rules
  - AAD > Security > MFA 
- OpenID Connect
  - can make some permissions admin-restricted 
  - would use admin consent endpoint
- Microsoft AAD Groups
  - Security
  - Office 365
  - Membership types
    - Assigned
    - Dynamic User
    - Dynamic Device
    - can be either dynamic but not both
  - can make nested groups
  - Azure B2B, AD Connect, or AAD


## Configure Azure AD Privileged Identity Management
- AAD Identity Protection
  - consolidated view of flagged users/risk events with ML
  - risk-based conditional access policies
  - needs AAD Premium P2
- PIM
  - AAD Premium P2 or Enterprise Mobility + Security (EMS) E5
  - to enable, must be Global Admin
  - expiry admin privileges
  - access reviews, 24 hours to approve


## Configure Azure Tenant Security
- Transfer msft subs between AAD tenants
  - all RBAC role assignments are permanently deleted when migrated
- API Gateway
  - can add Identity Provider through AAD
- Protected resources/client applications
  - should use tokens
  - SPA, use MSAL.js
  - Desktop Apps/Mobile/Apps with IOT, use MSAL PublicClientApplication; uses auth code
  - Daemon/Webapps/Web APIs, use confidential client application