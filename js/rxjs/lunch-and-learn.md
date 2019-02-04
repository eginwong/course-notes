# Lunch and Learn Material

## Declarative vs. Imperative
- or Functional (immutable data structures, higher-order functions) vs. Object-oriented (state, side-effects)
- Declarative is what you would like to happen
- Imperative is telling how to do it

> Reactive programming is programming with asynch data streams
- data streams can be variables, user inputs, properties, caches, data structures
- stream is a sequence of **ongoing events ordered in time**
    * three outputs: value, error, or completed signals
    * corresponds to: `onNext`, `onError`, `onCompleted`
    * `onError` must include cause of error

## Why not promises?
- promises are:
    * eager, not lazy
    * no cancellation
    * never synchronous
    * then() is combination of map() and flatMap()
- [source](https://staltz.com/promises-are-not-neutral-enough.html)
- single values




## Why and What ReactiveX?
- > ... [C]omposing asynchronous and event-based programs ...
- extends Observer pattern (one object can notify downstream dependents without tight-coupling) to support sequences of data and/or events declaratively
- subject (leader) and many observers (followers), or pub-sub
- functional and reactive (operates on discrete values over time), but not functional reactive (operating on values that continuously change over time)
- simplifies processing to prevent worrying about asynchronocity 
- Composable (like water flow), flexible (like Iterable but push instead of pull)
- less opinioniated -> doesn't care about from where the source of concurrency/async is from (i.e. thread-pools, event loops, non-blocking I/O, etc.)

### Observable
- Observer observes items emitted from an Observable
- Hot observables have been emitting and observer who joins will start in the middle
- Cold observables waits until something subscribes before emitting
- ReactiveX comes from Reactive Extensions, which is what can come of composing operators on Observable streams
- Operators include:
    * Creating (Empty, From, Interval, Repeat, Timer)
    * Transforming (FlatMap, Map, Scan, GroupBy)
    * Filtering (Debounce, Distinct, Filter, First, Take, Skip, TakeLast)
    * Combining (Merge, StartWith, Join, Switch, Zip)
    * Error Handling (Catch, Retry)
    * Utility (Subscribe, Delay, Do, Timestamp) 
    * Conditional/Boolean (Contains, SkipUntil, SkipWhile, TakeUntil)
    * Mathematical/Aggregate (Average, Count, Max, Min, Reduce, Sum)
    * Converting (To)
    * Connectable (Connect, Publish, RefCount, Replay)
    * Backpressure (...) - for when Observables produce faster than consumption and consumption tells it to slow down
- Operators are chained and operate _in turns_

### Subjects
- bridge between observer and Observable
- can subscribe to 0+ Observables, and can re-emit + emit them
- are hot
- > if the source Observable is external (outside of your code), *do not* use a subject, otherwise *do* 
    * use subject when converting a cold observable to hot
    * generating a hot observable imperatively and with state, without any direct external source
- determine what you start with (hot or cold) and what you need to output (hot or cold)
- `AsyncSubject` emits only the last value of the source Observable and only when the source completes
- `BehaviourSubject` replays **only** the previous value from the source Observable for every new subscriber
- `PublishSubject` does what you would expect and emits event from source to other subscribers
- `ReplaySubject` stores all previous values from the source Observable and plays them **all** for new subscribers

### Scheduler
- can make use of concurrency through use of *Schedulers*
- usually, all work will be done on the same thread
- management of which thread is done through `SubscribeOn` and `ObserveOn`
- when main thread is UI, don't want to block it but need to update UI objects 
- can be used to control how values are emitted [1](https://staltz.com/primer-on-rxjs-schedulers.html)
- [Resource](http://www.introtorx.com/Content/v1.0.10621.0/15_SchedulingAndThreading.html)

## Resources
- [What is reactive?](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [Multicasting, share, and publish](https://blog.angularindepth.com/rxjs-understanding-the-publish-and-share-operators-16ea2f446635)

### Building your own Observable
- > Observable is just a function that takes an observer and returns a function [source](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87)
    * function 
    * accepts an observer object with `next`, `error`, and `complete`
    * returns cancellation function
```js
function myObservable(observer) {
    const datasource = new DataSource();
    datasource.ondata = (e) => observer.next(e);
    datasource.onerror = (err) => observer.error(err);
    datasource.oncomplete = () => observer.complete();
    return () => {
        datasource.destroy();
    };
}
```
- Operators are simply functions
```JS
function map(source, project) {
  return new Observable((observer) => {
    const mapObserver = {
      next: (x) => observer.next(project(x)),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    };
    return source.subscribe(mapObserver);
  });
}
```
[Source](https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87)



## Promises vs. Observable
- mouse clicks as event listeners, sure, but transforming those into other streams of information are important
- Promises are native, interoperable, simple, subscribable at any time, can only resolve once
- promises not suited for being cancellable and for retrying easily
- `then` is used for both mapping functionality and side-effects
- hot vs. cold
- can use `fetch` for cancellation
- may want to use Observables to remain consistent with API



Flow of L&L:

## Quick Intro on Reactive Programming
- the world of asynchronous
- define reactive
- define Observable/ observer design pattern

## Demo of real-world example
- spamming user (add debounce) and no cancellation
- operators:
    * take
    * filter
    * map
    * reduce
    * switchMap
    * distinctUntilChanged()
    * tap


## SAMPLE:
```js
// https://rxviz.com/examples/input-element
const { fromEvent } = Rx;
const { map, filter, debounceTime } = RxOperators;

const input = document.createElement('input');

input.setAttribute('placeholder', 'Type something');

// `output` represents the right hand pane.
// You can prepend/append elements to it.
output.prepend(input);

input.focus();

fromEvent(input, 'keyup').pipe(
  map(i => i.currentTarget.value),
).pipe(
	debounceTime(200)
)
```



# Tips
- simple examples
- stock picker streaming data
- don't feel like you need to be an expert
- don't tote it as a magic bullet
- compare and contrast
- don't go too in-depth
- present the question
- don't spend 20 minutes to get the context
- BOIL DOWN AND PROVIDE MAIN MESSAGES!