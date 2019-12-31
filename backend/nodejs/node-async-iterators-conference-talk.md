# Async Iterators
- async + generator
- function that returns next function
- Symbol.asyncIterator will make it iterable


libuv, event loop
- need to understand handles (abstraction for long-lived resource, i.e., timers sockets, TTYs)
- active handles keep the event loop alive
  - handles can be unref'd so they don't keep loop alive
- requests: abstraction for short-lived operations (file IO, stream operations, socket connections)
  - like handles, active requests keep the event loop alive
- thread pool: 