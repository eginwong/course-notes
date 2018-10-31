# Kotlin Coroutines
* kotlin's own concept of suspending functions, providing safer and less error-prone abstraction than futures/promises
* needs to be launched within some coroutine scope

* think of as a light-weight thread
* `launch`, `runBlocking`, `async` start the coroutine
* `delay` is non-blocking
* can enable other functions to be called from within coroutines with keyword `suspend`
[Resource](https://kotlinlang.org/docs/tutorials/coroutines/coroutines-basic-jvm.html)

* can create scopes of coroutines, `runBlocking` will wait for all to complete, and `coroutineScope` which will not block for its children
[Resource](https://kotlinlang.org/docs/reference/coroutines/basics.html#your-first-coroutine)

* can cancel coroutines using `cancel` and `join` which will then wait for its completion
* code needs to be within suspendable functions and allow for cancellation, otherwise, completely ignored
* cancellation will throw a `CancellationException` but that is usually handled automatically when within in a coroutine context
* `withTimeout` will automatically cancel execution of a coroutine and throw `CancellationException`, can use `withTimeoutOrNull` instead to return `null`

## Channels
* similar to `BlockingQueue` but `put` -> `send` and `take` -> `receive`
* will close on `close()` which will ensure complete execution when received
* can create coroutines that only produce, `producers`
```kotlin
fun CoroutineScope.produceNumbers() = produce<Int> {
    var x = 1
    while (true) send(x++) // infinite stream of integers starting from 1
}
```
* can create corresponding coroutines that can consume the stream, `pipelines`
```kotlin
fun CoroutineScope.square(numbers: ReceiveChannel<Int>): ReceiveChannel<Int> = produce {
    for (x in numbers) send(x * x)
}
```
* can split up processing through the use of the `fan-out` technique, by assigning different consumers
* can `fan-in` and send multiple messages to one receiving channel
* use `Ticker channels` if there is a need to produce complex time-based produce pipelines and other time-dependent processing

## Composing suspending Functions
* code in coroutine is *sequential* by default
* can run `async` which returns a `Deferred` which will then be `.await()`ed on, to get the value. Because `Deferred` is of type job, like `launch`, they can both be cancelled
* can do lazy async processing, via `async(start = CoroutineStart.LAZY)`, and must `start()` the async process
* use structured concurrency with async
* cancellation is propagated through coroutines hierarchy, children and parents

## Coroutine Context and Dispatchers
* all coroutines execute in some sort of context, composed of `Job` and `CoroutineDispatcher`
* dispatcher controls how the threading is executed (in a pool, unconfined, specific thread)
* in `launch` and `async`, accepts optional dispatcher parameter to specify how to manipulate the execution
* `Dispatchers.Unconfined` should not be used in general code
* can suspend on one thread and resume on another
* for debugging, add the following JVM flag `-Dkotlinx.coroutines.debug`
* Children of coroutine inherit its parents scopes, and will be cancelled recursively, unless run from the `GlobalScope`
* parent coroutine will wait for the completion of its children, `.join()`
* can name coroutines, `CoroutineName("coroutineName")`
* combine context elements with `+` in the `launch()` parameters
* can manage thread-local data, use `asContextElement`

## Exception Handling
* coroutine builders will either propagate exceptions (`launch`, `actor`) or expose to users (`async`, `produce`)
* `CoroutineExceptionHandler` is generic `catch` block for any unhandled exceptions
    * only used for exceptions to be handled, so it will not work with `async` and `produce`
    * can define handler as a parameter to the coroutine builder
* when coroutine is cancelled using `Job.cancel` without cause, it will terminate but let the parent continue
* doesn't make sense to put an exception handler at a child-level if they are all cancelled in case of an exception
    * should only be for the parent-level coroutines
* `CancellationException`s are unwrapped by default
* `SupervisorJob` for when cancellation must be propagated only downwards, which means children exceptions do not bubble up
    * children coroutines should then handle their own exceptions via exception handlers

## Shared Mutable State and Concurrency
* `volatile` will guarantee linearizable (a.k.a atomic) reads and writes to the variable, but not atomicity of overall actions (i.e. increment)
* best to use thread-safe data structures
* can switch to single-threaded, but that would take a much longer time for execution
    * deemed *fine-grained* thread confinement, requiring a switch from one context to another
* practically speaking, thread confinement is usually done in large chunks, in this case with`CoroutineScope(singleThreadedContext)`
* could use Mutual Exclusion, through `Mutex` with both lock and unlock
    * suspends function instead of blocking thread
* Could also use an `actor` which communicates all through a channel of messages
    * benefit is efficiency as there is no locking and will always have some sort of work for execution

## Select Expression (experimental)
* await multiple suspending functions and choose the first one available
```kotlin
select<Unit> {
    coroutine1.onReceive { value -> println(value)}
    coroutine2.onReceive { value -> println(value)}
}
```
* can handle the closing of coroutines with `onReceiveOrNull` and support when the value returned is `null`
* select is biased to the first clause when two+ events are available
    * closed coroutines have priority though
* more [examples](https://github.com/Kotlin/kotlinx.coroutines/blob/master/docs/select-expression.md)

# Reactive Coroutines

## Differences between reactive streams and channels
* represent always hot stream of items
* every `receive` invocation consumes an element from the channel
* reactive stream is a higher-order functional concept
* `publish` coroutine builder will createa fresh coroutine on each subsription
* define subscribe, complete, finally
* coroutines can naturally handle backpressure through its suspension mechanism
* if processing coroutine within same thread (no separate scope), will have to `yield()` to the coroutine to execute on the same thread
* in a pure coroutines world, can emulate `Subject`s via `ConflatedBroadcastChannel`

## Operators
* in Rx, building your own operators are challenging due to handling backpressure
* however, coroutines and channels do that by design 
* all examples have `CoroutineContext` parameter (Rx world for `Scheduler`)
* can launch coroutines in unconfined context, much like operators in a Rx world
    * be careful, can blow up when dealing with complex pipelines
