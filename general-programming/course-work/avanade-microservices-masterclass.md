# Microservices Masterclass

## Intro to Microservices
- Domain-driven design

## Designing Microservices
- Business Domain
  - break into subdomains
  - use business capability mapping to determine bounded contexts
  - use DDD for complex models
  - use ubiquitous language to make sure everyone is on the same page
- Event StormingHow to transform?
- How to transform from old to new?
  - Iterate and change over time
  - decomposition > strangler pattern > asset capture
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
  - HTTP-based REST Endpoints
    - follow its principles, layered system, uniform interface, stateless
- Actions / Commands over REST
- Chained Composition Pattern
  - one service calls another, which calls another, which can lead to an increase in latencies, errors, retries, etc.
- Aggregator Pattern
  - orchestrate calls to various services
  - API Gateway
- Scaling Synchronous Services
  - Service Registry, or service side load balancer
  - Broker Pattern
- Asynchronous Communication
  - Fire and Forget
  - Direct Async Communication
    - Polling or use Webhooks
    - use correlation-id
  - Brokered Communication
    - use of a message broker which distributes message and only focuses on the message
    - messages, queues, topics and polling
    - queues with single consumer, or competing consumers, or fanout
    - topics/subscriptions, a key of some sort, with durable and non-durable subscriptions
- Transactions
  - Data Consistency is most important
  - need to apply ACID
  - Transactions are hard in distributed systems
  - Strict Consistency: enforces similar to single server, leader / follower process
  - Two Phase Commit: Distribute the work, prepare work, voting phase
  - multi-step commit phases

Homework:
- [https://martinfowler.com/articles/201701-event-driven.html](https://martinfowler.com/articles/201701-event-driven.html)
- [https://www.youtube.com/watch?v=STKCRSIsyP0](https://www.youtube.com/watch?v=STKCRSIsyP0) 

## Building Event Driven Sagas
- API-first
- modelling events, past tense and immutable
- how big is an event
  - let people know something happened
  - or big enough to react to
- Event collaboration can be a service that constantly spits out data, like a pub to create an event hub
- Event sourcing, store events as history as application state
- Dislike of message queues
  - TTL, should not stop being relevant ever
  - Dead Letter Queues,
  - Content Based Routing, not all brokers support this feature, depends on the devops
- Sagas
  - txns in the real-world are not atomic
  - will log at every step and handles failure with compensation streams
  - compensating txns are guaranteed to succeed
    - must confirm on the API-side
  - Message Brokers
- Monitoring 
- Homework: 
  - https://en.wikipedia.org/wiki/Enterprise_Integration_Patterns
  - https://app.pluralsight.com/library/courses/microservices-architectural-design-patterns-playbook/table-of-contents
  - https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture

## Azure Messaging Options
- message brokers vs distributed logs
  - message broker: queues/topics
  - distributed log: records a stream of messages on a topic (and partition) to disk
- topics & subscriptions
  - reliability: consumer has to ACK before message is removed from message broker
- message semantics are hard because problems with duplication
  - at least once delivery
  - at most once delivery
  - exactly once, message broker can't do that for you; at least once + idempotency
  - message ordering design patterns like message sequence & resequencer
- competing consumers on queues
  - one consume could process messages faster than others
- partitions on distributed logs
- cardinality
  - used to mean as a message sender, how many receivers do I expect
  - sender-receivers notation
  - 1-1, 1-*, 1-any, *-1
- message size
- messaging options on Azure
  - Azure Storage Queues
    - part of Azure Storage
    - supports 2k messages/s, 500TB
    - supports at least once delivery
    - processing messages, pass an InvisibilityWindow which is amount of time messages will be hidden on the queue and unavailable to other clients
      - can be processed out of order, but this supports at least once
    - usage
      - simple queue
      - audit trail of all messages 
      - expect queue to exceed 80GB in size
  - Azure Service Bus
    - AMQP, async message queueing protocol
    - supports larger message size (256kb vs 64kb)
    - supports at least once and at most once
    - guarantees FIFO, through message sessions
    - can support transactions
    - supports RBAC
    - processing messages, can send and delete, or PeekLock, has invisibility/locked again based on subscriber
    - max delivery count, put repeated failed messages to the dead letter queue
      - ASB is a sub-queue to hold messages that can't be delivered/processed
    - prefetching messages, can pull a group of messages at once but can cause more lock timeouts, problems with ordering
    - relay performs two-synchronous operations between two sources
  - Azure Event Grid
    - pub/sub between topics and subscriptions
    - supports Azure services already
    - over HTTP
    - use for HTTP connectivity
    - advanced filtering
    - pay per event
  - Azure Event Hub
    - distributed log platform
    - 2-32 partitions on a topic
    - millions events/s
    - pub/sub
    - real-time/batch processing
    - capture
      - can send all events immediately to Azure Data Lake or Blob Storage for permanent persistence, stored in Avro format
    - choose when authenticating a large number of publishers
      - saving stream of events
      - aggregation or analytics on your event stream
      - reliable messaging or resiliency
  - Kafka on HDInsight
    - current position, last committed offset, log end offset, high watermark (last safe message to read)