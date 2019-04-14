# Design Patterns for Humans
[ref](https://github.com/DanielASAndrews/design-patterns-for-humans)

## Creational Design Patterns
- simple factory: generates an instance for client without exposing any instantiation logic to the client
  - use when creation is not as straightforward and involves some logic
- factory method: delegate instantiation logic to child classes
  - used when client doesn't know exact sub-class it might need
- abstract factory: factory of factories; factory that groups the individual but related/dependant factories together without their concrete classes
  - use when inter-related dependencies with not-simple creation logic involved
- builder: allows creation of different flavours of an object without constructor pollution
  - use when creation is multi-step process
- prototype: create objects based on existing object through cloning
  - use when creation would be expensive vs cloning
- singleton: only one object of a particular class ever created

## Structural Design Patterns
- adapter: wrap otherwise incompatible object in an adapter to make it compatible with another class
- bridge: preferring composition over inheritance; implementation details pushed from a hierarchy to another object with a separate hierarchy
- composite: lets clients treat individual objects in a uniform manner
- decorator: lets you dynamically change behaviour of an objecta t run time by wrapping them in an object of a decorator class
- facade: provides a simplified interface to a complex subsystem
- flyweight: used to minimize memory usage or computational expenses by sharing as much as possible with similar objects
- proxy: class represents the functionality of another class

## Behavioural Design Patterns
- chain of responsibility: helps building a chain of objects, request enter and keep going through until an object is provided the suitable handler
- command: encapsulates actions in objects. Provide means to decouple client from receiver
- iterator: presents way to access elements of an object without exposing the underlying presentation
- mediator: adds a third party object to control interaction between two objects; reduces coupling between classes communicating with each other
- memento: capturing and storing current state of an object in a manner that it can be restored later, smoothly
- observer: defines dependency between objects so that whenever an object changes state, all dependents are notified
- visitor: add further operations to objects without modifying them 
  - separating from having to add actual behaviour to initial object
- strategy: allows you to switch the algorithm or strategy based upon the situation
- state: lets you change behaviour of a class when state changes
- template: defines skeleton of how algorithm could be performed, but defers implementation to children classes