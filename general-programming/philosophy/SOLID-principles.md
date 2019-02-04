# SOLID PRINCIPLES

Object-Oriented Design

## Single Responsibility Principle
- high cohesion
- behaviours are highly related and strongly focused

## Open Closed Principle
- extend classes behaviour without modifying it
- open to extension, closed to modification
- usage of polymorphism

## Liskov Substitution Principle
- functions that have pointers to base class must be able to use its derived classes without knowing it
- if an override method does nothing or just throws an exception, probably violating LSP
- don't want to account for special cases in code that makes use of the interface of your abstract base class

## Interface Segregation Principle
- don't be forced to depend on interfaces unused
- leads to coupling
- Do I need all the methods on this interface that I'm using?

## Dependency Inversion
- high level modules should not depend on low level modules
- only knows about abstractions