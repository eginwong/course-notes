# Azure Security´

- 10-15% on the AZ-203 exam
- implement authentication
  - using certs, forms-based auth, or tokens
  - multi-factor or Windows auth by Azure AD
  - OAuth2 auth
  - implement Managed Service Identity (MSI)/Service Principal authentication
- Authentication is act of challenging a party for legitimate credential, providing the basis for creation of a **security principal** to be used for identity and access control
  - knowing the identity of the user
- Certificate-based authentication (trusted apps or Microsoft Apps)
  - eliminates need to enter a username/password for certain Microsoft Office apps on your mobile device
- Forms-based Authentication
  - uses an HTML form to send the user's credentials to the server
  - easy to implement, built-in to ASP.NET
  - requires a browser, not standard HTTP auth mechanism and uses HTTP cookies instead, CSRF, credentials sent as plain-text, some users disable cookies
- Azure Active Directory
  - fully managed multi-tenant service from Microsoft that offers identity and access capabilities for apps running in Microsoft Azure
- Application Model (things we must support)
  - identify app according to the authentication protocols it supports
  - handle user consent during token request
- What's inside the token?
  - Claims!
  - validate the token, identify subject's directory tenant, user information, ...
- [sample](https://github.com/AzureADQuickStarts/AppModelv2-WebApp-OpenIDConnect-DotNet)
  - create azure ad
  - create new app registration
    - name, app type, sign-on url
  - visual studio, can publish from the Build dropdown
  - azure, have to change the app to "multi-tenanted" from the app > settings > properties 
  - get the azure AD url (as the domain) from the Azure Active Directory tab
  - need to add a new user with AD Url as domain of the user
  - claims are sensitive information so you should not share that
- multi-tenant, yes, no, needs to be set "yes" to allow cross-domain (i.e. one is on.microsoft.com, the other is .azurewebsites.com)
- multi-factor authentication
  - knowledge (pwd)
  - possession (phone)
  - inherence ()

# Azure Security, part II
- Service principal authentication (accounts run by apps and not by people)
- RBAC, role-based access control
  - role (reader, resource-specific or custom role, contributor, owner) by scope (subscription, resource group, resource)
- flow
  - security principal (user, group, service principal, managed identity)
  - role definition
    - roles will have a set of actions/not-actions defined
      - built-in and custom  
  - scope (group of resources on which these actions are applied)
- can do multiple role assignment
- select item that you want to grant access control to, and then access control (IAM) > role assignments 
- shared access signatures (SAS)
  - provide you with a way to grant limited access to objects in your storage account to other clients
  - service SAS
  - account SAS
  - no need to create portal account
- TODO: CBAC
- encryption models
  - client-side
  - server-side
  - must enable "secure transfer required" option in the Storage Account > Configuration
    - does not work from custom domain
- encryption of SQL databases
- transparent data encryption is managed

# Azure Key Vault
- secrets management
- key management
- cert mgmt
- store secrets backed by hardware security modules


# Self Research

## Implement authentication

- authentication is challenging a party for legitimate credentials, providing basis for creation of a security principal to be used for identity and access control
  - proving you are who you say you are
- authorization is act of granting an authenticated security principal permission to do something
- MSFT identity platform is the identity provider, which verifies identity of users and apps that exist in an org's directory, issues security tokens upon successful AuthN
- app that wants to use MSFT's identity platform must be registered in AAD
- once a user has authenticated, the app must validate the user's security token to ensure success
- flow of requests depends on AuthN protocol used: OAuth2, OpenID, WS-Fed, SAML2
- two sorts of apps: ones that need to securely access resources and others that are the resource
- application model 
  - holds all data required to support authN at runtime, all data for deciding what resources an app might need to access and what conditions, infrastructure for implementating app provisioning within the app dev's tenant to any other AAD tenant
- flow
  - sign in with app
  - creds are acquired and verified
  - user is prompted to consent for app to gain access
  - MSFT identity platform uses app object in A as blueprint for creating service principal in B
  - user receives requested token
- security tokens issued by MSFT identity platform contain claims/assertions of info about the subject that has been authenticated
  - validation
  - user info
  - subject's authZ


## Implement access control

## Implement secure data solutions
