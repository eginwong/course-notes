# Design for identity and security

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

## Design Monitoring Strategy for Identity and Security
- Alert Notification (PIM)
  - can customize values that trigger alerts
- Identity is the secure doorway into your app
- Root of attack is in On-prem AD > AD Connect > Log Analytics
- Patching/anti-virus/firewall