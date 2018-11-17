### This and Object Prototypes:
[ref](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)

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

#### Prototypes
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