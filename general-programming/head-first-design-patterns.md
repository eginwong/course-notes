# Head First Design Patterns by O'Reilly

## Welcome to Design Patterns
- general idea: take what varies and encapsulate it so it will not affect other areas of code
- DESIGN PRINCIPLE(DP): Identify aspects of your app that vary and separate them from what stays the same
- DP: Program to an interface, not an implementation
- classes are often entities with state and behaviour but you can create classes to represent behaviours as those can have states too
- in essence, using something for dependency injection to swap out implementation at runtime
- DP: Composition over inheritance
- **Strategy Pattern**: defines family of algos, encapsulates each one, makes them interchangeable. Lets algorithm vary depending on client that uses it

## Keeping your Object in the know: Observer
- Publishers and Subscribers
- **Observer Pattern**: defines a one-to-many dependency between objects so that when one object changes state, all of its dependents are notified and updated automatically.
- DP: Loosely coupled designs between objects that interact
- interface <Subject> { registerObserver(Observer o); removeObserver(Observer o); notifyObservers(); }
- program to an interface when possible to extend and be less coupled

## Decorating Objects: Decorator
- inheritance is change at compile-time while composition is change at run-time
- DP: Classes should be open for extension but closed for modification.
- decorators have same supertype as objects they decorate
- decorator adds its own behaviour before and/or after delegating to the object it decorates to do the rest of the job
- **Decorator Pattern**: attaches additional responsibilties to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality. 
- decorators implement same interface or abstract class as component they decorate
- decorators hold an instance variable of the thing that it is wrapping
- we use inheritance to get *type matching* but not for behaviour, which is left to composition 
- downside is the overwhelming number of classes

## Baking with OO goodness: Factory
- using `new` would be programming to a concrete implementation 
- not truly a design pattern, good to decouple creation of objects away from client code
- factory method handles object creation and encapsulates it in a subclass.
- **Factory Method Pattern**: defines an interface for creating an object, but lets subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.
- There is a Creator object that calls factoryMethod() on a concrete implementation to create products from a Factory object that is made concrete
- DP: Depend upon abstractions. Do not depend upon concrete classes.
  - no variable should hold a reference to a concrete class (use a factory)
  - no class should derive from a concrete class
  - no method should override an implemented method of any of its base classes
- Abstract Factory provides an interface for a family of products (like a total set of ingredients instead of the individual/singular pizza)
- **Abstract Factory Pattern**: provides an interface for creating families of related or dependent objects without specifying their concrete classes.
  - often have factory methods within a subclass of the abstract factory class
- factory method decouples through inheritance
  - subclass and override factory method
- abstract factory decouples through object composition   

## One of a Kind Objects: **Singleton**
- Singleton Pattern: ensures a class has only one instance, and provides a global point of access to it.
- can have double-checked locking (`volatile`, synchronizing only on retrieval), static instance variable of the Singleton, or not do anything

## Encapsulating Invocation: Command
- all command objects implement the same interface, `public void execute()`
- **Command Pattern**: encapsulates a request as an object, thereby letting you parameterize other objects with different requests, queue or log requests, and support undoable operations.
-  Invoker holds a command and asks command to carry out request by calling `execute()`
-  Command has `execute()` and `undo()` methods
-  `execute()` invokes the action(s) on the receiver 
-  decouple objects that know how to perform the requests from objects making the request

## Being Adaptive: Adapter and Facade
- **Adapter Pattern**: converts the interface of a class into another interface the clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.
- there's object adapters (composition), and class adapters (requires multiple inheritance)
- Decorator doesn't alter the interface but adds responsibility
- Adapter converts one interface to another
- Facade makes an interface simpler
- **Facade Pattern**: provides a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.
- DP: Principle of Least Knowledge - talk only to your immediate friends. same as Law of Demeter

## Encapsulating Algorithms: Template Method
- **Template Method Pattern**: defines the skeleton of an algorithm in a method, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing its structure.
- hooks are included to insert functionality at key areas of the template method process, conditionally
- DP: The Hollywood Principle: Don't call us, we'll call you.
- similar to Strategy but done via inheritance

## Well-managed Collections: Iterator and Composite
- **Iterator Pattern**: provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
- DP: A class should only have one reason to change.
- **Composite Pattern**: allows you to compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.
- can treat individual objects and compositions uniformly, like menus and submenus
- need an abstract class to be the base component for both tree and leaf nodes
- for iterator + composite, will need to create a composite iterator (stack to keep track of stack)
- for a menu / tree structure

## The State of Things: State
- instance variable for holding current state
- for each action, prepare responses for each state
- define state interface and implement classes for each state
- **State Pattern**: allows an object to alter its behavior when its internal state changes. The object will appear to change its class.
- Context contains state object, which is implemented by concrete classes
- Similar to Strategy pattern but differ in intent

## Controlling Object Access: Proxy
- Remote Method Invocation (RMI) is a way to find objects in a remote JVM and to invoke their methods
- write interface, write implementation and `rmic` will generate stub and skeleton for you
- must start `rmiregistry`
- then start the server
- `RemoteException` and `extends UnicastRemoteObject implements <RemoteInterface>`
- ensure any objects passed are primitives or serializable
- a lot of this is outdated
- `transient` indicates that there is no need to serialize the field, but may cause issues once its been serialized and transferred
- **Proxy Pattern**: provides a surrogate or placeholder for another object to control access to it.
- Proxy holds a reference to real object, and clients interact with proxy to access real object
  - proxy and object implement the same interface
- Protection Proxy, where proxy class is generated by Java at runtime
  - create InvocationHandlers, interface and one to implement it
  - through use of Reflection API

## Patterns of Patterns: Compound
- Model-View-Controller makes use of Strategy, Observer, and Composite patterns

## Patterns in the Real World
- DP: A pattern is a solution to a problem in a context.
  - solution is a general design that anyone can apply which resolves the goal and set of constraints
- creational patterns, behavioural patterns, structural patterns
- Class patterns -> done through inheritance, at compile time
- Object patterns -> done through composition, at runtime
- Thinking in patterns
  - KISS
  - think through consequences of your choice of pattern if used
  - commit to using patterns if it solves the specific problem that you have and are okay with the tradeoffs
  - if you don't need it now, don't do it now
  - use the shared vocabulary
- DP: An Anti-Pattern tells you how to go from a problem to a BAD Solution

## Appendix
- **Bridge Pattern**: to vary not only your implementations, but also your abstractions.
  - adds complexity
  - useful when running graphics on multiple platforms
  - vary interface and implementation in different ways
- **Builder Pattern**: encapsulate the construction of a product and allow it to be constructed in steps
  - encapsulates the way a complex object is constructed
  - allows objects to be built multistep
  - used for composite structures
  - requires more domain knowledge than Factory for object creation
- **Chain of Responsibility**: when you want to give more than one object a chance to handle a request
  - decouples sender and receivers
  - add/remove responsibilities dynamically by changing order of chain
  - execution of the request isn't guaranteed
  - hard to debug
- **Flyweight Pattern**: when one instance of a class can be used to provide many virtual instances
  - reduces number of object instances at runtime, saving memory
  - centralizes state for many "virtual" objects into a single location
  - all object instances will be controlled identically
- **Interpreter Pattern**: to build an interpreter for a language
  - representing each grammar rule in a class makes the language easy to implement
  - appropriate for simple grammar and simplicity more than efficiency
- **Mediator Pattern**: to centralize complex communications and control between related objects
  - increases reusability of objects supported by the Mediator by decoupling from the system
  - Mediator object can easily become overly complex
- **Memento Pattern**: when you need to be able to return an object to one of its previous states; for "undo"
  - easy-to-implement recovery capability
  - Memento is used to save state
  - process can be time-consuming
- **Prototype Pattern**: when creating an instance of a given class is either expensive or complicated
  - hides complexity of making new instances from client
  - copying an object can be more efficient than creating a new one
  - drawback is clones may be expensive and complicated to perform
- **Visitor Pattern**: when you want to add capabilities to a composite of objects and encapsulation is not important
  - Client will call Visitor object, which in turn knows how to traverse the Composite object to call `getState()` on each object of the hierarchy
  - changes to the composite structure are more difficult
  - encapsulation is broken when the Visitor is used
