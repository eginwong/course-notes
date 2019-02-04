# Hashicorp Vault

> Manage Secrets and Protect Sensitive Data
> ...address distributed cloud infrastructure

## Summary
- handles Secrets Management (centrally store/access/distribute dynamic secrets such as tokens, pws, certs, keys)
- Data Protection (centralized key mgmt and simple APIs for data encryption) 

## Overview
- how do we centralize all the configs in our app
- how do we get away from static credentials and create dynamic ones instead
    * generating credentials on the fly
- Authenticates against trusted sources of identity like Kubernetes, AD, LDAP, CloudFoundry and cloud platforms
![img](https://www.datocms-assets.com/2885/1539718548-howvaultworks3.svg)
- API-driven
- Secure with any identity
- Extend and Integrate public clouds, private datacenters, dbs, cloud platforms, mqueues, SSH

## OSS or Enterprise?
- OSS:
    * secrets mgmt and data protection
    * one workflow to connect any service
    * for individuals
- Enterprise:
    * collab features in team setting or across an organization
    * for larger complexity items
    * supports namespaces for multi-tenancy
    * auto-unseal vault clusters in Azure Key Vault
    * read replicas for hyper-performant reads 
    * FIPS 140-2 compliance
    * MFA workflows
    * Control groups
    * Disaster Recovery for Enterprise Pro, Replication for Premium

## Documentation
[ref](https://www.vaultproject.io/docs)
### Internals
- storage backend is stores encrypted data, backends are not trusted 
- barrier is a gate that ensures only encrypted data written out and data is verified and decrypted in
    * must be unsealed before anything inside can be accessed
- Secrets engine manages secrets either key-value or dynamically
- Audit device logs all requests + responses to/from vault
- Vault uses a client token ("Vault Token") like a session cookie on a web site. 
    * used for applicable ACL policies + passed via HTTP headers
- Server refers to long-running instance that provides API + manages secret engine, ACL enforcement and lease revocation
![ref architecture](https://www.vaultproject.io/img/layers.png)
- Vault begins in a sealed state and before any operation, must be unsealed
    * unsealed via unseal keys
    * on initialization, vault generates an encryption key for all the data, which is protected by a master key -> further split into 5 shares, 3 of which can reconstruct master key
        * [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir's_Secret_Sharing) 
- Once unsealed, Vault loads all configured audit devices, auth methods, and secrets engines
- After unsealing, requests can be processed from HTTP API to Core, which manages flow of requests +ACLs and logging
- on first connect, a client must authenticate and will have the auth request flow through core and into an auth method -> returns associated policies
- operates under *whitelist* mode, i.e. no access unless explicitly granted
- once authenticated, will have token for every request and will then be routed to secrets engine
    * if secrets engine returns secret, core registers with expiration manager and adds a lease ID which will renew/revoke the secret
- Vault is generally IO bound than CPU-bound
    * Certain storage backends will automatically allow Vault to run in HA mode without additional configs
    * For multiple Vault servers sharing 1 storage backend, only a single instance can be active and the rest are hot standbys
    * active-passive, and only unsealed servers act as a standby
    * enterprise level includes performance-standby nodes that allow for read-only processes and forwards writes to the active server
- Security Model:
    * External threats would include the client, Vault server, and storage backend
        * no trust between client and server, only via token
        * storage backends are also untrusted and only receive encrypted data via AES ciphers in GCM with nonces
    * TLS used all throughout
    * Having the master key doesn't help much because it only unseals Vault, but still requires ACL and regular requests to retrieve data
- Telemetry: 
    * runtime metrics retrieved on 10s interval and retained for one minute
    * includes [C]ounter, [G]auge, and [S]ummary
- Token Authentication:
    * id, display name, metadata, number of uses, parent id, policies, source path (path at which token was generated)
    * the source path is used for revokation and can be quickly used to revoke all tokens provided from that path
    * also creates parent/child token modelling, which can quickly revoke an entire tree of children tokens
    * has limited-use tokens as well, which cannot create sub-tokens
- Key rotation:
    * `rekey` and `rotate` support changing unseal, master, and backend encryption keys
    * must have existing keys in order to `rekey` for regeneration, unseal and master keys
    * `rotate` for encryption key, done online and never visible to operators
    * only active vault can perform either operation, but standby will have a few minutes to roll on the new encryption key
- Replication: 
    * back up sites, multi-datacenter deployments, scaling throughput
- Plugins: 
    * do not share the same memory space as Vault
    * mutually authenticated TLS connection for communication with plugin's RPC server

### Concepts
- SEALING: 
    * on startup, Vault knows where and how to access the physical storage but not how to decrypt it
        * need to unseal first, by creating the master key
        * each shard of master key can be on a distinct machine for better security
        * can easily install and configure vault but not easy to auto unseal - only manual
    * sealing requires single operator + root privileges
    * auto unseal can be done via trusted devices, but only for easing operational complexity
- LEASE, RENEW AND REVOKE: 
    * leases with TTL
    * consumers will need to routinely check in with Vault to renew or request replacement
    * when leases are revoked, the associated secret is revoked immediately
    * can set duration if you don't need as much time, but backend can ignore the `increment`
- AUTHENTICATION:
    * must enable authentication method before use
    * supports multiple auth methods to different paths
    * once verified, will issue a token like a session
    * all identities have leases associated
- TOKENS:
    * `service` token:
        * handled by token store, which creates, stores, and cannot be disabled
        * root tokens have the `root` policy attached, can be set to never expire
            * revoke once no longer necessary
        * orphan tokens have no parents so they will not be revoked in a tree
        * token accessor, on token creation, can look up a token's properties, capabilities on a path revoke the token
        * token has TTL and after expiry, their associated leases are revoked
        * TTL is determined by system max TTL, max TTL on a mount, or the suggested increment < max TTL on mount
            * there are explicit max TTLs that are irrespect of the previous conditions
        * with periodic tokens, can be created using `sudo`, token store roles, or auth methods that support
            * will provide unlimited lifetime as TTL will be reset back to config period 
    * `batch` token:
        * lightweight encrypted blobs that carry info for Vault actions but no storage on disk
        * can be used across performance replication clusters if orphaned
        * can scale creation with perf standby node count
- RESPONSE WRAPPING:
    * when you have to send information through multiple hops (if there's a central place to interact with the Vault)
    * takes response it would have sent and send it in a single-use token instead, which is a reference to the secret, also has TTL, and can be inspected to ensure origin is from expected location in Vault
    * unsigned as would provide little benefit
    * flow: client expects response-wrapping token, perform lookup if arrived, validate creation path matches what is expected, unwrap. If any of these steps fail, investigate
- POLICIES:
    * user authenticates, goes to Identity provider, gets associated role mapping attached to token, retrieves token
    * written in HCL or JSON
    * glob (*) is only supported as last character of path and not as regex 
    * `list` capability should remember to include trailing slash `/` in path
    * `create`, `read`, `update`, `delete`, `list`, `deny`, `sudo`
    * template policies exist as well, [ref](https://www.vaultproject.io/docs/concepts/policies.html)
        * use IDs whenever possible as they are unique to the user
    * fine-grained control includes `required_parameters`, `allowed_parameters`, `denied_parameters`
    * only `*` can be used with `[]`
    * settings for `min_wrapping_ttl` and `max_wrapping_ttl`
    * policies uploaded via CLI or API
```HCL
# This section grants all access on "secret/*". Further restrictions can be
# applied to this broad policy, as shown below.
path "secret/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Even though we allowed secret/*, this line explicitly denies
# secret/super-secret. This takes precedence.
path "secret/super-secret" {
  capabilities = ["deny"]
}
```

## Secrets Engine
- store, generate, or encrypt data
- some are encrypted kv stores, others connect to services and generate dynamic credentials, or  others provide encryption as a service, certs, etc.
- stored in a certain path, but can be moved/enabled/disabled/tuned via API + CLI
- if secrets engine writes to persistent storage, it's locked down in fs by its UUID/ path
- Key Value Secrets Engine
    * Version 1 non-versioned, will reduce storage size and will be more performant
    * Version 2 stores default 10 versions

## Authentication Methods
- for servers and apps, best to use `approle` auth
    * make an auth REST call to retrieve `client_token`
- can connect via k8s auth as well

## GitHub README.md
- Secure Secret Storage
    * vault writes to disk/Consul and encrypts before persisting
- Dynamic Secrets
    * on-demand for AWS or SQL dbs
    * will auto revoke when lease expires
- Data Encryption
    * encrypt + decrypt without storing data
- Leasing and Renewal
    * all secrets have a lease associated with them and they will be revoked after a time period
    * clients can renew via built-in APIs
- Revokation
    * can revoke single and trees of secrets
    * can easily lock down systems in case of intrusion

## Practical Application
- Secret Types
    * kv, API_keys, static data
    * dynamically generated credentials, db creds, ssh key pairs, certs, AD accounts 
    * cryptographic keys, never shared and used to encrypt and de-encrypt
    * each secret type has mount point (REST API prefix), set of operations exposed, and config params
- In order for spring to load up access to vault, it requires bootstrap properties which means we may still need Spring Cloud Config
- Spring Cloud Config Server:
    * include token in `bootstrap.yml` like `spring.cloud.config.token`
    * in `application.properties`, use `spring.profiles.active=vault`
    * `spring.cloud.config.server.vault`
        * host
        * port
        * scheme (http)
        * backend (secret)
        * defaultKey (application)
    * `secret/application` would be shared configuration across all applications
    * `secret/myApp` would only be to the application in question
        * can specify environments using `/dev` or `/prod`

### Areas of Interest
- Azure Storage Backend (no HA) or Consul or ETCD 
- In simplest case of using a fixed token with Spring-Cloud-Vault, can initialize location of Vault via system property or env variable
    * access variables from Vault under that environment path via `env.getProperty()`
    * [baeldung](https://www.baeldung.com/spring-cloud-vault) for reference
    * [abstraction to managing Vault via Spring](https://www.baeldung.com/spring-vault)
- [kotlin library for vault management](https://github.com/kunickiaj/vault-kotlin) 
- [simple example of spring cloud vault](https://github.com/gmarziou/demo-spring-cloud-vault)
- [latest doc for spring cloud config server](https://cloud.spring.io/spring-cloud-config/single/spring-cloud-config.html)