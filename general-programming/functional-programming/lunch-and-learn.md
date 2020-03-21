# Lunch and Learn on Functional Oriented Architecture

## What does that even mean?

## Where do we commonly see Functional Programming? Is this related to Functional Programming?
* Yes, it is. This is the over-arching structure required to support a more functional-in-nature design than that of most impure languages.
* Inspired by Haskell
* Better able to harness the key concepts of FP
  * function composition
  * purity
  * functions-as-first-citizens
  * immutability
  * closures, currying, higher-order functions

## FOA, case study with client

Major source of inspiration, talk on functional paradigm for architecture
[youtube](https://www.youtube.com/watch?v=-Q4iuERY28Q)

1. ~~[Mark Seeman - The pits of success](https://www.youtube.com/watch?v=US8QG9I1XW0)~~ 
2. ~~[kotlin conf](https://www.youtube.com/watch?v=qI1ctQ0293o)~~
3. ~~[function flow](https://www.sebokwiki.org/wiki/Logical_Architecture_Model_Development)~~ <- overly complex, make use of image here:
![breakdown](https://www.sebokwiki.org/w/images/sebokwiki-farm!w/d/df/Decomposition_of_Functions_AF_071112%282%29.png)
4. ~~[function flow wiki](https://en.wikipedia.org/wiki/Flow-based_programming)~~
5. [functional programming architecture](https://www.youtube.com/watch?v=lhI6W65Rrfg) <- good watch, but not 100% relevant
6. ~~[stack overflow discussion](https://stackoverflow.com/questions/89212/functional-programming-architecture)~~
7. [research paper](https://ifs.host.cs.st-andrews.ac.uk/Resources/Notes/Design/FunctionDesign.pdf) <- good but might be too theoretical for introductory session

## Compare with SOA and OOA and FOA
[SOA](https://en.wikipedia.org/wiki/Service-oriented_architecture)

[Multi-tier architecture](https://en.wikipedia.org/wiki/Multitier_architecture)

[OOA](https://www.tutorialride.com/software-architecture-and-design/object-oriented-architecture.htm)

microservices, service oriented, monolithic, layered, event-driven, component-based, peer-to-peer (networking), data-centric, client-server

## Flow
1. discuss various types of architecture, progression through age and use case (2 min)
2. discuss what functional oriented architecture is (20 min)
   1. compare with functional programming 
   2. function-flow pattern?
   3. this section will be long
3. Show crazy diagram, Module Stereotypes (10 min)
4. CASE STUDY: (5 min)
   Talk about the tools required to support some enterprise architecture like this
   1. ansible playbooks
   2. azure
   3. kafka topics
   4. event-hub from azure
   5. terraform
   6. vault
5. Talk about process and how this came about; how do we develop? (5 min)
