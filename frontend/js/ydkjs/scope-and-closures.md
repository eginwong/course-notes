### Scope & Closures:
[ref](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/README.md#you-dont-know-js-scope--closures)

- Compilers do: tokenizing -> parsing (into Abstract Syntax Tree) -> Code Generation
- For RHS lookups, will get reference errors. For LHS lookups not in strict mode, will create a global scope variable
- Good reference material [on scope and context and this](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)

#### Lexical Scope
- defined as the scope defined at lexing time - where variables and blocks of scope are authored when the lever processes the code, WHERE FUNCTION IS DECLARED
- Scope lookups stop once they find the first match
- Cheating lexical scope leads to poorer performance, but can be done through `eval()/setTimeOut()/setTimeInterval` as if you programmatically wrote code or `with`, which creates its own separate lexical scope. “Var” inside with will be in containing scope, can lead to weird side effects to the global scope
- `with` and `eval` will stop the javascript engine from optimizing because it can have no idea about the contents of the code so it cannot optimize. 
- In strict mode, `eval` has its own lexical scope and will not affect the scope around it

#### Function vs. Block Scope
- Function-based scope
- Keeps values enclosed and `hidden` from the outside world
- Helps collision avoidance
- Use IIFE for functional expressions
- Anonymous function expressions can be hard to debug as there’s no label, and leaves documentation lacking
- Catch creates its own block scope but otherwise, js doesn’t have a built-in concept of block scoping
- Adding explicit blocks `{}` can allow for garbage collecting, note that `let` doesn’t get hoisted. `const` also creates a block-scoped variable
- `var` is function scope, `let` and `const` are block scopes

#### Hoisting
- Declaration is done in the compilation phase, assignment during execution phase
- Function declarations are hoisted, but not expressions
- Functions are hoisted first before normal variables
- Any functions within blocks normally get hoisted to enclosing scope

#### Scope Closure
- closure is when a function can remember and access its lexical scope even when function is executing outside of its lexical scope
- callback functions are often examples of closures, or whenever you treat functions as a first-class citizen
- in for loops with closures, may need to use IIFEs and ensure that there is a new scope per iteration of the loop. Or you could use let and it will be declared for each iteration
- Can use module-like pattern and expose an object from a function that has references to other functions, sort of like a public api of sorts
- outer function must be invoked at least once, and must return back at least one inner function to access closure and private scopes
- ES6 syntax for import/export of modules must be in their own files now
- Dynamic scope is runtime, and cares where it’s called from, lexical scope is where the function was declared
- Arrow functions take the immediate lexical enclosing scope, which is different from the usual. No need to do “var self = this;” to bind functions to its own lexical scope
- This.count++, and then have a “bind(this) on the end of the function, to bind to enclosing lexical scope
