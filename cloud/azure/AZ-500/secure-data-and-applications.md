# Secure data and applications (30-35%)

## Configure Security Policies to Manage Data
- data classification
  - personal data
  - customer data
  - admin data
  - object metadata
  - payment data
  - support/consulting data
  - Azure retains data for 90 days
  - immutable storage = WORM (write once, read many)
  - time-based retention policy or legal hold policy
  - Azure Information Protection (AIP) to label documents and emails
    - Classifications > Policies > Global
- storage analytics data retention is 20 TB limit, max retention is 365 days
- can use Azure policy to implement governance over location of data
- Discover, Manage, Protect, Report


## Configure Security for Data Infrastructure
- use AAD for SQL db auth
  - only a single user or group can be the administrator for a SQL server at any time
  - use Active Directory Integrated in DB connection from within a client application
- auditing policy for db can be at db level or default server policy
  - premium storage is not supported for audit logs
  - storage in vnet is not supported for audit logs
  - storage behind a firewall is not supported for audit logs
- Threat Detection
  - can be configured for single and pooled dbs
  - part of advanced data security (ADS)
  - for Azure Storage
    - ASSE
    - Client-side encryption, ADE, SAS
  - instead of SAS key rotation, can abstract using Azure Key Vault
- HDInsights
  - can create a cluster with Enterprise Security Package, joined to AD
  - can use AADDS for authentication and Apache Ranger/Solr for Authorization
  - requires ADDS to create HDInsight cluster with ESP
- Azure Blob storage + Azure Data Lake support transparent sse of data at rest
  - User delegation SAS
    - blob storage only
  - Service SAS
    - only blob, queue, table, or files
  - Account SAS
    - for the entire storage account
- Azure Cosmos DB encrypted at rest by default
  - uses master keys or resource tokens for access
    - create a resource token by creating Azure Cosmos DB users
  - global replication, automated backups 
  - stores backups within write regions every 4 hours


## Configure Encryption for Data at Rest
- SQL db Always encrypted
  - encrypt by column, can store in AKV
  - implement TDE
    - SQL server, Azure SQL, SQL DW
    - real-time I/O encryption/decryption
    - uses a Db Encryption Key
    - symmetric key or asymmetric key if using AKV
    - can bring your own key for asymmetric protection
    - AKV requires soft delete key feature for SQL TDE BYOK
  - create a master key, then an encryption key
  - `ColumnEncryptionSetting.Enabled`
- TDE
  - requires SQLServer to do a full encryption scan, reading each page into buffer pool
    - can now pause and resume
  - cannot be applied to master db
  - bacpac file is not encrypted and the export is not encrypted if on-prem
    - is encrypted if going from SQL db to another SQL db in Azure
    - must be turned on on the new instance
    - need TSQL for Managed Instance
  - using BYOK
    - can manage keys in AKV
    - must belong to same AAD tenant
    - soft-delete feature must be enabled
    - SQL db server must have access to key vault using AAD identity
    - associate at most 500 or 200 critical dbs to a single key vault
    - if key is lost, inaccessible after 10 min
      - if access is restored within 8 hours, will auto-heal in an hour
      - if longer than 8 hours, requires more effort
    - will need old versions of TDE protector to decrypt old backups
- ASSE
  - for custom key, requires soft delete and do not purge permissions
- ADE for IaaS VMs
  - must prep AKV to enable support for ADE


## Configure Application Security
- all newly created App Services will have TLS
- to keep old IP address
  - upload new cert
  - rebind dns
  - delete old cert


## Configure and Manage Key Vault
- access to AKV
  - mgmt plane
  - data plane
  - both planes use AAD for authN
  - AKV tied to AAD tenant of the subscription
  - key vault policies apply at the vault level
  - <keyvault-name>.vault.azure.net/<object-type>/<object-name>/<object-version>
  - soft keys FIPS level 1
  - hard keys FIPS level 2, from within HSM Security Worlds
  - Key Vault does not support Export
  - supports auto lifecycle of a certificate
  - only one instance of a policy for a Key Vault certificate
  - deleted keys up to 90 days
  - purge protection forces a wait period of 90 days