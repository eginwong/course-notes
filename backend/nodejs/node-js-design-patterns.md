# Node.js Design Patterns (2nd edition)
[ref]() book

## Welcome to the Node.js Platform
- small core
- small modules
- WeakMap and WeakSet are for gc cleaning up, but keys must be objects and cannot be iterated over
- reactor pattern
  - use while loop to listen over events emitted, and store all called functions in a watched list
  - called event demultiplexing
  - reactor pattern: handler with each I/O operation
  - libuv implements this for node.js, as non-blockign I/O

## Node.js Essential Patterns
- callback pattern
  - handlers of the reactor pattern
  - involves closures, that maintain reference to environment wherein a function was created
  - continuation-passing style
    - having node.js handle async events and callbacks
  - ensure that calls are consistently async or sync, not both
  - convention in node.js is that callbacks come last
    - error comes first
- module system and its patterns
  - revealing module pattern
    - encapsulated internals, only public API exported
  - everything is private unless assigned to `module.exports` variable
  - `require` is synchronous to simplify logic in startup/bootstrapping phase
  - resolve algorithm will allow each module to have its own private set of dependencies
  - substack pattern: expose only one function from a module to follow SRP
- observer pattern
  - The EventEmitter class
    - meant for repeat events
    - callbacks are meant for a single usage

## Asynchronous Control Flow Patterns with Callbacks
- avoid callback hell
  - modularize
  - exit as soon as possible
    - immediately return on error instead of nesting more conditions
  - create named functions
- `async` module that has a lot of these patterns already

## Asynchronous Control Flow Patterns with ES2015+
- promises
- generators
  - semi-coroutines
  - similar to a function that can be suspended, `yield`
  - `function*` which is a factory
    - returns `{ value, done }`
    - `next(param)` is used to pass a param to the generator
    - generators are good for serial execution but not as a good for parallel execution

## Coding with Streams
- allow for spatial efficiency and time efficiency
- connecting streams
- read, write, transform, duplex

## Design Patterns
- factory
- revealing constructor
  - specify in the constructor what functions are exposed to the world (resolve, reject) as an example
- proxy
  - monkey patching is a form of this
  - often used in aspect-oriented programming

## Wiring Modules
- module for information hiding
  - readable
  - focused
- can hardcode dependencies with require
- OR use DI and pass them in as parameters to the module.exports line as factories
- OR service locator for all your needs for factory/registering services
- OR Plugins via DI IoC, quite convoluted for runtime resolutions

## Univeral JS for Web Applications
- UMD
- Webpack, Babel
- React

## Advanced Asynchronous Recipes

## Scalability and Architectural Patterns
- cloning, load balancing
- `cluster` module
- if cluster.isMaster; else;
- load balancing with reverse proxies (nginx, HAProxy)
- microservices
- API proxy
- API orchestration

## Messaging and Integration Patterns
- Command Message
- Event Message
- Document Message
- Pub/Sub
- Message Brokers