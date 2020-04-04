# Design a data platform solution

## Data Management
- Unmanaged 
  - table storage
  - blob storage
  - SQL Server in a VM
  - OracleDB in a VM
- Managed
  - VM Data Disk
  - Azure SQL Database
  - Cosmos DB
  - Azure Database for MySQL
  - Managed SQL Server
  - Redis
- Built-in High Availability
- Auto-scaling
- Threat Detection
- Auto-tuning
- Relational vs Non-Relational
  - relational is good for lift/shift
  - OLTP (online-transaction processing)

## Data Auditing and Caching
- SQL database tracks events to an audit log
  - written to append blobs
  - server-level vs db-level auditing
  - SQL Server System function to write your own reports
  - PowerBI
- DTU for pricing options
  - no concept of IOPS
  - relative measure of performance
- Cosmos DB Pricing
  - storage and throughput (RU/s)
  - reserving capacity

## Data Retention Strategy
- automatic geo-redundant backups
  - 7-35 days point-restore
  - long-term retention policy up to 10 years

## Data Availability, Consistency and Durability
- availability: remove single point of failure
- consistency: keeping data in sync
- durability: never losing data when writing to the DB
- azure SQL db Business Critical SLA, RPO of 5 sec for 100% of deployed hours
  - can be up and running in 30 sec in another region for 100% if using geo-redundant

## Data Warehousing
- for analytics
- not used for transactions
- roll up db from your OLTPs
- Azure Analysis Services, PowerBI, Big Data

## Data Protection Strategy
- geo-redundant storage (GRS)
- data encrypted at rest (natively on disk)
  - transparent data encryption TDE
  - can control keys using Azure Key Vault
- data encrypted in transit via SSL connections
- always encrypted setting
  - needs special client
- dynamic data masking
  - can specify a column that is masked
- Data Scaling
  - can scale up or down but will have downtime
  - manual scale
  - read scale-out
    - keep reads on secondary db
  - sharding
    - make logical division to store some data in one db and one in another
- Data Security
  - network level security
    - virtual network service endpoint
    - restricting resources only to what's on the NSG
  - SQL Database Firewall at server and db level
  - SQL auth vs Azure AD
  - Row Level Security
    - very low-level
  - Threat Protection (ATP) using ML
  - Azure Monitor to access logs
  - Encrypted in Transit (TLS/SSL)
- Data Loss prevention (DLP)
  - identify sensitive data
  - PII, or PCI
  - passwords in plain text
  - Azure Information Protection (like DRM)

## Data Monitoring Strategy
- Monitoring within SQL DB
- SQL Advisor
- Automatic tuning
  - force plan, create index, drop index
- SQL Intelligent Insights through AI
- Diagnostic Logs
- Azure SQL Analytics in Monitor