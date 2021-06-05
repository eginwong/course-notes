# Domain-Driven Design: Tackling Complexity in the Heart of Software
[book] Eric Evans

- premises
  - most software projects, the primary focus should be on the domain and domain logic
  - complex domain designs should be based on a model
- requisites
  - iterative development
  - developers and domain experts are tightly knit

## Part I: Putting the Domain Model to Work
### Chapter One. Crunching Knowledge Ingredients of Effective Modeling Knowledge Crunching
- a model is a simplification
  - a domain model is a rigorously organized and selective abstraction of that knowledge
  - creating a lucid model that cuts through that complexity is eciting
- ingredients of effective modeling
  - binding model and implementation
  - cultivating ubiquitous language based on the model
  - developing a knowledge-rich model
    - objects had behavior and enforced rules
  - distilling the model
    - dropping irrelevant and keep the essential
  - brainstorming and experimenting
- can build work without model but without it, lot of rework and one-way data flow
- avoid hiding rules in code or domain that is not obvious

### Chapter Two. Communication and the Use of Language
- translation blunts communication and makes knowledge crunching difficult
- force consistent language in code, diagrams, writing, and especially speech
- change in ubiquitous language is change to the model
  - experimenting with language helps us cut the chaff from the mental model
  - describe common scenarios out loud, combining concepts allowed by the model and see how those ideas net back to diagrams and code
- if SMEs don't understand the model, you have a problem
- draw diagrams to unify understanding
  - the model is not the diagram
- XP says that documents should complement code and speech
  - if not part of active behavior, the information will rot

### Chapter Three. Binding Model and Implementation Model-Driven Design
- domain model and coding model should map directly, otherwise rot
- if devs working with the model feel too much resistance applying the model, they will not use it
- anyone who touches the code should touch the model and vice versa

## Part II: The Building Blocks of a Model-Driven Design

### Chapter Four. Isolating the Domain
- isolate domain model logic from other layers

### Chapter Five. A Model Expressed in Software Associations
- constrain relationships/associations as much as possible to reduce complexity
  - adding further qualifications and constraints communicate more knowledge
- Entities (reference objects)
  - mistaken identity can lead to data corruption
  - model must define what it means to be the same thing (for the same identity)
  - identity must be unique in the system, especially if all other attributes are the same
    - cannot rely on technical impl. of identity as serialize/deserialize will modify instance identity
- value objects
  - objects that describe things with no conceptual identity
  - only care about what they are, not which or whose they are
  - can compose of entities
  - often passed as parameters in messages between objects
  - properties, usually, and transient
  - treat as immutable
  - if value implementation is mutable, it cannot be shared
- services
  - some concepts aren't natural to model as objects
    - forcing them into entity or value distorts the model
  - named for an activity, verb rather than noun
  - characteristics
    - stateless operation
    - relates to a domain concept not part of an entity or value
    - interface is defined in terms of other elements of the domain model
  - distinguish between domain services and application services
  - ????? How are these used in practice that are different from app services?
- modules (packages)
  - modules are the chapters of the story of the models
  - warning: splitting into entities, da, bo, interface causes pain when refactoring modules and adds clutter to mental model
- modelling paradigms
  - don't look at other paradigms and hybrid ones until the current dominant paradigm has been exhausted

### Chapter Six. The Life Cycle of a Domain Object
- Aggregates
  - cluster of associated objects that we treat as a unit for data changes
  - has a root and a boundary
    - root: single entity contained in the aggregate
    - outside models an refer to the root but no other within the aggregate
    - inside the aggregate, references can be to the non-root
  - invariants are consistency rules that must be maintained whenever data changes
    - within the aggregate, the rules are up to date within the transaction
    - outside the aggregate, it will be eventually consistent
  - root entity is ultimately responsible for checking variants
  - root entities have a global identity, entities within the boundary have a local entity
    - local entities are unique only within the aggregrate
  - only aggregate root can be obtained directly with db queries, others via traversal of associations
  - delete operation must remove everything within the aggregate boundary at once
  - cluster entities + value objects into aggregates, define boundaries, choose root entity
- Factories
  - each creation method is atomic and enforces all invariants of the created object
  - be simple and use a constructor if that fits the requirement
    - they should be dead simple; avoid nesting constructors
  - use the abstract for the factory to reduce coupling
  - invariant checking logic can be in the factory OR in the entity/value object
    - if value object (immutable), invariant checking should be in factory
  - reconstituting objects via factories have slightly different requirements
    - how to handle invariant violations
    - don't update the tracking ID
  - responsible for creation/reconstitution
- Repositories
  - repository is an illusion of global access, to retrieve all objects of that type
  - provide repositories only for aggregate roots that actually need direct access
    - all storage and access of the object should go to the repositories
  - decouples model/persistence layers
  - allows same interface whether persistence is relational, non-relational, etc.
  - leave transaction management to the caller; the repository only performs the operations
  - a repository could delegate to a factory to reconstitute the object, as repository manages lifecycle of object, not its creation

### Chapter Seven. Using the Language: An Extended Example
- Distinguishing ENTITIES and VALUE Objects
  - if specific identity is required, ENTITY
  - if can be shared without reference to identity, value object
- Designing Associations in the Shipping Domain
  - try to avoid bi-directionality and create references in one direction for simplicity
  - this bi-directional pointer may remain if the lookup is frequent; otherwise break the link and handle it via repository lookup
    - synchronization between the two entities can be painful
- AGGREGATE Boundaries
  - only have meaning when tied to the root
  - if they have meaning outside of the root (referenced directly), it should be its own aggregate
- Selecting REPOSITORIES
  - look at the requirements of the application
  - repositories are only allowed for aggregate roots
- constantly review design decisions to see if it can support app requirements
  - using these models allows easier/simple refactoring without significant rework

## Part III: Refactoring Toward Deeper Insight 
### Chapter Eight. Breakthrough
- subtle areas where domain doesn't line up with reality or causes extra complexity or bugs is a modelling problem
- refactoring allows us to build insight into the model

### Chapter Nine. Making Implicit Concepts Explicit Digging Out Concepts
- listen to language
  - do the domain experts correct you on word choice
  - are there terms that more succinctly state something complicated
  - are they looking for specific terms or phrases for the model?
  - IF SO: you may need a new concept in the model
- scrutinize awkwardness as that is likely a missing aspect of the model
  - apparent contradictions could be misunderstandings or a deeper model
- How to Model Less Obvious Kinds of Concepts
  - use explicit constraints
  - different variations of processes could be the strategy pattern
  - Specification design pattern is a value object that applies predicate on another object
    - good for storing business rules
    - kept in the domain layer
    - any form of filtering

### Chapter Ten. Supple Design Intention-Revealing Interfaces Side -Effect-Free Functions Assertions
- must make it easy for devs to understand and enhance the model instead of being afraid of it and adding duplication
  - if a dev must consdier the implementation of a companent to use it, encapsulation is lost
  - intention-revealing interfaces
    - write a test for behavior before creating it
    - names should be ubiquitous language and describe effect and purpose with referring to internals
  - side-effect free functions
    - reduce complexity
    - group with immutable value objects to allow for safe combination of operations
  - assertions
    - side effects defeat abstraction, polymorphism, and encapsulation
    - assert on state, not procedure/process
    - state post-conditions of oeprations and invariants of classes and aggregates
      - if they cannot be coded directly, write automated unit tests for them
      - write them into documentation or diagrams
  - conceptual contours
    - decompose elements using intuition but ultimately to what aligns with the domain in reality
      - don't overclump or overdecompose
  - declarative DSL
    - sometimes good, sometimes circumvented
    - can extend existing classes with `and`, `or`, and `not` operators

### Chapter Eleven. Applying Analysis Patterns

### Chapter Twelve. Relating Design Patterns to the Model
- can apply design patterns to domain patterns with certain twists in implementation
- Strategy (a.k.a., policy)
  - if conditional code throughout, consider using a strategy
- Composite
  - useful when all leaves and subnodes (structurally) are in effect the same type with different implementations/meaning

### Chapter Thirteen. Refactoring Toward Deeper Insight Initiation
- exploration teams keys:
  - no need for long-term org structures for refactoring
  - scope and sleep
    - don't let it drag or else your scope may be too big
  - ubiquitous language
- should bake refactoring in and not force devs to provide a reason for doing it
  - this is an added obstacle to refactoring as necessary; clunky design makes for worse code
  - good reasons for refactoring:
    - design does not express the team's current understanding of the domain
    - important concepts are implicit and you see a way to make them explicit
    - there is an opportunity to make the design suppler
    - not before a release and motivated by helpful intentions

## Part IV: Strategic Design

### Chapter Fourteen. Maintaining Model Integrity
- unification
  - internally consistent understanding of a model, no contradictory rules
  - having multiple models for the same thing is OKAY for enterprise system as long as the contexts are clearly bounded
- Bounded Context
  - all models exist relative to a context
    - explicitly define this context
    - keep the model STRICTLY consistent within these bounds (db, code base, usage)
  - bounded contexts are not modules
- sign that bounded context has problems
  - mismatch appears in behaviour or language
- fixes
  - CI within bounded contex
  - automated tests
  - hammer out ubiquitous language
  - map out translations between bounded contexts (NAME EACH ONE)
    - get this shared translator class between the two teams to maintain as a sort of contract
- Shared Kernel
  - core domain shared between teams
  - all teams should have their test suite and merge frequently to verify nothing is broken
- customer supplier relationship (e.g., platform teams)
  - define iterative planning between teams
  - jointly develop automation acceptance tests that will validate the requisite interface
- anti-corruption layer
  - an isolating layer to provide clients with functionality of their own domain model
  - internally translates between the two models
  - meant for maintaining external interfaces
  - facades and adapters, translators
- cost
  - create bounded contexts and cut two scopes apart if necessary as it reduces complexity and integration costs
    - minimum data transfer through translation layers
    - no sharing of logic
- scalability
  - if there are many subsystems to integrate with, define an API for other teams to use instead of translators for each one
- TODAY
  - start defining existing bounded contexts
  - enforce ubiquitous language
  - refactor stray translation code into anti corruption layers
  - improve CI

### Chapter Fifteen. Distillation Core Domain
- focus
  - boil the model down and focus on the code domain
  - genericize any common functionality that is not crucial to the CORE and don't focus on them anymore than is required
- Domain Vision Statement
  - write a 1-pager of the CORE DOMAIN and value prop that it will bring
    - argue how it is distinguished from others
    - keep it narrow
    - write early and revise often
  - not about implementation or language or infra but about the model
- Distillation document
  - 3-7 pager explaining and highlighting what the model and workflow is, primary interactions
  - not a complete design document
  - meant for non-technical members
  - everyone needs to know
- flag the core in the code and make it effortless for a dev to see the CORE DOMAIN
- Cohesive Mechanisms
  - lean on technical concepts that are well-known to reduce the need to add further complexity and bloat
    - e.g., this is like a graph instead of full blown graph implementation via text
  - generally keep the mechanisms out of the CORE unless they are integral to the differentiating aspect
- Segregate the CORE from other mechanisms and subdomains if they blur the line of the model
  - do so when the bounded context is large and the CORE is obscured
- Can create an Abstract Core if the wiring and finer details are not extremely relevant to the overall process of the model
- focus on refactoring the CORE domain as that has highest ROI

### Chapter Sixteen. Large-Scale Structure 
- large scale structure allows one to understand the system in broad strokes
  - architecture can't oppose too hard of a constraint as to limit freedom
  - but too much freedom causes chaos
- Pluggable Component Framework
  - quite challenging to implement and should be after full maximized designs have been implemented a few times

### Chapter Seventeen. Bringing the Strategy Together
- start by drawing a context map
- is there a ubiquitous language
- is core domain identified
- is there a domain vision statement
- do devs have necessary tech skills
- are the devs knowledgeable about the domain/interested?
- suggestions
  - decisions must reach entire team
  - decision process must absorb feedback
  - arch cannot siphon off all the best and brightest
  - plan must allow for evolution
  - strategic design requires minimalism and humility
  - don't write frameworks for dummies
  - don't dictate and create a master plan but give people principles to follow instead
