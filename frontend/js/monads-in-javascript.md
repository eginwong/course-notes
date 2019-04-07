# Monads in JavaScript
[ref](https://curiosity-driven.org/monads-in-javascript)

@reread

- monad is a design pattern to describe computations as a series of steps
  - used to manage side effects
  - used in multiparadigm languages to control complexity
  - wrap types giving additional behaviour
  - requires three components:
    - type constructor, creates a monadic type for the underlying type, i.e., from `number` to `Maybe(number)`
    - unit function, wraps value of underlying type into a monad, i.e., can wrap `2` into `Maybe(2)`
    - bind function, chains operations on a monadic value
      - note, not the same as js `bind`
  - obey three monadic laws:
    - `bind(unit(x), f) ≡ f(x)`
    - `bind(m, unit) ≡ m`
    - `bind(bind(m, f), g) ≡ bind(m, x ⇒ bind(f(x), g))`
    - says that `unit` is a neutral element, `bind` should be associative (order of binding shouldn't matter)
- example of monad in TypeScript
```js
interface M<T> {
​
}
​
function unit<T>(value: T): M<T> {
    // ...
}
​
function bind<T, U>(instance: M<T>, transform: (value: T) => M<U>): M<U> {
    // ...
}
```
- Identity monad wraps a value
- Maybe monad is similar to the Identity monad but can represent absence too
  - when passed `Nothing`, it will propagate and short-circuit other calculations
- List monad represents a lazily computed list of values
  - unit function takes one value and returns a generator that yields that value
- Continuation monad is used for async tasks, use of Promises