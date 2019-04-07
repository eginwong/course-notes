# Working Effectively with Legacy Code

## The Mechanics of Change
- reasons to change software
  - adding a feature, fixing a bug, improving design, optimizing resource usage
- qualities of good unit tests
  - fast, localize problems
- legacy code change algorithm
  - identify change points
  - find test points
  - break dependencies
  - write tests
  - make changes and refactor
- break dependencies because of
  - sensing (can we get a sense of the effects of our calls to methods on this class)
  - separation (can we run this piece separately)
- fake objects support real tests, via interfaces and dependency injection
- seam: a place where you can alter behaviour in your program without editing in that place
  - every seam has an enabling point, where you can decide which behaviour to use
  - there are link seams (using another declared version, not as easy where linking is hidden away by compiler)
  - object seams are swapping of objects
- integration tests would use FIT or Fitnesse

## Changing Software
- Sprout Method:
  - identify where you need to make the code change
  - if change can be formulated as a single sequence, write down a call for the work and comment it out
  - determine what ins and arguments you need
  - determine if outs are required and what the out is
  - develop sprout method with TDD
  - remove comment in source method to enable the call
  - disadvantage is giving up cleanliness to legacy but advantage is separation
- may even use the Sprout Class for times when creational dependencies muck things up
- Wrap Method: add new behaviour by renaming the method and inserting another private method call inside to keep the seams identified
  - identify method you need to change
  - develop new method
  - create another method that calls the new method + old method
  - disadvantage is leading to poor naming at times
- Wrap Class is a similar idea; decorator pattern
- Dependency Inversion: depend on interfaces as those don't change as frequently
- avoid overriding concrete methods too often, as that can add mental complexity
- can pass `null` or create `null` objects if the actual object is not required *IN THE TEST ONLY*
- hidden dependencies: parameterize the object that's being created with `new`

## Misc Tips
- if you struggle to understand the code, tell a story with it
- try to describe the responsibility of the class in a single sentence (SRP)

## Dependency-Breaking Techniques
- exhaustive list here