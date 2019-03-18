# Azure Training

2019-02-25 14:16:48

- can choose out of the five available consistency models
  - strong (all of the txn is committed before acknowledged)
  - bounded-stateless
    - read will be, at most, x times behind
  - session (chat window)
  - consistent prefix
    - reads will be in order
  - eventual
    - loosest and lowest level of RU consumed
- at the end of the day, everything is just a JSON collection
- can access via Table API, cassandra, SQL, MongoDB, Gremlin
- SLAs are guaranteed with money
- no schema or indexing required
  - automatic index management
  - synchronous auto-indexing
- will only be charged for production, dev and test are free
- resource model
- if you need too many RUs, MSFT will put you in your own cluster
- account -> database -> container (collection)
- Sproc, Trigger, UDF are written in Java
- 1RU = read 1k JSON document
- 5RU = write 1k JSON document
- there's a cosmosdb calculator
- containers -> logical resources to APIs as tables, collections or graphs
  - 1 leader, 3 follower that's transparent to user
- partitioning
  - leveraging automatically scale your data across the globe 
  - partition ranges can be dynamically sub-divided and we don't have control over it
  - partition key needs to be in the JSON doc, need to think about it
    - cannot change it later
    - one and only one
  - key
    - how often the data is coming in
    - how much data is coming in
    - maximize granularity and minimize cross-partition requests
    - cross-partition query scalability will cost you money
    - don't be afraid of having too many partition keys
    - single partition key is quota'ed to 10GB
    - need a try-catch a 403 status code if reached provisioned storage limit
    - must keep below 10 GB forever, otherwise 403 errors
    - REALLY REALLY IMPORTANT
- query fan-outs can add up
  - 1RU for each partition without relevant data
- querying
  - query tuning
    - provisioned throughput
    - partitioning and partition keys
    - SDK and query options
    - ensure headers/RSUs are logged (response.)
    - areas of concern: network, indexing, query complexity, query execution metrics
- pricing
  - cosmos can provide you ACID properties
  - data lake / azure databricks is R&D, cheaper for storage
- index policies
  - every property is indexed unless set to `excludedPaths`
- SQL syntax
- can do JSON projection, change JSON structure dynamically
- blob store up to 2GB total per db account or an external store
- each document must be < 2MB
- control currency using etags
  - entity tags
  - optimistic concurrency control
  - if the ETag value unexpectedly mutates, another concurrent process has updated the document
- stored procedures
  - pre-compiled 
  - atomic transactions
  - built-in optimizations
  - will utilize snapshot isolation to guarantee all reads within transaction
  - transaction roll-back
    - automatically wrapped
- user-defined functions
  - create built-in functions to make your life marginally easier
- replicating data
- change feed
  - retrieve all the operations and process them in sequence when needed
  - similar to azure event hub, as competing product
- modeling and planning 
  - containers do not enforce schema
  - can query across multiple entity types in a single network request
  - updates the entire document, not specific fields
    - denormalized documents can be expensive to update
- short-lifetime data, make data die over time

2019-02-27 09:05:03
- Managed Instance
- migrate to the cloud with Azure SQL Database 
- PaaS offering
- SQL Managed Instance
  - Compute Generation (meant for internal)
- cannot go from blob back to on-prem
  - only one way migration

## Labs
[ref](https://cosmosdb.github.io/labs/)
- partition key choice is important if you want to keep costs down
- Azure Data Factory can be used to transfer data from/to CosmosDB
- `SELECT VALUE s.studentAlias FROM students s WHERE s.enrollmentYear = 2017` returns a flattened array of results
- tuning
  - `MaxDegreeOfParallelism: 5`
  - `MaxBufferedItemCount: -1`