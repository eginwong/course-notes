# Microservices Masterclass

## Intro to Microservices
* Domain-driven design

## Designing Microservices
* Business Domain
  * break into subdomains
  * use business capability mapping to determine bounded contexts
  * use DDD for complex models
  * use ubiquitous language to make sure everyone is on the same page
* Event StormingHow to transform?
* How to transform from old to new?
  * Iterate and change over time
  * decomposition > strangler pattern > asset capture
* Digital Decoupling
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
* Bubble Contexts, protecting old system from forcing design of new system or anti-corruption layer
* Conway's Law
* Mythical Man Month