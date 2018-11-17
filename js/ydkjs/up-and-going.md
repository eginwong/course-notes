### Up and Going:
[ref](https://github.com/getify/You-Dont-Know-JS/blob/master/up%20&%20going/README.md#you-dont-know-js-up--going)

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