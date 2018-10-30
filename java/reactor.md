# Project Reactor

* efficient message passing with **low memory footprint**
* include with BOM and add dependencies without versions
* currently, async processing is handled via `callbacks` or `Futures`
* can `dispose()` of Flux or Mono types
* can programmatically create `Flux` through the `generate`, `push`, or `create`
* `handle` is combination of map and filter
* can play with threading based on Subscribers
* Processor are subjects in rxjs

### Backpressure
* can use `preFetch`, `buffer`, `limit__` to change downstream flow of events

### Testing
* test with `StepVerifier` and make sure to end with `verify()` to trigger test
* *reactor-test* uses `StepVerifier` for testing a sequence
* Producing fake data for tests uses `TestPublisher`
```java
StepVerifier.create(
    Flux....)
    .expectNext("")
    .expectErrorMessage("")
    .verify();
```
* When you want to make a custom assertion on the content of the signal, use `consumeNextWith`
* In order to manipulate time, make use of `StepVerifier.withVirtualTime(Supplier)`
```java
StepVerifier.withVirtualTime(() -> Mono.delay(Duration.ofDays(1)))
    .expectSubscription()
    .expectNoEvent(Duration.ofDays(1))
    .expectNext(0L)
    .verifyComplete();
```
* Can test specific contexts as well
* Can also use `TestPublisher` to control source of data in test, and also create non-compliant 
* Create a `Probe` if need to make assertions between two forking sequences that both result in `Mono<Unit>` 