# System Design Primer
[ref](https://github.com/donnemartin/system-design-primer)

![general-high-level-design](https://camo.githubusercontent.com/14f76dab28dfbfa12ea6b02c6bd0ec726fc17306/687474703a2f2f692e696d6775722e636f6d2f6a7255424146372e706e67)

## How to approach system design interview question
- system design interview is an open-ended conversation that you are expected to drive
- outline use cases, constraints, assumptions
  - who is using it? how? how many? inputs? outputs? how much data? requests/s? read-to-write ratio?
- create high-level design  
  - sketch main components and connections
  - justify ideas
- design core components
  - key requirements and define schema, technology, API, OO
- scale the design
  - identify and address bottlenecks, given constraints
  - lb, horizontal scaling, caching, sharding
  - discuss potential solutions and trade-offs
- know how to do back-of-the-envelope calculations

@reread for questions and solutions

## Performance vs scalability
- scalable if service increases perf proportionally with resources added
- performance problem is when system is slow per user

## Latency vs throughput
- latency is time to perform some action / result
- throughput is no of actions / unit time
- aim for maximal throughput with acceptable latency

## Availability vs consistency
- CAP theorem
- strong, medium, weak consistency for data 
- Fail-over
  - active-passive
  - active-active

## Miscellaneous
- DNS
- CDN
- LB
  - SSL termination at LB which is very useful
  - session persistence
- Reverse proxies
  - compression
  - static content
  - caching
  - SSL termination
  - security
  - scalability, flexibility
- Data
  - Sharding
  - Functional split
  - Denormalization
  - Graph
  - Caching
    - Cache-aside (i.e., lazy loading; Memcached)
    - Write through
    - Write back
    - Refresh ahead
  - Asynchronism
    - message queues
    - task queues
  - Communication
    - HTTP
    - TCP
    - UDP
    - RPC
    - REST
  - Security