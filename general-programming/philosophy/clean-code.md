# Clean Code

- should be elegant, clear to read, cared for, tiny abstractions, tests, no duplication, expressiveness, one purpose
- boy scout rule
- use intention-revealing names and update whenever you need, pronounce-able meaning
- no magic numbers, hard to search
- never use variables "o" or "l" for readability
- Class names are nouns and should not have verbs
- predicates should be "is.." something
- accessors/mutators should be "get" or "set"
- don't use extra constructors, use static type factory methods
- consistent with naming, don't use puns (multiple meanings), shorter names are better, use technical terms or domain-specific terms ideally

## functions!
- keep small
- keep to same level of abstraction
- switch statements, by nature, violate a lot of best principles, so put them in a factory and make sure to use polymorphism to return variations
- no arguments > one argument
- try never to return output through arguments
- passing flag arguments indicates that function does more than one thing, which is bad
- multiple arguments make you think about the ordering of arguments and what they are (assertEquals as an example)
- when groups of parameters are passed, consider making a logical class grouping
- verb + keyword, i.e. writeField(name)
- side effects are evil
- Command Query Separation - only command or only query, don't do both
- extract try/catch blocks up into separate functions
- use exceptions, not error codes
- programs should be stories

## Comments
- Don't have 'em and explain yourself in code
- hard to maintain, some are okay but generally write your code clearer
- Used to justify, provide intent, or rationalize code
- No comment better than useless comment
- Readable code is better than all documented code
- Commenting out code - just delete it!
- JavaDocs only for external methods, never internal

## Formatting
- be consistent
- instance variables at the top
- should read like a newspaper, headline at top, detail at bottom
- Avoid one-liners even when collapsible
- indent properly

## Objects and Data Structures
- hiding implementation is about ABSTRACTION
- Don't randomly add getters and setters
- Procedural code (code using data structures) makes it easy to add new functions without changing the existing data structures. OO code, on the other hand, makes it easy to add new classes without changing existing functions.
- Law of Demeter: should only handle your friends and your own data, and not that of other methods or objects you should know nothing about. No "a.b.method()" and avoid chaining
- Objects expose behaviour and hide data

## Error Handling
- Don't obscure business logic with error handling, throw an exception instead
- Write Try-Catch-Finally first, to define contract and where error can be thrown
- Use unchecked exceptions cause you have to bubble up checked otherwise
- Write useful context into exception message for easy debugging
- Generally one type of checked exception per area is good, unless you want to catch one and let others go through
- Don't use null, return safe values
- Never pass null in to a method, 'cause you pass the problem around

## Boundaries
- Hide generics (Map, Lists, etc) in class to define boundaries so not evertone can manipulate the object
- Try not to pass generics from or to public methods
- Advocate learning tests, interface definition tests for third party libs - can help with migration
- Make wrapper for 3rd party library usage

## Unit Tests
- TDD - can't write production code unless failing unit test
- don't write more of a unit test than is sufficient to fail 
- treat tests like production code or your production code will suck
- unit tests allow for refactoring without fear
- tests need to be even more readable than your productino code
- Minimize asserts in tests
- one concept per test
- Fast, Independent, Repeatable, Self-Validating, Timely (test first, and right before)

## Classes
- small as possible, but small as in short list of responsibilities
- if it's hard to name a class, it probably has too many responsibilities
- Single Responsibility Principle 
- Many small classes > large classes
- If functions don't use all the instance variables, probably should have a smaller class 
- Clean code can end up with longer lines but results in clearer and better documented code
- Should be easy to include new bits of functionality without having to fix all the previous code, open-closed principle
- Dependency Inversion Principle

## Systems
- Separate construction from usage of system
- Can design later, as long as we create nicely decoupled architecture. Can add pieces together at a later point in time
- "Of course, this does not mean that we go into a project “rudderless.” We have some expectations of the general scope, goals, and schedule for the project, as well as the general structure of the resulting system. However, we must maintain the ability to change course in response to evolving circumstances."
- "Whether you are designing systems or individual modules, never forget to use the simplest thing that can possibly work."

## Emergence
- four rules of Kent, 1. Runs all tests, 2. no duplication, 3. expresses intent of programmer, 4. minimizes # of classes and methods
- But the most important way to be expressive is to try. All too often we get our code working and then move on to the next problem without giving sufficient thought to making that code easy for the next person to read. Remember, the most likely next person to read the code will be you.

## Concurrency
- decouples what gets done from when it gets done
- concurrency has an impact on design
- keep your concurrency-related code separate from other code - it's complex enough without extra burden
- severely limit access to data to avoid synch issues
- create dupes of objects instead of sharing - generally better than synchronized keyword 
- spend time on graceful shutdown as concurrency can cause issues there
- do not ignore one-off problems in concurrency
- run with more threads than processors, to find areas of weakness
- run on all target platforms, different threading models have different problems
- learn your libraries and know your algorithms

## Successive Refinement
- different types, similar methods = class!
- it's not enough for code to work, often times, very broken 
- exercise in separating out separate files with different responsibilities

## Another exercise
- if base class know about their derivatives, should probably make an abstract factory

## Smells and Heuristics
- good list to have for code smells
- C5, F1, G2, G3, G4
- multiple switch/case or if/else blocks that re-appear should use polymorphism
- G8, hide data, hide methods, hide utilities, limit scope of interface
- G26, be precise
- G28, extract conditionals because it's hard enough to understand intent of if statements
- N5, use long names for long scopes, keep things clear
- N7, names should describe side effects, don't gloss over them!

Appendix A: Concurrency:
- thread management is tricky and should be kept to certain isolated areas
- atomic means that the operation cannot be interrupted. 32-bit assignments are okay, but 64+ requires two 32-bit assignments, meaning a thread could sneak in there
- Use atomic variables instead of synchronized as locks are expensive
- Use server-based locking over client-based
- Understand why deadlocks happen, debug statements will alter situation and may not help: 
- mutual exclusion - multiple threads need same resource but cannot be used by multiple and are limited (ie. database connection, semaphores, file open for writing)
- lock and wait: wait until all resources acquired before releasing them [fixed with not waiting at all, check each resource, if any locked, release all]
- no preemption: no releasing of thread until other thread is finished using it [fixed with requesting for resources from others - if owner is also waiting, release everything]
- circular wait: two resources, two threads, deadly embrace [fixed by following convention of the order of resource attainment]
- all four conditions above must occur for deadlock