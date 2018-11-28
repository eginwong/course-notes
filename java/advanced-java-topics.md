# Advanced Java Topics

## OO
* polymorphism:
    * compile-time is overloading (same name of method signature but different parameters)
    * run-time is overriding (the regular way you would think about polymorphism)

## Generics
* main idea of generics is pretty simple, but is only useful at compile time
* used to abstract out data types and to help reuse and maintain code
    * often in data structures and algorithms
    * abstract classes
    * collections object, or entry/key in hashmaps
* due to _type erasure_, the generic will be replaced with an `Object` at runtime which: 
    * can lead to two generic methods/constructors looking the exact same. 
    * does not allow the use `instanceof` because the type will be removed
    * in Java specifically, did not allow for primitives to be used as Generics, which would then require using the wrapper and using lots of un/boxing
    * can't declare an array of generics
* can be used with constraints like `extends` or `super`
    * `extends` means only subclasses can be implemented
    * `super` means only superclass can be the parameter type
* Follow the idea of PECS, **p**roducer **e**xtends, **c**onsumer **s**upers
* wildcard `?` is when the type parameter is not of interest of the generic class
* type inference: by reading the parameter declaration in the instantiation, can infer to reduce typing

## Threading

## Memory Management
* Memory is managed by the JVM as developers don't need to explicitly reference and de-reference memory in the code
    * having the Garbage Collector (GC) handle the removal of stale references
* GC will look at heap memory and identify which objects are no longer used and then remove them
    * removes the burden of manual memory de/allocation
    * in order for GC to operate, all other threads must be stopped and the application will freeze momentarily
* **Stack** is part of memory that maintains nested method calls down to current position of program and contains all local vars and references to objects in the heap in executing methods
    * allows for runtime to be able to return to method knowing the address from where it was called and to clear local vars after finishing method
    * every thread has its own stack
    * stores primitives + references to objects in the heap
    * LIFO acces -> Eden space -> GC -> S1 -> 2nd GC -> new objects go to S2, S1 to S2 -> clear Eden + Ss to memory
    * if OOM, `StackOverFlowError`
    * fast, thread-safe, and automatically de/allocated
    * static memory allocation
* **Heap** is large bulk of memory that stores allocation of objects
* generational GC approach uses various divisions in the heap to store things by age
    * generally, the newest references are the shortest-lived
    * age is determined by how many GC cycles have been survived
    * this makes scanning for unused references more efficient and optimal
    * **young gen** hosts most of newly created objects 
        * Eden space and survivor 1 and survivor 2 spaces
    * **old gen**, larger in size and GC occurs less frequently here
    * **perm gen** contains metadata required by JVM, includes string pool classes, methods, platform library, populated at runtime
    * dynamic memory allocation
    * not thread-safe and requires synchronization
* Example [ref](https://www.baeldung.com/java-stack-heap):
```java
public static void main(String[] args) {
    int id = 23;
    String pName = "Jon";
    Person p = null;
    p = new Person(id, pName);
}
```
* stack space created for primitive -> String added to String pool and reference stored in stack, reference p for Person is created in stack and new stack created for constructor with `this` reference, primitive, and String reference variable 
* GC steps:
  1. new objects
  2. next GC, will alternate clearing Eden + one survivor space and storing in the other
  3. Will then move any particularly old objects to old gen
  4. For every major GC, several minor GCs 
> object is eligible for GC if not reachable from any live threads or by any static references
    * removed if cyclic reference, null references, parent ref is null so all children die as well
* dev cannot force GC but can send request to JVM like `System.gc()` and `Runtime.gc()` but not guaranteed
* GC implementations:
    * Serial GC: single thread, freezes all app threads when runs, for client-style machines
    * Parallel GC: default, uses multiple threads for managing heap space
    * CMS GC: Concurrent Mark Sweep, multiple GC threads that prefer shorter GC pauses, usually respond slower on average but do not stop to perform GC
    * G1 GC: replaces CMS collector as its more performant, post JDK7, global marking and attacks the empty sections of partitioned heap first
* If no more heap space for new objects, you get `OutOfMemoryError` heap space
* when objects are eligible for GC, GC runs a `finalize` method on it. Guaranteed to run only once. 
    * in the method itself, can resurrect the object by assigning it to a static field but if eligible once again, would be GC'd without calling the `finalize` method again
* Strong reference is an assignment and not at all eligible for GC
* soft reference can be created via `new SoftReferece<>()` which is only retrieved at last resort
* weak reference is created similarly and would always get GC'd at next cycle
* phantom reference is simlar to weak reference but are enqueued for GC as soon as objects are collected. Can poll reference queue to know when object is collected

## Memory Leaks
* objects in heap that are stale but GC cannot remove them from memory
* spontaneous crashes, severe perf degradation after long time, OOM, running out of connection objects
* causes:
    * static fields, try to reduce as they live throughout the lifetime of the app and blocks resources
        * when using singletons, lazy load instead of eager load
    * unclosed resources, always use finally to close resources and finally should have no exceptions
        * look at `try-with-resources` block
    * improper `equals()` and `hashCode()` implementations
        * will create new objects instead of referring to the same unique entry in HashMap/Set
        * try to always override for new entities
    * inner class that raferences outer class, will not be GC'd so consider using a static inner class
    * overriding finalizers incorrectly
        * don't touch them if you can help it
    * interned strings, by calling `intern()` will go to string pool located in permgen and stay there for application lifetime
        * use Java 7 onwards
        * increase PermGen space if working with large Strings
    * using `ThreadLocals` (each thread holding ThreadLocal variable of own copy) can be an issue when threads are reused in pools
        * can clean up using `remove()` 
        * do not use `ThreadLocal.set(null)` to clear the value

## Finalize Method
[ref](https://www.baeldung.com/java-finalize)
* meant to release resources used by objects before they're removed from memory
* avoid as different JVM implementations will be an issue with portability
* has perf cost as it requires more work when non-empty finalizer
* deprecated in JDK9

## String and StringBuilder
* String is stored as char[] value field and int hash field
* value field is an array of chars representing the string itself, and hash is calculated from hashCode() call and cached
    * if hashcode is zero, will be recalculated each time the hashCode() is called
* String is immutable and cannot modify underlying char[] array
* static constant strings are loaded/cached in string pool and will be represented by a single instance at runtime
* `StringBuilder` is a mutable data structure and can handle manipulation better
    * String concatenation would copy both strings into a new object, which incurs large GC overhead if modifying in a loop
* `StringBuffer` is thread-safe but `StringBuilder` in a single thread is fine

## Hashing
* Objects that are equal according to their `equals()` must return the same hash code
* `hashCode()` must consistently return the same value on objects that have not been modified from one execution to another
    * two objects with same hash may not be equals, but objects that are equal MUST have the same hash
    * primes help to achieve unique-ness when calculating a hash
* to deal with collisions, Java's HashMap uses separate chaining, which stores value in a linked list

## Access Modifiers
1. private
2. default (package)
3. protected
4. public

* no private or protected outer classes
* private: only code inside the same class can access the var or call the method, no subclasses or external class can access
* default has no modifier and class inside itself as well as code inside the same package can access
    * if in same Java package, subclass can access otherwise it cannot
* protected means subclass can access default access modifier, even if subclass is not in the same package 
* public means that everyone can access
* class modifier takes precedence over other levels
* interfaces are always public, they cannot include other access modifiers
* for subclasses, cannot decrease visibility of parent but can increase it, i.e. go from protected or default to public

## Type System
* java.lang.Object is the top of the class hierarchy in Java, only primitives and lambdas do not inherit from it
* byte: signed 8-bit value
* short: signed 16-bit value
* char: unsigned 16-bit value
* int: signed 32-bit value
* long: signed 64-bit value
* float: 32-bit single precision floating-point
* double: 64-bit double precision floating-point
* abstract vs. interface: abstract needs to be subclassed, interface defines capability and can have multiple interfaces
* inner class vs static nested class is that inner class requires that the outer class be instantiated first
* `equals()` for object reference and `==` is for sameness, for primitives. can use either for enums
* marker interface is one that has no methods, to signify a property i.e. `Serializable`, `Cloneable`, `Remote`
* FunctionalInterface is only for one single abstract method, default methods do not count

## Annotations
* are metadata bound to elements of source code that serve as info for compiler, compile-time/deployment-time processing, runtime processing
* can specify `@Target` to tell the compiler where the annotation should actually go