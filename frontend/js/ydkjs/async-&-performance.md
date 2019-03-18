### Async & Performance
[ref](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/README.md#you-dont-know-js-async--performance)

#### Asynchrony: Now & Later
- callback function is used for when the async process has returned with a result
- event loop running forever with iterations called a `tick`
- JS never shares data across threads
- run-to-completion: single thread, so no interweaving of processes
- in order to chunk large request, can use `setTimeout(,0)` to put a new event in on the upcoming `tick`s
- Job queue is adding an event to the tail-end of the larger event-loop (currently being processed) event

#### Callbacks
- callbacks are the function that is used to call back into the program
- callback hell is just really hard to make sense of the actual execution order
- callbacks use inversion of control to let another party invoke the continuation of the program, which leads to trust issues about execution
- what happens when callback function never called, or called multiple times
    * not a lot of support around the callback function handling in general, which leads to potential bugs and a lot of boilerplate
  
#### Promises
- promise of a future value that is either successful or failure
- immutable once resolved
- we return a listener in the form of Promise, inverting the *inversion of control* that exists from callbacks (now we listen for the completion of the promise)
- in order to improve trust, the `Promise.resolve(...)` will unwrap any *thenable* so that a value is provided
- can chain promises together and will default success and error handlers for re-throwing or returning values down to the next promise
- error handling can be tricky if some errors are swallowed within the `resolve` callback function
- `Promise.all` is a gate for all values, that are then unwrapped through the `resolve`
- `Promise.race` is a latch and takes only the first one
- Promises are uncancelable, as they should e

#### Generators
- cooperative concurrency
- `function *foo()` with the `*` and the use of the keyword `yield`
- calling `foo()` will not execute the generator but constructs an iterator
- `yield` and `next` allow for two-way communication during the execution of the generator
- multiple iterators from one generator can be created, but their executions are separate
- iterators work with `next()` calls, `done` is status boolean value and `value` holds the iteration value
- iterable is an object that creates iterators, often different instances of one
- when a generator is executed, an iterator is returned
- can allow for more straightforward code-writing and make the async process flow mentally a little easier
- yield the promise to make use of generators and promises
```js
var it = main();

var p = it.next().value;

// wait for the `p` promise to resolve
p.then(
	function(text){
		it.next( text );
	},
	function(err){
		it.throw( err );
	}
);
```
- the use of `await/async` is similar, but still yet to be included in the language
- should use `yield *__` for generator delegation instead of calling one from another
    * passes iterator control from one iterator instance to another until exhausted and then returns
- if no explicit return statement in iterator, will return `undefined` when completed
- thunk is a function, without any parameters, that is wired to call another function
- most utiliy libraries create thunk factories which are called to create thunks, which are then finally called for their functions

#### Program Performance
- Use of web workers, spinning up a separate thread for execution in the browser
    * makes use of basic event messaging for connecting, no shared state otherwise
    * webworker can both `addEventListener` and `postMessage`
- has own copy of important global variables
    * can load extra scripts into the Worker, loaded synchronously
- can create `SharedWorker` to reduce load of similar resources, i.e. socket
    * uses `w1.port.addEventListener` and other `port` syntax instead
    * must be started with `w1.port.start();`
    * extra event `connect` must be handled
- SIMD, Single Instruction, multiple data: data parallelism
    * modern CPUs provide SIMD capability with vectors of numbers
- asm.js, a highly optimizable subset of the JS language that avoids certain mechanisms hard to optimize by the engine
  
#### Benchmarking & Tuning
- use a proper library like `benchmark.js`
- ensure that your measurements are realistic and hold weight 
- test *real* code under *real* situations to get a good feel of actual performance
- `jsPerf` uses benchmark and it tests under varied conditions
- a different outcome between two tests obviously invalidates the comparison
- very hard to write good, comparable tests
- non-critical path performance optimization is a waste of time
- tail-call optimization will reuse the same stack of memory, if it realizes that all that is left of a function is to return its value
