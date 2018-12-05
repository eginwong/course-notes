# Project Reactor
> asynchronous, concerned with data streams and change propagation



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

### Disposables
* all `subscribe()` methods will return a `Disposable` which can be used to cancel the subscription
    * not guaranteed to be immediate

### Context
* key/value store that is propogated between components via context protocol, ideal for transporting orthogonail info like tracing or security tokens
* thread-safe, immutable

### Multi-threaded usage
* concurrency agnostic
* make use of `Scheduler` which will orchestrate the threads, similar to an `ExecutorService`
* for the execution contexts, there are a few options:
    * `Schedulers.immediate()`, for current thread
    * `Schedulers.single()`, for a single, reusable thread for all calls
    * `Schedulers.elastic()`, elastic thread pool creates new worker pools as needed and reuses idle ones. 
    * `Schedulers.parallel()`, many workers as you have CPU cores
* Two means of switching execution context, via `publishOn` or `subscribeOn`
    * `publishOn` will switch the whole sequence to a Thread picked from the Scheduler pool and remain on that one until switched by another `publishOn` or completed
    * `subscribeOn` applies to subscription process, and can change from original subscriber thread to another pool of available threads determined by the argument passed
    * [further discussion](https://zoltanaltfatter.com/2018/08/26/subscribeOn-publishOn-in-Reactor/)

### Error Handling
* `onErrorReturn` for static fallback value
* `onErrorResume` for fallback method
* catch and rethrow
* `doFinally` to execute no matter what
* `retry` actually re-subscribes to upstream value, as the previous one does get terminated
* unchecked exceptions will propagate, checked exceptions will either recover, wrap into unchecked, or wrap in `Flux.error()`

### Processors
* equivalent to Subjects in Rx
    * direct, synchronous (mirror-ing another sequence), asynchronous (can handle multiple upstream)
    * direct does not handle backpressure
    * direct - unicast: can deal with backpressure using an internal buffer, single subscriber
    * synchronous - emitter: backpressure, multi-subscriber with buffer for first available subscriber only
    * synchronous - replay: caches elements pushed to `sink()` or from upstream Publisher
    * asynchronous - topic: `share()`, multicasting to multiple subscribers
    * asynchronous - workQueue: round-robin distribution of requests to multiple subscribers, scales better than `TopicProcessor`

### Mutualizing Operator Usage
* use `transform` to encapsulate a group of operators together
* `compose`, similar to `transform` but can actually store state as it is run on a per-subscription basis
* hot vs. cold
    * hot publishers will start sending values before even getting subscribers
    * `ConnectableFlux`, `publish` dynamically handles backpressure to source and `replay` will buffer data for subsequent subscribers
    * `connect()` can trigger subscription to upstream resource when ready
    * `autoConnect(n)` does the same automatically
    * `refCount(n)`, handles incoming and cancelled subscriptions to auto cancel link with source if below threshold
* Batching into separate batches
    * grouping and windowing = `Flux<Flux<T>>`
        * group via key and `groupBy`, never empty and always disjoint
        * windowing, splits by size, time, boundary-defining predicates, or boundary-defining Publisher
        * windowing can have overlaps
    * buffering aggregates into a `Collection<T>`
* Parallelizing work with `ParallelFlux`
    * after declaring `parallel()`, must indicate how to execute across with `runOn(Schedulers.parallel())`
* can modify default `Schedulers` implementation for many reasons, i.e., cross-cutting concerns
    * [ref](https://projectreactor.io/docs/core/release/reference/#context)
* Using global hooks
    * Dropping hooks
        * when source of operator does not comply with Reactive Streams
        * picks up `onNext` or `onError` value that is dropped when called after an `onCompleted`
    * Internal error hooks
        * invoked by operators when an unexpected Expection occurs in execution of `onNext`, `onError`, and `onComplete` methods
        * example would be a `map` operator with division by zero. `onOperatorError` hook can inspect and change the exception
    * Assembly hooks
        * tie into the operators lifecycle
        * dynamically change each operator as assembled in the chain, by returning a different `Publisher`
        * `onEachOperator`, `onLastOperator`
    * all hooks can be reset with `Hooks.reset...()` and are cumulative
    * Hook Presets are more available options for using/writing hooks
* Adding Context to a Reactive Sequence
    * a `Thread` can be used to process several async sequences at the same time (in non-blocking locksteps)
    * execution easily jumps from one thread to another
    * not good for devs used to `ThreadLocal` as data associated with a thread may be mismatched with its corresponding executions (remember, they change)
    * usual workaround is to move contextual data + business data in sequence by using `Tuple2<T,C>`
        * leaks the contextual data into your method which is not good
    * called the `Context`
    * immutable map 
    * must be made available to each operator in a chain, tying itself to each `Subscriber` to a chain
    * `subscriberContext` would be called first due to subscription time nature, and subscription signal flows bottom to top
    * subscriber flows up, other operators go downwards
    * to manually clear up potentially memory, have to use global hooks to catch objects that are forgotten
* Reactor-Extra is an artifact with extra operators/utilities for advanced needs
    * `TupleUtils`, `MathFlux`