# Modern Software Architecture: Domain Models, CQRS, Event Sourcing

## DDD at a glance
- about business logic, focused on data and behaviour
- knowledge about the domain -> recognize subdomains -> design a rich domain model -> code
- has higher start-up costs vs regular design methodologies
- more about analysis
- **Design Driven by the Domain**

## Discovering the Domain Architecture Through DDD
- use ubiquitous language
  * follow common lingo
  * comes from brainstorming, interviews, natural language, fluent and unambiguous
  * user stories, meetings, emails, technical documentation, schedule, and source code should follow language
  * continuously updated
  * made available to everyone
  * no synonyms, no synonyms
  * avoid acronyms
  * keep language in sync with the code
- Bounded Context
  * subdomain with its own language. with external interface, independent implementation
  * overlaps can cause damage to integrity of model
- Event storming, keep <=8 people
  * jot notes down 
  * identify relevant domain event, find what causes the event (user, async, another), look at timeline
  * should have a facilitator to lead and guide 

## The DDD Layered Architecture
- Transition Script Pattern
  * business transaciton, logical end-to-end using common subtasks
- Table Module Pattern
  * module per table in the database
  * module contains all methods that will process the data; may limit significant tables
- Domain Model Pattern
  * Aggregated objects

## The "Domain Model" Supporting Architecture
- domain model (entities, factories, etc.) + domain services (cross-aggregate behaviour, repositories, external services)
- just an object model, database-agnostic, 
- domain model module contains: value objects, entities, aggregates
  * entities need an entity, uniqueness, made of data and behaviour but should not have persistence logic
  * aggregates are a cluster of entities constantly used and referenced together, preserve transactional integrity
- persistence vs. domain model
  * persistence should be storage, doesn't include business logic
- Events are a useful concept for resiliency, but not necessary
- Anemic model is an anti-pattern, taking behaviour away from domain objects
  * if you take all logic and place it in services instead of domain object

## The CQRS Supporting Architecture
- defining a single class for command and query are difficult
- command - alter state and doesn't return data
- query - returns data and doesn't alter state
- distinct optimization, scalability potential
  * simplified design
- Command Stack
  * use pattern fits better
- CQRS Premium
  * having two databases for read and one for write
  * how to keep them in sync? synchronous, async, scheduled, on-demand
- Workflow-based architecture
  * based on events, CQRS
- CQRS Deluxe
  * Saga is long-running task
  * Handlers are one-off tasks, immediate ending
  * uses event bus
  * Saga should be defined by ID, persistent and stateful/stateless
  * New feature is simply registering a new saga and handler

## Event Sourcing
- might want time-based state, so events could be applicable
- Event sourcing means all events in app will be stored as a sequence of events
- append-only, no delete
- persistent store for events
- events are not imperative and are past tense verbs
- is it important for what and when of domain item?
  * probably want events 
- for persistence, could store event and snapshot of domain to optimize for querying 
- Event-based Data Stores
  * Event Store

## Designing Software Driven By Domain
- CRUD using regular design can get complicated quickly
  * CUD are commands, R is query
- Be user-driven, UX-driven
- Pillars of modern software
  * DDD analysis, layers, top-down design, CQRS + Events