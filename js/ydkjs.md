# YDKJS
[ref](https://github.com/getify/You-Dont-Know-JS)

### Up and Going:
* JavaScript is an amalgamation of different languages, which makes it so accessible to new users
* Often, can ship production code without really fully understanding JS behind the scenes, so rarely do people actually master it
* Expressions: literal value, variable expression, arithmetic expression, assignment, and call expression (function calls)
* JS makes use of dynamic typing, which allows for variables to hold any type 
* Scope: Each function gets its own scope, variable name has to be unique within its scope
* Code in one scope can utilize scope variables of its own and the scope outside of its own

* Object types (7): number, null, undefined, string, boolean, object, (symbol is new)
* Only values have types, not their variables
* Bracket notation useful if property/key in object is named the same as another variable in scope, obj[b] vs. obj[“b”]
* Object -> subtype is function or array
* FALSY: “”, 0, -0, NaN, null, undefined, false
* == with coercion, === without
* If either side of comparison can be true/false, or if either value is 0, “”, [], use ===. Otherwise, can use ==
* Non-primitive equality checks are only referential and not by value
* Function scopes: 
    * Var keyword to declare variable in current function scope, or global scope if outside any function
* Hoisting: declarations are “moved” to the top of the enclosing scope at compilation time. Generally okay for functions, not for variables 
* When variable value is not available, you get a ReferenceError
* Variables declared in outer scope can be accessed by any lower/inner scopes
* Immediately Invoked Function Expressions (IIFE) can be used to return values
* Closures used for module pattern, defining public API and hiding internals
* ‘This’ does not refer to the function itself
* To handle backwards compatibility of new features in JS, we use transpilers (Babel) or polyfills or shims

### Scope & Closures:
* Compilers do: tokenizing -> parsing (into Abstract Syntax Tree) -> Code Generation
* For RHS lookups, will get reference errors. For LHS lookups not in strict mode, will create a global scope variable
* Good reference material [on scope and context and this](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)

#### Lexical Scope
* defined as the scope defined at lexing time - where variables and blocks of scope are authored when the lever processes the code, WHERE FUNCTION IS DECLARED
* Scope lookups stop once they find the first match
* Cheating lexical scope leads to poorer performance, but can be done through `eval()/setTimeOut()/setTimeInterval` as if you programmatically wrote code or `with`, which creates its own separate lexical scope. “Var” inside with will be in containing scope, can lead to weird side effects to the global scope
* `with` and `eval` will stop the javascript engine from optimizing because it can have no idea about the contents of the code so it cannot optimize. 
* In strict mode, `eval` has its own lexical scope and will not affect the scope around it

#### Function vs. Block Scope
* Function-based scope
* Keeps values enclosed and `hidden` from the outside world
* Helps collision avoidance
* Use IIFE for functional expressions
* Anonymous function expressions can be hard to debug as there’s no label, and leaves documentation lacking
* Catch creates its own block scope but otherwise, js doesn’t have a built-in concept of block scoping
* Adding explicit blocks `{}` can allow for garbage collecting, note that `let` doesn’t get hoisted. `const` also creates a block-scoped variable
* `var` is function scope, `let` and `const` are block scopes

#### Hoisting
* Declaration is done in the compilation phase, assignment during execution phase
* Function declarations are hoisted, but not expressions
* Functions are hoisted first before normal variables
* Any functions within blocks normally get hoisted to enclosing scope

#### Scope Closure
* closure is when a function can remember and access its lexical scope even when function is executing outside of its lexical scope
* callback functions are often examples of closures, or whenever you treat functions as a first-class citizen
* in for loops with closures, may need to use IIFEs and ensure that there is a new scope per iteration of the loop. Or you could use let and it will be declared for each iteration
* Can use module-like pattern and expose an object from a function that has references to other functions, sort of like a public api of sorts
* outer function must be invoked at least once, and must return back at least one inner function to access closure and private scopes
* ES6 syntax for import/export of modules must be in their own files now
* Dynamic scope is runtime, and cares where it’s called from, lexical scope is where the function was declared
* Arrow functions take the immediate lexical enclosing scope, which is different from the usual. No need to do “var self = this;” to bind functions to its own lexical scope
* This.count++, and then have a “bind(this) on the end of the function, to bind to enclosing lexical scope

### This and Object Prototypes:
* `this` is not related to lexical scope
* `this` matters where the function is called, and not where declared. Run time mechanism
* Binding made when function is invoked and what it references is based on the call-site of where the fun is called

#### this all makes sense now!
* Call-site, where the function is called
* Focus on the call-stack to find the moment right before the invocation of the function
* Call-site will follow rules:
  * Default binding - plain undecorated function reference; with “use strict” in contents of function not its call-site, will throw TypeError undefined
  * Implicit binding - when an object has function as attribute, and you call from there - obj.foo(), would have obj as call-site
      * Can get implicitly lost because functions are passed by reference in parameters, and will not be tied to any object reference even if it has
  * Explicit binding - using call and apply, forcing the method to use the object passed in as the “this” binding
    * Hard binding - create a function that calls the function you want -> function() { foo.call(obj);}, called bind in ES6
    * API call contexts does something similar as well, passing an extra parameter to be the obj you wish to bind
  * `new` binding - no actual constructor functions, but construction calls of functions. New object is created and set as the `this` binding, will return object automatically
* New > explicit > implicit > default
* Can explicitly bind null to do currying or to go to default binding rules -> leads to manipulating global state in cases
    * Use Object.create(null), which skips Object.prototype delegation for safety instead of null
* Indirection -> when you do assignment, the return value is reference to underlying function, which would then be global
    * (p.foo = o.foo)(); (not o.foo or p.foo, but rather foo());
* Soft-binding will be overridden with default unless there is an alternate binding that is above default. Allows for flexibility compared to the hard binding
* Arrow functions bind to the lexical scope, so it overrides rules of `this` (old way was var self = this). In a codebase, choose one or the other but not both

#### Objects
* Primary types in JS: string, number, boolean, null, undefined, object
* Sub-objects = String, Number, Boolean, Object, Function, Array, Date, RegExp, Error
* JS will coerce primitives to their related object when required for length, etc.
* “.attribute” is property access, [“attribute”] is key access. Property Access requires an Identifier compatible property name
* Can add properties to an array, as it is an object
* Object.assign() takes target object and multiple sources to create an object via reference, but only immediately available attributes
* Can define properties and metadata, as well
```js
Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );
```
* Object preventExtensions will stop getting new properties added to it
* Object.seal() will lock any new attributes and even config changes
* Object.freeze will seal and leads to immutability for the object
* Object.get() does hv a recursive branch from theory
* Supports GET, PUT, DELETE 
* Built-in delete operator syntax

#### Mixing “Class” Objects
* Child inheritance implies copies
* Explicit mixins - specifying exactly which method to call, and the object to bind it to -> Vehicle.drive.call(this); for shadowed variables
    * Will still get references that don’t duplicate, like for arrays, functions
    * Parasitic inheritance is possible as well, but mainly hijacking the parent and using closures to keep the reference of the original shadowed method
* Implicit mixins - declaring another object and grafting on a function call that will make a call to another object’s function.
```js
var Another = {
	cool: function() {
		// implicit mixin of `Something` to `Another`
		Something.cool.call( this );
	}
};
```

### Prototypes
* Everything goes up the prototype chain until references are either found or returned as undefined
* Base is `Object.prototype`
* shadowing - when variable is up the chain but not on the object itself
* if property is not read-only, will create a shadowed property directly on object itself
* if read-only, no shadowing occurs and command is ignored
* if property is a setter, will call the setter and the OG setter will not be redefined
* Would have to use `Object.defineProperty(..)` otherwise
* Be careful with shadowed variables
* "prototypal inheritance" is a really bad name because it does no copying and only creates links 
* Using constructors does not actually create a new object but adds a link as side effect - does not mean constructed by
* Check for prototypes with - `obj.isPrototypeOf(object)       
* `Object.create()` does not add arbitrary `.prototype` and `.constructor` because it does not go through the fake concept of constructors and "classes"

#### Behaviour Delegation
* Objects-Linked-to-Other-Objects (OLOO) style
* Avoid using `instanceOf` because it can be misleading - use `isPrototypeOf` and `Object.getPrototypeOf` to compare instance instead (or rather, relationships)
* class is still just syntatic sugar, at the end of the day - hides some dangerous problems

### Types & Grammar
#### Types
* cannot check null with `typeof` because of a bug. Use `(!a && typeof a === 'object')`
* **values** have types, not *variables*
* undefined and undeclared are not the same, though can be confusing because of JS tings
* `typeof` will not throw `ReferenceError` even if the variable has not been instantiated - good measure for safe checks

#### Values
* arrays are just container for values, so there's no typing involved. `['a', 1, [2]]` is valid
* arrays are also objects, so they can take keys/properties but will not add to length
* if the string key is co-ercable into a number, it will do so as js assumes you wanted a number `a["13"] = 42; a.length; // 14`
* `slice()` can clone an array
* js strings are immutable, arrays are mutable. arrays often mutate in place
* number stores using double precision format (a.k.a 64-bit binary), floating-point
* for decimal comparisons, do use `Number.EPSILON` for tolerance
* in order to assign `undefined`, can run `void __` to make sure nothing is return from that operation
* NaN is never equal to another NaN value, but its `typeof` is number. Confusing, huh?
* NaN is the only value not to have reflexive property, as in `NaN !== NaN`
* `-0` is a thing, and has to be done through multiplication/division, used for animation and magnitude of value importance
* in ES6, can do `Object.is()` and used for special cases of equality

#### Value vs. Reference
* scalar primitives (null, undefined, string, number, boolean, symbol) are all passed by value copy
* object, array are always by reference
* there's no way of changing some other variables pointer reference, which can be confusing in functions at times (NOTE: parameters are, in essence, assignments)
* using wrapper object will still not change the underlying scalar primitive value

#### Natives
* Wrapper **objects** around primitive types, such as `Number()`
* rarely use, as it will reduce optimization of browser
* sometimes will need to use `RegExp("pattern", "flags")`, for dynamic definition of pattern
* `Date()` and `Error()` have no primitives, so they must be used
* `Symbols()` are scalar primitives, and cannot use `new` with them

#### Coercion
* coercion is implicit casting of one type to another, results only in primitive types
* only happens at runtime
* objects, when `toString()` will return the internal `[[class]]` unless they have implemented their own `toString()`
* arrays have an overriden default that concatenates all values
* `JSON.stringify()` will not do so for functions, undefined or symbol
* if object has a `toJSON()` method, will call that first for serialization
* `JSON.stringify()` can specify specific attributes to serialize, or execute a function (key, value) over each property, or specify # of spaces for prettier output
* falsy values: `undefined`, `null`, `false`, `+0`, `-0`, `NaN`, `""` and then `document.all` object in legacy IE
* explicit conversion, don't use the `new` keyword. `var a = String (42) // "42"`
* `+` will convert a value to a number, and `toString()` will box and the unbox primitive into a String
* two's complement is `-(x+1)`
* for verifying if value is in array with `indexOf()`, can use `!~array.indexOf()` for not found, and without negation for found. When not found, it is `-1; ~(-1) == -(-1 + 1) == 0 == false` 
* can use `~~` for truncating decimal, but only for 32-bit integers and will behave differently from `Math.floor()` in negative cases
* any `parse___` method will `toString()` first and then try to coerce the string value
* to coerce boolean, most often use `!!` to flip and coerce and then flip back
* for `+`, if either operand is string OR when unwrap tries and fails to find a primitive, will fall to the `toString()` method
* `number + ""` will coerce to a string
* `-, *, /` only apply to numbers and will coerce a string
* `!!` will force value to be true or false
* if coerced to true, the first value of `||` operator will be returned else the second
* if coerced to true, the second value of `&&` operator will be returned, else the first
* `a && foo()` shortcircuits too, so you don't need to add a `if(a) { foo(); }`
* symbol cannot coerce to a number, but can be coerced to a boolean
* `==` is with coercion, `===` is without coercion
* when equating, always converting to number for baseline comparison
* when equating for boolea, will convert to number which converts `true` to `1`
* avoid `== true` or `== false` as they are dangerous
* `a == null` with coercion will always catch falsy values
* Objects will first call `valueOf()` when unboxing to do coercion
* if either side can have true or false, don't ever use `==`
* if either side could have `[]`, `""`, `0` values, consider not using `==`
* for `<`, try to primitive first, and then if neither is a string, coerce to number
* if both are strings, lexicographic (alphabetic) comparison
* toString for objects becomes `[object Object]`
* equality with object references doesn't work because they check reference of object even if values are the same

#### Grammar
* Statement completion value is what is the implict return of the last statement value in a block
* `++` if before value is evaluated and then returned, but returned and then evaluated otherwise, like `a++`
* can take advantage of side effects to have cleaner code, but need to include `()` for operator precedence
* can label statements and `continue` and `break` from them, using the specific label name, similar to goto statements
* operator precedence `&&` > `||` > `? :`
* the `? :` and `=` is right-associative, while `&&` and `||` are left-associative
* Automatic Semicolon insertion (ASI) is used for parser-error correction, should not be relied upon
* `try ... finally` has interesting quirks, but will run the finally block right before the resolution of the try. If finally has a return statement, will override the try return statement
* Be careful of overwriting native functionality on `prototypes` as they may be updated in the future

### Async & Performance
#### Asynchrony: Now & Later
* callback function is used for when the async process has returned with a result
* event loop running forever with iterations called a `tick`
* JS never shares data across threads
* run-to-completion: single thread, so no interweaving of processes
* in order to chunk large request, can use `setTimeout(,0)` to put a new event in on the upcoming `tick`s
* Job queue is adding an event to the tail-end of the larger event-loop (currently being processed) event

#### Callbacks
* callbacks are the function that is used to call back into the program
* callback hell is just really hard to make sense of the actual execution order
* callbacks use inversion of control to let another party invoke the continuation of the program, which leads to trust issues about execution
* what happens when callback function never called, or called multiple times
    * not a lot of support around the callback function handling in general, which leads to potential bugs and a lot of boilerplate
  
#### Promises
* promise of a future value that is either successful or failure
* immutable once resolved
* we return a listener in the form of Promise, inverting the *inversion of control* that exists from callbacks (now we listen for the completion of the promise)
* in order to improve trust, the `Promise.resolve(...)` will unwrap any *thenable* so that a value is provided
* can chain promises together and will default success and error handlers for re-throwing or returning values down to the next promise
* error handling can be tricky if some errors are swallowed within the `resolve` callback function
* `Promise.all` is a gate for all values, that are then unwrapped through the `resolve`
* `Promise.race` is a latch and takes only the first one
* Promises are uncancelable, as they should e

#### Generators
* cooperative concurrency
* `function *foo()` with the `*` and the use of the keyword `yield`
* calling `foo()` will not execute the generator but constructs an iterator
* `yield` and `next` allow for two-way communication during the execution of the generator
* multiple iterators from one generator can be created, but their executions are separate
* iterators work with `next()` calls, `done` is status boolean value and `value` holds the iteration value
* iterable is an object that creates iterators, often different instances of one
* when a generator is executed, an iterator is returned
* can allow for more straightforward code-writing and make the async process flow mentally a little easier
* yield the promise to make use of generators and promises
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
* the use of `await/async` is similar, but still yet to be included in the language
* should use `yield *__` for generator delegation instead of calling one from another
    * passes iterator control from one iterator instance to another until exhausted and then returns
* if no explicit return statement in iterator, will return `undefined` when completed
* thunk is a function, without any parameters, that is wired to call another function
* most utiliy libraries create thunk factories which are called to create thunks, which are then finally called for their functions

#### Program Performance
* Use of web workers, spinning up a separate thread for execution in the browser
    * makes use of basic event messaging for connecting, no shared state otherwise
    * webworker can both `addEventListener` and `postMessage`
* has own copy of important global variables
    * can load extra scripts into the Worker, loaded synchronously
* can create `SharedWorker` to reduce load of similar resources, i.e. socket
    * uses `w1.port.addEventListener` and other `port` syntax instead
    * must be started with `w1.port.start();`
    * extra event `connect` must be handled
* SIMD, Single Instruction, multiple data: data parallelism
    * modern CPUs provide SIMD capability with vectors of numbers
* asm.js, a highly optimizable subset of the JS language that avoids certain mechanisms hard to optimize by the engine
  
#### Benchmarking & Tuning
* use a proper library like `benchmark.js`
* ensure that your measurements are realistic and hold weight 
* test *real* code under *real* situations to get a good feel of actual performance
* `jsPerf` uses benchmark and it tests under varied conditions
* a different outcome between two tests obviously invalidates the comparison
* very hard to write good, comparable tests
* non-critical path performance optimization is a waste of time
* tail-call optimization will reuse the same stack of memory, if it realizes that all that is left of a function is to return its value

### ES6 & Beyond
#### Syntax
* easily add block scoping using `let` and `{}` braces
* will get temporal dead zones (TDZ) if there is a reference to a `let` variable before it has been executed
    * generally better to scope the `let` variable higher up in the scope
* `let` will redeclare a new `i` for each iteration of the `for` loop
* declare `const` for values that aren't supposed to change, in terms of reference
* now there is proper block-scoping, so functions will not be hoisted out of its block
* `...` is a spread/rest operator, and will expand a value if before an iterable (like an array)
    * can also gather the remainder of values, like in `...args`
* setting default values in function parameters
    * can also be default value expressions (like function calls)
* destructuring, which is more like structured assignment
    * `var [ a, b, c ] = foo();` or for objects as well
* concise naming is introduced, but they imply for functions that they should be anonymous 
    * good if never using recursion, event un/binding
* String interpolation, or the `
* Tagged Template Literals, or tagged string literals, sort of using functions within String interpolation
    * can access the raw strings from within the interpolation block using `String_value.raw`
* Arrow functions:
    * anonymous
    * shorter form
    * converts `this` to the lexical `this` and avoids the use of `var self = this` hacks and such
    * however, may not always be good if you don't want the `this` to be bound to that executing function
* for .. of loops, which apply to the of as being an iteratable that returns an iterator
* regex will now match with `/u` for unicode
* can set sticky regex with `/y` to limit what is matched, one at a time
    * unlike `/g` which returns all matches immediately
* can get flags from a string, by calling `string.flags`
* better unicode support
* new primitive type, `symbol`
    * cannot be `new`
    * completely unique value
    * can use with Symbol registry with `Symbol.for`, meant to replace magic strings

#### Organization



read more kyle simpson