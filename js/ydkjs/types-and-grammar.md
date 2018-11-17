### Types & Grammar
[ref](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20&%20grammar/README.md#you-dont-know-js-types--grammar)

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
