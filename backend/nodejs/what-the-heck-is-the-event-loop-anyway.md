# What the heck is the event loop anyway?
[ref](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)

- the call stack
  - one thread, one call stack, one thing at a time
  - all calls will push on to stack, pop when returning
- blocking
  - when things are slow
- use asynchronous callbacks 
  - `setTimeout` will push a timer function onto the webapis (or C++ code for node) and when finished, will place the callback into the task queue
  - event loop's job: if stack is empty and something is in task queue, push from queue into stack