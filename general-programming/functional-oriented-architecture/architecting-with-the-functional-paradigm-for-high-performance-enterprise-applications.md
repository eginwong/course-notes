# Architecting with the Functional Paradigm for High Performance Enterprise Applications

* For enterprise applications
* Backend RESTful services, stateless, meant to be consumed by front-ends
* good for highly complex business rules
* peak volume 300000 requests/s

## Technical Requirements
* scalable, high-performance system, efficient use of infra resources
* provide predictable response times
* resilient to failures and provide helpful responses in case of errors
* provide backpressure / circuit-breaker pattern
* must have fast responsiveness to business change
* cloud readiness
* high dev productivity, maintainability, testability 

## Architecture Outline
* functional paradigm throughout
* functional programming applied at architecture and design level
* all services are modules, implemented as flows
  * flows are functions that compose other functions
  * each REST endpoint is a flow
  * business functions are independent of architecture functions
  * high-level flows will provide timeouts, retries, bulkheading, and other encompassing work
* need a strong devops pipeline to support this stack
  * e2e automation from SCM to operations monitoring
  * enforcement of built-in quality and security from get-go with automated testing, static code scans

## Challenges
* pragmatic architecture patterns that address both business and technical requirements
* stack complexity
* more ways to fail than with Standard Java
* hard to find a good team

## Function Flow Pattern
* not a new idea
* decompose services into flows
* flow module is composite of functions that can be executed sequentially or parallel
* clean separation of business functions from architecture plumbing
* separation of pure bfs from dafs and external system calls (impure)
* factor out async and non-blocking aspects
* proactively manage dependencies to reduce coupling
  * DI and configuration helped to address this
* effective in other languages like Java/Scala, but some others are more suited to it
* ![TODO]() include image here of function flow diagram
* flow composition of pure functions, dafs, external interface call functions
* OO vs functional nesting of calls
* flow charts closely align to business functionality to tech functionality
* enables a simpler code structure, testable, lots of goodies for isolation, greater cohesion

## Developer Buy-in
* can enable Java and Kotlin to better align with the ability of the developers/team
* require coding standards

## Non-blocking code
* have to get mind wrapped around it
* enable strong logging framework for non-blocking operations
* correlate context through propagation in logging
* performance monitoring is challenging as well

## Architectural help libraries
* Error handling
* Database Access
* Access Control
* External System access and integration patterns
* Type-safe Configuration
  * externalized but read in
  * application does not deal directly with config files but reads the object created from it
  * would then be type safe, done in boot modules
* Logging
* Type-safe dependency injection
  * use boot module for wiring, create function object and place in constructor of downstream functions
  * type-safe, detected at compile-time not run-time
* Fire and Forget
  * request created -> send to queue -> process work -> read from completed cache
  * provider and consumers
  
## Module Stereotypes
* different types of module that the system is made of
* each module stereotype has well-defined purpose and constraints

## Building a proficient team
* challenges, etc.

## Notes
* We can talk about our usage of gRPC for IPC




