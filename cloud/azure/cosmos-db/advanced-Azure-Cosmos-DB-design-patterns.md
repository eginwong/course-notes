# Advanced Azure Cosmos DB: Design Patterns Tips and Tricks
[ref](https://www.youtube.com/watch?v=TzPVsZHVzfA)

- Core SQL API 101
- cross-partition query will hurt perf across lots of partitions
- partition key choice and how much throughput to provision
- customize your indexing policy based on your query workload, drastically reduce write cost
- partition skews are bad
- keep documents smaller or remove attributes to avoid extra overhead of indexing
- no concept of latches