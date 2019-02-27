# Technical overview of Azure Cosmos DB
[ref](https://www.youtube.com/watch?v=V_C7DlKVofc)

- partitioning, replication, resource governance
- account > database > container > [items, stored procs, triggers, UDF, conflicts]
- request units is a rate-based currency
  - abstracts the cost of all resources for simpler and easier capacity planning
  - can use rate limiting to control the costs
- will create partitions using hashing to distribute load
  - aim to distribute data partitions as well as request throughput
  - determine if read-heavy or write-heavy
  - don't be afraid of having too many partition keys
- leverage elastic scale-out using Azure Cosmos DB BulkExecutor Library
  - 10x write capability
- replication
  - using turnkey global replication
- well-defined consistency models
  - strong
  - bounded-staleness
  - session
  - consistent prefix
  - eventual
- can create inverted index for write-heavy
- re-wrote java async library for SQL API
  - 2x client-side perf improvement
- won't be using backup and restore, it will be built-in with point-in-time snapshot
- data is secured by default at rest and in transit