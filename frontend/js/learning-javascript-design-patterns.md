# Learning JavaScript Design Patterns
[ref](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)

- Constructor pattern
  - ways to create object: `var a = {}; var a = Object.create(Object.prototype); var a = new Object();`
  - if we add a property to the class' prototype, we can define it a single time to be shared across instances
- Module pattern
  - similar to object literal syntax
  - module pattern enables privacy and organization via closures
    - only public APIs are available
    - no real sense of privacy as there are no access modifiers, but there is function scope to emulate the behaviour
  - created with an IIFE
  - can import other libraries into our modules by passing them as params to the IIFE
  - disadvantages are that testing can be challenging, and private members are hard to modify as all public methods must be changed instead
- Revealing Module pattern
- Singleton pattern
  - may want to re-evaluate design, at least in js
- Observer pattern
  - use an array to contain list of observers
    - `add`, `count`, `get`, `indexOf`, `removeAt`
  - observer function has `this.update`
  - pub/sub different from observer because there's no extra layer in the middle for decoupling
- Mediator pattern
- Prototype pattern
- Command pattern
- Facade pattern  
  - need to look at cost of performance over abstraction
- Factory Pattern + Abstract Factory pattern
  - use `SuperObject.call(this, ...)` inside constructor function of SubClassObject
  - set the prototype of subclass to be `Object.create(SuperObject.prototype)`
- Mixins
  - borrow functionality from other objects with minimal amount of complexity
  - allows multiple inheritance
  - can use the `_.extend()` to graft mixins on to other prototypes
    - `_.extend( CarAnimator.prototype, myMixins );`
- Decorator Pattern
  - requires some effort to implement as there are no true interfaces in js
  - would have to create an extend function that adds new props if they don't already exist
- Flyweight Pattern
  - create a smaller version of an entity for easier processing, both intrinsic and extrinsic
  - to be more memory efficient with large objects
- MVC Pattern
  - controllers facilitate Strategy pattern in the view
- MVVM Pattern
  - view-specific subsets of a model which can contain state and logic
  - extra manipulation of data for model may cause complexity and performance challenges

skimmed rest of document