# Java The Complete Java Developer Course


## Introduction
- Configure IntelliJ: 
    * Editor > General > Auto Import > 
        * Add unambiguous imports on the fly
        * Optimize imports on the fly
    * Editor > General > Code Folding > 
        * Uncheck "Closures"
        * Uncheck Generic constructor and method parameters

## Primitive Data Types
- byte: -128 to 127, width of 8
- short: -32768 to 32767, width of 16
- int: -2147483648 to 2147483647, width of 32
- long: ..., width of 64
- float: floating points, 7 digits of precision, width of 32
- double: floating points, 16 digits of precision, width of 64
- char: width of 16
- boolean
- String, will concat numbers instead of adding them

## Operators
- assignments in if conditions evaluate to what is assigned 
    * `if(booleanVal = true)` will evaluate to true

## Keywords and Expressions
- keywords: reserved words for the system
- expression: variables + values + operators, but not datatype, semicolon, brackets and {}

## Method Overloading
- same method name, different number of parameters

## OOP Part 1
- inheritance means extending from a base behaviour
    * super calls parent constructor
    * use `@Override` to override functionality of base behaviour
- super is for method overriding, and this call is to call a constructor from another overloaded constructor

## OOP Part 2
- Inheritance "is-a" relationship
- Composition "has-a" relationship
- Encapsulation: make private variables that others should have no access to
- Polymorphism: same method on different inherited classes that have different behaviour

## Inner Classes
- Improves encapsulation, and only let the outer class to manipulate the inner class
- Anonymous class: not actually defining class but only within the method as an input parameter

## Abstract Classes
- defining what needs to be done but not how
- can declare instance variables, and define certain methods, have a constructor
- interfaces must be static, and variables must be `public static final`
- interfaces can be implemented by many unrelated classes
- interfaces good for separating different behaviour

## Generics
- Use `<>` to determine the type of the object, especially those from Collections

## Scope
- all methods in interfaces are public
- protected is package-private but also in subclasses in other packages as well
- package-private is the default
- classes that are final cannot be subclassed

## Collections
- have to implement the `compareTo` and then run the `Collections.binarySearch`
- `Collections.reverse`
- `Collections.shuffle`
- `Collections.min` and `max` and `swap`
- `Collections.unmodifiableMap`, but individual items can still be modified

## Hash and equals
- any objects that are equal must have same hash code
- but any objects with same hash code are not necessarily equal

## Sets
- `retainAll()` will run an intersection
- asymmetric vs symmetric differences

## Testing
- Parameterized testing, can set `@Parameterized.Parameters` and `RunWith(Parameterized.class)` with constructor of the test class with the data for input

## Concurrency/Threads 
- process is a unit of execution with its own memory space (heap)
- thread is unit of execution within a process
    * always has one, as the main thread
    * thread shares the parent process' files 
- `extends Thread`, override the run(), start the thread
- Second way of making thread is `Runnable` which you put as argument to `new Thread(runnable)` instantiation
- if you call `run()` method directly, execution is done on the main thread
- `join()` will wait for the previous thread to finish before continuing
- object instance variables are stored on the heap, so threads can interfere with one another
- can use `synchronized` to only allow one thread to work at a time, or can apply a lock
- don't use local variables to synchronize thread executions
- `notifyAll()` wakes up all waiting sleeping threads
- `ReentrantLock` to `lock()` and `unlock()`
- best to use `try ... finally` for safety
- Can look at `ExecutorService` to manage our threads
- deadlocks occur when one needs two and two needs one and they explode
- livelock is when both threads are not stuck but not completing their tasks - just waiting for each other to finish their work
- thread can be suspended when writing long and double because of float
- `volatile` keyword says not to read from CPU cache and always from main memory

## Networking
- TCP/IP
    * `ServerSocket` and `Socket` for server and client communication
    * needs to be multi-threaded when dealing with multiple clients
- UDP

## Transactions
- ACID
    * Atomic: all or none
    * Consistency: valid state
    * Isolation: until changes are committed, nothing is visible to others
    * Durability: changes are still there 
- `Connection.setAutoCommit(false)` and then once finished, `Connection.commit()` or `Connection.rollback()` as necessary and then finish with setting auto commit back to true

## Java Module System (9)
- module is a container of packages
- needs name, input, outputs
- imports modules and exports packages
- scalable, moving from monolothic runtime
- improves security and performance
- requires, exports, provides, uses, opens
- named or unnamed modules
- module will `require` any other packages
- add `requires transitive` if parent dependency also has same dependency as child dependency to a third module