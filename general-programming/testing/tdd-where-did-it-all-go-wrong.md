# TDD, where did it all go wrong?
[ref](https://www.youtube.com/watch?v=EZ05e7EMOLM)
Ian Cooper
DevTernity

- majority of tests that broke were the ones with mocks
- it's hard to return to our tests because context is lost
- ATDD
  - devs hated ATDD because they were usually red
  - customers rarely cared about ATDD suites
  - ATDD were slow to run and increased cost of check-in dance
  - devs start to ignore red results
- if your team doesn't see the value/return on effort, maybe tests are not useful
- TDD origins actually solve a lot of the problems that we think is actually TDD
  - avoid testing implementation details, test behaviors
  - trigger for TDD is implementing a requirement
  - test public API
  - use a given when then model
  - SUT is not a class
  - SUT is the exports from a module, its facade
  - do not write tests for implementation details
  - can create throwaway tests
  - behavior is the requirement
- red-green-refactor
  - red: write little test that doesn't work, or doesn't even compile
  - green: make test work quickly, committing whatever sins necessary
  - refactor: eliminate and clean up code
    - speed trumps design just for that moment
  - you will either overengineer solution or anlysis paralysis
- clean code when
  - refactoring step
  - you do not write new tests when you refactor
  - don't make everything public in order to test it - don't test it
  - refactoring book: Martin Fowler
  - only apply patterns in the refactoring step
- suggestion: adapter, port infrastructure
- reduce ATDD altogether
- don't use mocks to confirm implementation details
- IOC/DI are overused