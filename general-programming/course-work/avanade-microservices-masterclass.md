# Microservices Masterclass

## Intro to Microservices
- Domain-driven design

## Designing Microservices
- Business Domain
  * break into subdomains
  * use business capability mapping to determine bounded contexts
  * use DDD for complex models
  * use ubiquitous language to make sure everyone is on the same page
- Event StormingHow to transform?
- How to transform from old to new?
  * Iterate and change over time
  * decomposition > strangler pattern > asset capture
- Digital Decoupling
  1. Define Subdomains
  2. Define concepts and language (ubiquity)
  3. Define contracts
  4. Event Streams
  5. Understand Communication between events (TTL, state, metadata, SLA), RPC (Service discovery, SLA, load balancing, failure)
  6. Design a New Template Architecture (ref architecture, plan for cross-cutting concerns)
  7. Isolate and Migrate Business Logic
  8. Get to an e2e example
  9. Create a factory
  10. Roadmap and Prioritize
  11. Scale the Delivery (product-focused)
- Bubble Contexts, protecting old system from forcing design of new system or anti-corruption layer
- Conway's Law
- Mythical Man Month

## Building Transactional Systems
- Synchronous Communication
  * HTTP-based REST Endpoints
    * follow its principles, layered system, uniform interface, stateless
- Actions / Commands over REST
- Chained Composition Pattern
  * one service calls another, which calls another, which can lead to an increase in latencies, errors, retries, etc.
- Aggregator Pattern
  * orchestrate calls to various services
  * API Gateway
- Scaling Synchronous Services
  * Service Registry, or service side load balancer
  * Broker Pattern
- Asynchronous Communication
  * Fire and Forget
  * Direct Async Communication
    * Polling or use Webhooks
    * use correlation-id
  * Brokered Communication
    * use of a message broker which distributes message and only focuses on the message
    * messages, queues, topics and polling
    * queues with single consumer, or competing consumers, or fanout
    * topics/subscriptions, a key of some sort, with durable and non-durable subscriptions
- Transactions
  * Data Consistency is most important
  * need to apply ACID
  * Transactions are hard in distributed systems
  * Strict Consistency: enforces similar to single server, leader / follower process
  * Two Phase Commit: Distribute the work, prepare work, voting phase
  * multi-step commit phases

Homework:
- [https://martinfowler.com/articles/201701-event-driven.html](https://martinfowler.com/articles/201701-event-driven.html)
- [https://www.youtube.com/watch?v=STKCRSIsyP0](https://www.youtube.com/watch?v=STKCRSIsyP0) 