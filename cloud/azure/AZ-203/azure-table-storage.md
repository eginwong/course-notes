# Azure Blob & Table Storage

- CAP Theorem
  - Consistency
  - Availability
  - Partition Tolerance
- Azure storage
  - REST
  - Client
  - Pay as you go
- Storage accounts
  - unique namespace for your data
  - General V1 (legacy), General V2, Blob Storage
  - access tiers
    - hot: costs the most, cheapest to access
    - cold: infrequent, stores for around 30 days, mid-way
    - archived: rarely, stores for at least 100 days; have to be flexible with your latency requirements
  - replication models (redundancy)
    - LRS: locally redundant store, cheapest; SLA is 11 9's over a year, 3 replicas 1 region; write protected against disk, node, rack failure
    - GRS: geo-redundant storage; SLA is 16 9's, and 300 miles away data centre, replicates 2 regions, 6 data centers, asynchronous
    - RA-GRS: read-access geo-redundant storage; get read-access from your secondary region
  - access models
    - every request against your storage account must be authorized
    - use Azure AD
    - or shared key
    - shared access signature, delegation without giving up key
      - provide granular control for access
      - validity interval (start and expiry time)
      - permissions granted by SAS
      - IP address or range of addresses to accept
      - restrict protocols accepted by Azure Storage
- account > container > blob 
  - block blob
    - upload large blobs efficiently (docs, images, videos)
    - 50000 blocks, each block has 100MB
  - append blob
    - optimized for appending operations
    - can't update or delete blocks
    - block has 4MB
    - good for logging, data analytics
  - page blob
    - optimized for read and writes
    - 512kb page ???
- Azure Blob storage Lifecycles
  - can expire
  - can transition to different access tiers
  - run automated jobs
  - example:
    - { "version": "0.5", "rules": [{ "name": "ruleName", "type": "Lifecycle", "definition": { "filters": { "blobTypes": [ "blockBlob"]}, "prefixMatch": ["..."], "actions": { "baseBlob": { "tierToCool": {"daysAfterModificationGreater": ...}}}}}]}
    - can move blobs around access tiers
  - create lease on block to be an exclusive lock
  - WORM -> Write once read many
- Azure tables
  - used to store NoSQL data in the cloud
  - can store any number of tables up to max of the storage account
  - enforce strong consistency
  - partitioning strategy
    - primary key of an identity
    - collection of entities with the same PartitionKey

# Self-research

## Develop Solutions that use storage tables
- azure storage table design guide
  - must have partitionKey and rowKey to be a unique combination
  - account + table names + partitionkey identify the partition within the storage service
  - entity group txns (EGTs) are the only built-in mechanism for performing atomic updates across multiple entities
    - need to be in the same partition
    - limited to a max of 100 entities
    - max of 255 props, 1MB per individual entity; max azure storage is 500TB
    - size of partitionkey/rowkey is string up to 1KB
  - design guidelines:  
    - read-heavy: querying in read-heavy apps; specify both partition/row keys in queries; store duplicate copies of entities for efficiency; denormalizing data; compound key values; query projection
    - write-heavy: don't create hot partitions, avoid spikes in traffic, don't necessarily create a separatate table for each type of entity; consider max throughput required
  - ideal point query (row + partition keys) > range query (partition key on range of row keys) > partition scan (partition key + non-row key) > table scan (no partition key)
  - several optimal patterns for lookup, optimizing on CUD operations
  - design patterns:
    - intra-partition secondary index pattern: store multiple copies of each entity in same partition
    - inter-partition secondary index pattern: store multiple copies of each entity using different RowKey values in separate partitions/in separate tables
    - eventually consistent txns pattern: eventually consistent behaviour
    - index entities pattern: enable efficient searches that return lists of entities
    - dernomalization pattern: break data
    - compound key pattern: RowKey + PartitionKey
- query table storage by using code
  - ps: `Install-Module AzTable`
  - create table, in ps: `New-AzStorageTable –Name $tableName –Context $ctx`
  - add rows, in ps: `Add-AzTableRow -table $cloudTable -partitionKey $partitionKey1 -rowKey ("CA") -property @{"username"="Chris";"userid"=1}`
  - to retrieve rows, in ps: `Get-AzTableRow -table $cloudTable`
    - with customfilter, `-customFilter "(userid eq 1)"`
  - to update row, must retrieve, update, and then commit, in ps: `Update-AzTableRow`
  - to delete row, in ps: `Remove-AzTableRow`
  - to delete table, can pipe everything into individual deletes or batch, in ps: `Remove-AzStorageTable`
- implement partitioning schemes
  - horizontal / vertical / functional data partitioning
  - improves scalability, reduce contention, optimize performance, operational flexibility, availability
  - horizontal (sharding): duplicates of same schema but subsets of data only
    - more important to balance the requests
  - vertical: each partition holds a subset of the fields, divided by their column use
    - sensitive data can have extra security controls
    - reduce the amount of concurrent access required
    - operates at an entity level
  - functional: data is aggregated according to how it is used by each bounded context
    - maybe read data in one and read/write data in another
  - partition data that is causing slow performance
  - minimize cross-partition data access operations; embrace eventual consistency
  - may need to rebalance partitions at a later date; plan for how and when to do that

## Develop Solutions that use CosmosDB storage
- implement partitioning schemes
  - logical partitions to physical partitions (hash-based)
  - single key has 10GB of storage, min throughput of 400RU/s
  - spread data and request throughput for partition
- set appropriate consistency levels for operations
  - strong (exact)
  - bounded staleness (within k intervals)
  - session (reads guaranteed to honor consistent prefix, read your writes, scoped to client session)
  - consistent prefix (prefix of all updates, never see out-of-order writes)
  - eventual consistency (no ordering guarantee for reads)
  - can configure default consistency level
  - for HA and lowest latency, go with eventual consistency

## Develop solutions that use a relational db
- provision and configure relational databases
  - portal > SQL Database > db name, server with user/pwd
  - create firewall rule for single and pooled dbs using Azure portal
    - blocks traffic unless IP firewall rule is created
    - > Set server firewall > Add client IP
  - replication to SQL db single/pooled dbs
    - p2p txnal replication and merge replication not supported
    - snapshot + 1-way txnal replication are supported
    - can be running on-prem or in the cloud
    - 2012, 2014, 2016, 2017 versions are supported
    - must have primary keys, subscriber can be any region
    - limitations include permissions/spatial+filtered indexes/partitioning schemes
- configure elastic pools for Azure SQL database
  - cost-effective for scaling multiple dbs with unpredictable usage demands; share set number of resources at a set price
  - charged per hour a pool exists at the highest eDTU or vCores
  - basic, standard, premium; deltas in backup retention, CPU, IOPS, storage sizes, DTU
  - tradeoff is at 1.5x the resources of a standalone SQL server versus a pool
  - choose pool size based on max resources utilized by all dbs in the pool or by max storage bytes utilized
    - estimate eDTUs or vCores first, then the storage space, then find the appropriate model, then determine min pool size, then compare to standalone single db costs
  - can use elastic jobs, and point-in-time/geo restores or active geo-replication
- CRUD data tables by using code

## Develop solutions that use blob storage
- implement blob leasing
  - establishes and manages a lock on a blob for write and delete operations for several seconds or infinite
    - `Acquire` (201), `Renew`, `Change`, `Release`, `Break` (202)
  - PUT: `https://myaccount.blob.core.windows.net/mycontainer/myblob?comp=lease`
    - Authorization, required
    - Date/x-ms-date, required
    - x-ms-lease-id, required to renew, change, or release the lease
    - x-ms-lease-action: acquire/renew/change/release/break
    - x-ms-lease-duration: -1 | N, for acquire operation, specifies duration of lease in seconds and between 15-60s
    - when lease is active, lease ID must be included for:
      - put blob, set blob metadata, properties, delete blob, put block, put block list, put page, append block, copy blob
        - would get a 412 - precondition failed otherwise
      - following operations work without including the lease id:
        - get blob, metadata, properties, get block list, get page ranges, list blobs, copy blob, lease blob
    - can delete container even if blobs have active leases
  - states of lease: available (acquire), expired (acquire, renew, release, break), leased (acquire, renew, change, release, break), breaking (release, break), broken (acquire, release, break)
- implement data archiving and retention
  - transition blobs to a cooler storage tier to optimize for performance cost
  - available for GPv2 accounts and blob storage accounts
  - free of charge
  - defined as a JSON with an array of rules
    - each rule has name, enabled, type, and definition
    - includes filter set (limits to objects within a container or object names) and action set
    - rule filters: blobTypes, prefixMatch
    - rule actions: tierToCool, tierToArchive, delete; `"tierToArchive": { "daysAfterModificationGreaterThan": 0 }`
  - can take up to 24 hours to run for the first time

```powershell
#Install the latest module
Install-Module -Name Az -Repository PSGallery 

#Create a new action object

$action = Add-AzStorageAccountManagementPolicyAction -BaseBlobAction Delete -daysAfterModificationGreaterThan 2555
$action = Add-AzStorageAccountManagementPolicyAction -InputObject $action -BaseBlobAction TierToArchive -daysAfterModificationGreaterThan 90
$action = Add-AzStorageAccountManagementPolicyAction -InputObject $action -BaseBlobAction TierToCool -daysAfterModificationGreaterThan 30
$action = Add-AzStorageAccountManagementPolicyAction -InputObject $action -SnapshotAction Delete -daysAfterCreationGreaterThan 90

# Create a new filter object
# PowerShell automatically sets BlobType as “blockblob” because it is the only available option currently
$filter = New-AzStorageAccountManagementPolicyFilter -PrefixMatch ab,cd 

#Create a new rule object
#PowerShell automatically sets Type as “Lifecycle” because it is the only available option currently
$rule1 = New-AzStorageAccountManagementPolicyRule -Name Test -Action $action -Filter $filter

#Set the policy 
$policy = Set-AzStorageAccountManagementPolicy -ResourceGroupName $rgname -StorageAccountName $accountName -Rule $rule1
```