# JUnit 5
[Source](https://junit.org/junit5/docs/current/user-guide/)

## Intro
- JUnit + Jupiter + Vintage

## Writing Tests
- can create meta annotations through `@itnerface`
- can group assertions via `assertAll` with lambdas
- can `assertTimeout` to ensure timeout is not exceeded
- can write assumptions, which will abort tests instead of failing them like an assertion would
- can enable tests conditionally, even testing for type of operating system, JRE, system properties, environment variables, if conditions
- can add tags
- to reduce number of lifecycles, can include `@TestInstance(Lifecycle.PER_CLASS)` but may have mutated state that is to be cleared between tests
- Can have `@Nested` classes to have better hierarchy / relationship of tests
- methods and constructors can now have parameters, for better DI
- repeat tests via `@RepeatedTest(10)`
- `@ParameterizedTest` and `@ValueSource({})` for parameterizing tests
    * experimental feature
    * requires junit-jupiter-params dependency
    * can even use enums, csv files, factory methods, 
- `junit.jupiter.execution.parallel.enabled` can be set to true and to run tests in parallel
    * experimental

## Extensions
- are powerful and replace Rule and Runner interfaces