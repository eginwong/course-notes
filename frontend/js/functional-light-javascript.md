# Functional-Light JavaScript
[ref](https://github.com/getify/Functional-Light-JS)

## Functions
  - procedures (instructions with or without a `return`)
  - functions (always input output)
  - arity is the number of parameters in a function declaration
    - can check by using `<function_name>.length`
    - default params do not count as a param in .length
    - destructured also do not count in .length
    - rest operator also does not count in .length
    - avoid `arguments` if at all possible
  - destructuring allows us to name our ...args if needed
  - strive for declarative self-explanatory code
  - return a single value
  - aim for pure functions and not side-effects
  - naming functions is generally better for stack trace and recursion tracing
    - NAME EVERY SINGLE FUNCTION

## Managing Function Inputs
- can create a `unary` helper that forces functions to only read the input as a single one
  - i.e., `parseInt(int, radix)` but you may want to only apply `parseInt` on the int multiple times like over a `map` function
- `identity` function which returns a non-empty value
- `constant` helper will return the same value but as the output of a function as required by certain APIs, i.e., `then` of a `Promise`
- `spreadArgs` or `apply` which spreads an array into the number of required parameters as an adapter to non-unary functions
- `gatherArgs` or `unapply` is the opposite where you take multiple params and squish them into an array
- currying specifically takes the first arg and returns a function expecting second arg only
- partial application/currying allow you to split up when and how the function will be called
- point-free coding (chain functions without declaring any param variables) is preference

## Composing Functions
- `pipe` is l-r, `compose` is r-l
- composition helps to separate the how from the what of a function

## Reducing Side Effects
- add mental burden to the reader of the code
- fixed variable assignments do not add side effects

## Value Immutability

## Closure vs Object
- the two are very similar
- isomorphic, can be translated from A to B and back to A without loss
- closures are generally not mutable
- objects are more easily cloneable

## Recursion
- mutual recursion is useful for something like odd and even leaf nodes
- recursion is declarative and allows the looping logic to be abstracted as it is handled implicitly
- tail call optimization eliminates need for extra stack frames on the call stack because it is known that those functions are called at the completion of the previous call in recursion
- proper tail call optimization involves returning only the function `return num()`. If there is any other operation, that forces the engine to retain the stack frame
  - refactoring may be required but that may cause a loss in readability
- alternatives are trampolining (returning right away but creates closures that consume memory on heap) or continuation passing style, which is clunky and also creates closures

## List Operations
- `map` are eager to perform the transformations, as opposed to streams
- a `functor` is a a value that has a utility for using an operator function on that value
  - like `map`
- `filter` returns values that evaluate to `true`, so we filter in
  - the condition is called the `predicate function`
  - maybe add semantic definitions for `filterIn` and `filterOut`
- `reduce` is super powerful
  - can implement `filter` or `map` with it
- `flatMap` for flattening aggregations
- `zip` to include two lists intermingled into sublists of both
  - ignores leftover values
- `merge` interleaves the two lists into one big list
- always check if you're making the code more or less readable

## Functional Async
- may be confused with FRP but essentially lazy-evaluation or streams of data
- rxjs or observables

## Putting it All Together
- glossed over, but lots here to unpack for later

## Appendix: Transducing
- a composable reducer
  - improves performance because you don't chain `filter` or `map` when you don't need to

## Appendix: The Humble Monad
- monad is a value type
- monad is a functor
- it's a type/data structure that allow its value to be predictable
- more like an interface
  - identity monad
  - io monad
  - maybe monad
- must satisfy specific interfaces to be considered a monad
- ` chain` flattens and maps, like a `flatMap`
- `ap` applies the monad to another function when needed
- how you organize behavior around a value in a more declarative way

## Appendix: FP Libraries