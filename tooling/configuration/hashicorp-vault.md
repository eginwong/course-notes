# Hashicorp Vault

> Manage Secrets and Protect Sensitive Data
> ...address distributed cloud infrastructure

## Summary
* handles Secrets Management (centrally store/access/distribute dynamic secrets such as tokens, pws, certs, keys)
* Data Protection (centralized key mgmt and simple APIs for data encryption) 

## Overview
* how do we centralize all the configs in our app
* how do we get away from static credentials and create dynamic ones instead
    * generating credentials on the fly
* Authenticates against trusted sources of identity like Kubernetes, AD, LDAP, CloudFoundry and cloud platforms
![img](https://www.datocms-assets.com/2885/1539718548-howvaultworks3.svg)
* API-driven
* Secure with any identity
* Extend and Integrate public clouds, private datacenters, dbs, cloud platforms, mqueues, SSH

## OSS or Enterprise?
* OSS:
    * secrets mgmt and data protection
    * one workflow to connect any service
    * for individuals
* Enterprise:
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
* storage backend is stores encrypted data, backends are not trusted 
* barrier is a gate that ensures only encrypted data written out and data is verified and decrypted in
    * must be unsealed before anything inside can be accessed
* Secrets engine manages secrets either key-value or dynamically
* Audit device logs all requests + responses to/from vault
* Vault uses a client token ("Vault Token") like a session cookie on a web site. 
    * used for applicable ACL policies + passed via HTTP headers
* Server refers to long-running instance that provides API + manages secret engine, ACL enforcement and lease revocation
![ref architecture](https://www.vaultproject.io/img/layers.png)
* Vault begins in a sealed state and before any operation, must be unsealed
    * unsealed via unseal keys
    * on initialization, vault generates an encryption key for all the data, which is protected by a master key -> further split into 5 shares, 3 of which can reconstruct master key
        * [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir's_Secret_Sharing) 
* Once unsealed, Vault loads all configured audit devices, auth methods, and secrets engines
* After unsealing, requests can be processed from HTTP API to Core, which manages flow of requests +ACLs and logging
* on first connect, a client must authenticate and will have the auth request flow through core and into an auth method -> returns associated policies
* operates under *whitelist* mode, i.e. no access unless explicitly granted
* once authenticated, will have token for every request and will then be routed to secrets engine
    * if secrets engine returns secret, core registers with expiration manager and adds a lease ID which will renew/revoke the secret
* Vault is generally IO bound than CPU-bound
    * Certain storage backends will automatically allow Vault to run in HA mode without additional configs
    * For multiple Vault servers sharing 1 storage backend, only a single instance can be active and the rest are hot standbys
    * active-passive, and only unsealed servers act as a standby
    * enterprise level includes performance-standby nodes that allow for read-only processes and forwards writes to the active server
* Security Model:
    * External threats would include the client, Vault server, and storage backend
        * no trust between client and server, only via token
        * storage backends are also untrusted and only receive encrypted data via AES ciphers in GCM with nonces
    * TLS used all throughout
    * Having the master key doesn't help much because it only unseals Vault, but still requires ACL and regular requests to retrieve data
* Telemetry: 
    * runtime metrics retrieved on 10s interval and retained for one minute
    * includes [C]ounter, [G]auge, and [S]ummary
* Token Authentication:
    * id, display name, metadata, number of uses, parent id, policies, source path (path at which token was generated)
    * the source path is used for revokation and can be quickly used to revoke all tokens provided from that path
    * also creates parent/child token modelling, which can quickly revoke an entire tree of children tokens
    * has limited-use tokens as well, which cannot create sub-tokens
* Key rotation:
    * `rekey` and `rotate` support changing unseal, master, and backend encryption keys
    * must have existing keys in order to `rekey` for regeneration, unseal and master keys
    * `rotate` for encryption key, done online and never visible to operators
    * only active vault can perform either operation, but standby will have a few minutes to roll on the new encryption key
* Replication: 
    * back up sites, multi-datacenter deployments, scaling throughput
* Plugins: 
    * do not share the same memory space as Vault
    * mutually authenticated TLS connection for communication with plugin's RPC server

### Concepts
* SEALING: 
    * on startup, Vault knows where and how to access the physical storage but not how to decrypt it
        * need to unseal first, by creating the master key
        * each shard of master key can be on a distinct machine for better security
        * can easily install and configure vault but not easy to auto unseal - only manual
    * sealing requires single operator + root privileges
    * auto unseal can be done via trusted devices, but only for easing operational complexity

## GitHub README.md
* Secure Secret Storage
    * vault writes to disk/Consul and encrypts before persisting
* Dynamic Secrets
    * on-demand for AWS or SQL dbs
    * will auto revoke when lease expires
* Data Encryption
    * encrypt + decrypt without storing data
* Leasing and Renewal
    * all secrets have a lease associated with them and they will be revoked after a time period
    * clients can renew via built-in APIs
* Revokation
    * can revoke single and trees of secrets
    * can easily lock down systems in case of intrusion

Questions:
1. Vault or Vault Enterprise?
   * failover, DR?
2. Should I look into Azure Key Vault (still in Beta)?