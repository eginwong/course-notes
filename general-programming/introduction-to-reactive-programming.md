# Introduction to Reactive Programming

> Reactive programming is programming with asynch data streams
- data streams can be variables, user inputs, properties, caches, data structures
- stream is a sequence of **ongoing events ordered in time**
    * three outputs: value, error, or completed signals

## Thinking in RP (example)
- Almost everything is a stream
- requests can be a stream of data
- responses from those requests can also be a stream of data
- can create streams using `Rx.Observable.create`
- > Observable is Promise++
- can convert with `Rx.Observable.fromPromise(promise)`
- metastream is a stream of streams
- `flatMap` will flatten what is in the metastream and emit all that would be emitted from the stream of streams output on the one stream
- can convert Observables from event listeners `fromEvent`
- can `merge` streams as well
- can use `startWith` if you always want a stream to begin with a specific event

[Source](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

## Hot vs. Cold Observables
- cold observable is one where new subscribers have to start from the beginning
- hot observable is that new suscribers start from the same point as everyone else at that time in joining (i.e. live performance)
- hot observables replayed is one where you can watch a movie of the live performance, through `BehaviorSubject` and `ReplaySubject`
- `.publish().refCount()` will stop the performers if there is no one watching and will continue when one joins