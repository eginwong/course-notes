### ES6 & Beyond
[ref](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond)

#### Syntax
- easily add block scoping using `let` and `{}` braces
- will get temporal dead zones (TDZ) if there is a reference to a `let` variable before it has been executed
    * generally better to scope the `let` variable higher up in the scope
- `let` will redeclare a new `i` for each iteration of the `for` loop
- declare `const` for values that aren't supposed to change, in terms of reference
- now there is proper block-scoping, so functions will not be hoisted out of its block
- `...` is a spread/rest operator, and will expand a value if before an iterable (like an array)
    * can also gather the remainder of values, like in `...args`
- setting default values in function parameters
    * can also be default value expressions (like function calls)
- destructuring, which is more like structured assignment
    * `var [ a, b, c ] = foo();` or for objects as well
- concise naming is introduced, but they imply for functions that they should be anonymous 
    * good if never using recursion, event un/binding
- String interpolation, or the `
- Tagged Template Literals, or tagged string literals, sort of using functions within String interpolation
    * can access the raw strings from within the interpolation block using `String_value.raw`
- Arrow functions:
    * anonymous
    * shorter form
    * converts `this` to the lexical `this` and avoids the use of `var self = this` hacks and such
    * however, may not always be good if you don't want the `this` to be bound to that executing function
- for .. of loops, which apply to the of as being an iteratable that returns an iterator
- regex will now match with `/u` for unicode
- can set sticky regex with `/y` to limit what is matched, one at a time
    * unlike `/g` which returns all matches immediately
- can get flags from a string, by calling `string.flags`
- better unicode support
- new primitive type, `symbol`
    * cannot be `new`
    * completely unique value
    * can use with Symbol registry with `Symbol.for`, meant to replace magic strings

#### Organization
- Iterators are used for pull-based consumption of data
    * can also `return()` and `throw()`, on top of the regular `next()`
    * can create your own iterators by defining a `[Symbol.iterator]()` in your object, and `next` mehods
- consuming iterators can be done via `for...of` loops, `...` spread operator, array destructuring
- Generators, covered earlier
- Modules, one module per file
    * API is static
    * singletons, will require factory otherwise
    * any exposed API is bound by reference, even for primitives
    * `import` and `export` must be at the top-level scope, no conditionals allowed
    * anything you don't label with `export` remains private inside scope of module
    * `export { .. as default}` is to allow updating the value in the module, while `export default ..` is for never updating the default export's value
    * can export multiple from the module, but avoid exporting an object with an API attached to it, as it reduces perf
    * if module has default export, can just use `import foo from "foo";` and omit the curly braces
    * all imported bindings are immutable and/or read-only
    * can have circular loading but discouraged
    * not often do you need to manually work with the loader, other than areas where you cannot import (html) or if you need customized loading. Done through promises
```js
Reflect.Loader.import( "foo", { address: "/path/to/foo.js" } )
.then( function(foo){
	// ..
} )
```
- Classes
- classes are not hoisted, syntactic sugar to wire up prototype
- can use `extends` and `super` but only in limited cases, more sugar
    * `super` isn't dynamically bound like `this` is, which can lead to some odd situations if you use `call` on another object that has a parent on it
    * can `extend` native types like `Array` which were not fully available via `prototype` hacks
    * `new.target`, meta-property, indicates what constructed it, and is often `undefined` 
    * can create `static` methods/properties that are added to the class' function object, not the prototype

#### Async Flow Control
- Promises do not replace callbacks but better manage them 
    * if you resolve a promise, the resolved promise will take on the previous promise's state
    * use `Promise.resolve()` to create thenable wrappers of promises, as shorthand
    * `Promise.all([])` will fulfill immediately, and `Promise.race([])` will hang forever
- Generators + Promises

#### Collections
- `TypedArrays` provide structured access to binary data using array-like semantics, type referring to view layered on top of bucket of bits, mapping to either 8, 16, ... bit signed integers
    * the view is mapped using the endian-setting (big or little) of the platform JS is running on
        * means if low-order byte of a multi-byte number is on right or left of number's bytes
    * important to know endian-ness of both producer and consumer, and most browsers are little endian
    * will wrap values if greater than its bit value and may cause problems
    * way to check in js snippet below
```javascript
var littleEndian = (function() {
	var buffer = new ArrayBuffer( 2 );
	new DataView( buffer ).setInt16( 0, 256, true );
	return new Int16Array( buffer )[0] === 256;
})();
```
- `Maps`, can use `entries()` or `values()`, `keys()`
    * will keep reference of key to prevent GC, so we have other data structures
    * usually, if you try to use an object as a key, will turn into `[object Object]` which will overwrite multiple objects used as keys 
- `WeakMaps` take only objects as keys, no size property or `clear()` method, or any other iterators
    * useful when you don't have full control over the object you're storing, such as a DOM element 
    * only GC's for weak **keys**, not values
- `Sets` are a collection of unique values (duplicates are ignored)
    * similar to `Map` in API, but most useful for its uniqueness
    * does not allow coercion, so `1 != "1"`
- `WeakSets` holds values weakly (there are no keys)
    * must be objects, where as Set can have primitive values

#### API Additions
- `Array.of` creates an array with the arguments passed in, useful if you want to subclass `Array`
- `Array.from` will clone from an iterable and never creates empty slots, always with `undefined`, second param is optional callback to `map` values while iterating, and third param is `this` binding
- `copyWithin` will copy (target, from start, to optional end index). If negative, go abckwards from end of array
- `fill` will fill with (value, from start, to finish)
- `find` will find value that matches callback and returns that value, similar for `findIndex`
    * `indexOf` limitation is that we cannot override strict equality check
- `Object.is()`, more strict comparison for strictly identifying `NaN` or `-0 vs. 0`
- `Object.getOwnPropertySymbols()` for only getting metadata of an object
- `Object.setPrototypeOf` will set `[[Prototype]]` of first object to second as prototype for behaviour delegation
- `Object.assign()`, target from sources and non-enumerable + non-owned properties are excluded from assignment
- More `Math` operators for optimization
- `Number` adds `EPSILON`, `MAX_SAFE_INTEGER`, and `MIN_SAFE_INTEGER`
    * `isNaN`, `isFinite` omits coercion
- `String` has more unicode support
    * `startsWith`, `endsWith`, `includes`, `repeat`

#### Meta Programming
> code inspecting/modifying itself, or code modifying default language behaviour to affect other code
- function names, are they the lexical binding name `function foo()` or the `name` property
    * it is the `name` property and will be used in stack traces
    * through inference, we have a couple answeres
        * constructor name is class name
        * `baz: () =>` will be name: baz
        * `get qux()` will be name: get qux, same with set
        * `o.foo.bind(o);` is name: bound foo
        * `(function(){}.bind(o))` is name: bound
        * `export default function(){}` is name: default
        * `new Function()` is name: anonymou
        * `function*(){}.__proto__.constructor` is name: anonymous
- Meta properties, like `new.target` are used for inferences as well
- Well Known Symbols (WKS) expose special meta properties
    * `Symbol.iterator` can be used to redefine our object's iterator
    * `Symbol.toStringTag` and `Symbol.hasInstance` can be used to override the `toString()` and `instanceof` methods
    * `Symbol.species` controls which constructor is used by built-in methods that needs to spawn new instances
        * should use `new this.constructor[Symbol.species](..)` to override
    * `Symbol.toPrimitive` to indicate to object how to coerce value when using `==` or `+` addition
    * for regex matching, there are `Symbol.match`, `Symbol.replace`, `Symbol.search` and `Symbol.split`
    * `Symbol.isConcatSpreadable`, boolean, to indicate whether to flatten on concat or leave separate
    * `Symbol.unscopables`, only for keyword `with` which is deprecated
- Proxy wraps another normal object and can intercept regular behaviour to substitute with others
    * always used with `Reflect` to get the inner object's value
    * not all are yet available
    * can create a `Proxy.revocable` if you would like to stop the proxy later on with `prevoke()`
    * patterns use proxy first (untrusted area), or proxy last (catchall cases)
- can simulate circular references via proxies
- `Reflect` API is an object with static methods that are used to apply properties from one object to another via some passed params
- property ordering has now been spec'd in ES6 and will have a consistent output of numbered index > strings in created order > symbols in created order
- Feature testing, often used for testing for the need of polyfills and can determine what files to load based on the runtime environment
    * called split delivery
- Tail-call Optimization (TCO) to reduce number of stack frames used in memory
    * tail call is a `return` statement with a function call, where nothing happens after the call except returning the value
    * optimization only applicable in `strict` mode
    * will reuse the stack frame because none of the other state is required to return
    * can either refactor to use TCO, or use trampolining which is a technique for reusing stack frame via a `while` loop

#### Beyond ES6
- `async function` is syntactic sugar for generators + promises + the `run()` pattern
- `Object.observe()`, binding for add, update, delete, reconfigure, setPrototype, preventExtensions
- Exponentiation `**` operator, like in Python, Ruby, Perl
- `Array.includes()` for finding a value in an array and returning a boolean instead of the `indexOf`
- SIMD
- WebAssembly (WASM)