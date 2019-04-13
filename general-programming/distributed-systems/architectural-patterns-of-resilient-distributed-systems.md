# Architectural Design Patterns of Resilient Distributed Systems
[ref](https://speakerdeck.com/randommood/full-stack-fest-architectural-patterns-of-resilient-distributed-systems)

- resilience is ability of a system to adapt or keep working when challenges occur
  - fault-tolerance, evolvability, scalability, failure isolation, complexity mgmt
- in literature, resilience is defined through
  - yield: fraction of successfully answered queries (> uptime, because uptime does not show UX)
  - harvest: data available / total data
- good things to do:
  - graceful harvest degradation under faults
  - replication of high-priority data for greater harvest control
  - degrading results based on client capability
  - decomposition into subsystems, so one does not break others
  - provide strong consistency only for the subsystems that need it
  - orthogonality (state vs functionality)
- in industry, resilience is defined as:
  - restricting user behaviour increased resilience
  - aggressive network timeouts and retries, semaphores
  - separate threads on per-dependency thread pools
  - circuit breaker pattern to relieve pressure
  - exceptions cause app to shed load until healthy
- resilient architectural patterns
  - redundancies are key
    - replication of data
    - replay of messages
    - resources
    - checks
    - execution paths
    - gossip / epidemic protocols
  - capacity planning matters
- resilience may come at cost of other desired goals (perf, simplicity, cost)
- distrust client behaviour, checksums, versions, error handling, circuit breakers, backpressure, leases, timeout