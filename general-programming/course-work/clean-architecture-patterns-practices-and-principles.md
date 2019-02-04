# Clean Architecture: Patterns, Practices, and Principles
[ref](https://www.pluralsight.com/courses/clean-architecture-patterns-practices-principles)

## Introduction
- Create architecture for users and developers who use it

## Domain-centric Architecture
- domain model > application layer (use cases) -> integration layer (persistence) > presentation layer

## Commands and Queries
- Command does something, modify state, should not return value
- Query retrieves something, does not modify state
- CQRS
    * Single-database
    * Two-database, use eventual consistency, read db maybe 1NF and improves perf
    * Event Sourcing, store events, replay events, event store + read database

## Functional Organization
- spatial locality, easy to navigate, avoid vendor lock-in
- lose automatic scaffolding, framework conventions

## Microservices
- Bounded Context can subdivide with clear interfaces 
- flatter cost curve, cohesion/coupling, independent

## Testable Architecture
- usual agile pyramid