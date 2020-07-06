# Deep Dive Node.js Event Loop

## Objective
- Deep dive on how the event loop works
- test people with broken promises
- reflect on how rxjs/promises work with event loop

## Phases of Event Loop
- timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
  - only specifies what time it MAY check, not the exact time
- I/O callbacks: executes almost all callbacks with the exception of close callbacks, the ones scheduled by timers, and setImmediate().
- idle, prepare: only used internally.
- poll: retrieve new I/O events; node will block here when appropriate.
- check: setImmediate() callbacks are invoked here.close callbacks: such as socket.on(‘close’).
  - setImmediate is to execute a script once the current poll phase completes, has an effect with new I/O events (like fs)

![event loop](https://miro.medium.com/max/1400/1*pTDB37rtNRCZk3GzAyDQJg.png)

## Mental Model
1. timers: `setTimeout`, `setInterval`
2. I/O callbacks: executes all other callbacks except (timers, close callbacks, and `setImmediate`)
3. poll: retrieve new I/O events
4. check: `setImmediate` and close callbacks `socket.on('close')`

OR 

1. check macrotask in microtask que
2. if exists, 

- Promises are microtasks
- types of microtasks
  - solitary callback microtasks, such as Promise，
and 
  - compound microtasks, such as Object.observe, MutationObserver and process.nextTick in Node.js.

- macrotasks are:
  - setTimeout
  - setInterval
  - setImmediate
  - requestAnimationFrame
  - I/O

## [w3 Document](https://www.w3.org/TR/html51/webappapis.html#event-loops)
- can have browsing context event loops OR worker event loops
- has 1+ task queues
- tasks
  - events
  - parsing
  - callbacks
  - using a resource
  - reacting to DOM manipulation
  - tasks are associated with either Document or Worker for a specific event loop
- one task source to particular event loop should alwas be added to the same task queue
- Processing Model
  - select oldest task on event loop's task queue
    - if none, check microtasks
  - set as currently runnign task on event loop
  - run the task
  - remove task that was run from the task queue
  - microtasks, checkpoint
  - repeat
- microtask queue
  - tasks queued on microtask queue
    - solitary callback microtasks
    - compound microtasks

## Questions
- difference between macro vs micro tasks
- process.nextTick() vs setImmediate()
  - process.nextTick goes first
  - preference to use setImmediate()
  - [ref](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)