# Develop a security and compliance plan (10-15%)

## Design an authentication and authorization strategy
- design an access solution (Azure AD Privileged Identity Management (PIM), Azure AD Conditional Access, MFA)
- organize the team using Azure AD groups
- implement Service Principals and Managed Identity
- configure service connections

## Design a sensitive information management strategy
- evaluate and configure vault solution (Azure Key Vault, Hashicorp Vault)
- generate security certificates
- design a secrets storage and retrieval strategy
- formulate a plan for deploying secret files as part of a release

## Develop security and compliance
- automate dependencies scanning for security (container scanning, OWASP)
- automate dependencies scanning for compliance (licenses: MIT, GPL)
- assess and report risks
- design a source code compliance solution (e.g. GitHub security, pipeline-based scans, Git hooks, SonarQube)

## Design governance enforcement mechanisms
- implement Azure policies to enforce organizational requirements
- implement container scanning (e.g. static scanning, malware, crypto mining)
- design and implement Azure Container Registry Tasks (eg. Azure Policy)
- design break-the-glass strategy for responding to security incidents

- Incident response
  - diagnose, triage, mitigate, communicate
  - elite performers respond within 1hr
  - incidents as pulse of system
  - three pillars
    - rosters
      - on-call team
    - roles
      - primary responder
      - SME
      - incident commander
      - scribe
      - communication coordinator
    - rotations
  - standardize where incident info will be tracked
  - assess what is known
  - create conversation bridge
  - automate framework
    - Logic app with Teams
  - prioritize clear communication
    - ChatOps
    - use a bot to update stakeholders through a Function or Logic App
  - Update stakeholders
    - this is what we know
    - what we're doing
    - we'll get back to you in X time
- AAD
  - tenant is organization in AAD
  - identity score is 1-223 for how secure according to MSFT
  - licenses
    - Free
    - P1
      - access on-prem and cloud-based services
    - P2
      - risk-based conditional access, PIM, identity protection
    - pay-as-you-go
  - B2B external users to your tenant
  - B2C for their auth
  - AD Application Proxy to access on-prem apps to AAD
- Learning from failure
  - talk about what happened, not what didn't
  - people are a symptom
  - normative language due to hindsight bias
  - have a facilitator for post-morterm
  - ask better questions
    - how or what, instead of why
    - talk about how you recovered
    - keep review and planning meetings separately
- API Mgmt
  - check thumbprint of certificates uploaded to APIM
- Monitor Infra with Azure Policy
  - initiative is a group of policies
  - Azure blueprints for environment setup, higher level than ARM
- Monitor and report on security events in Azure AD
  - valid prebuilt views
    - Sign-ins Events
    - AAD Account Provisioning Events
- Authenticate using Service Principals
  - authZ requires
    - tenant id
    - app id
    - authN key
  - managed identities can only be used with Azure resources