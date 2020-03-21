# Java Concurrency in Practice

## Introduction
- threads share same memory address space of their owning process, and all threads access the same variables and allocate objects from the same heap
- frameworks can create threads for you so beware

## Fundamentals
### Thread Safety
- if there is mutable state being touched across threads, fix it by: making data immutable, not sharing data, and synchronization of access
- OO is good for thread-safety classes
- class is thread-safe if it behaves correctly when accessed from multiple threads, with no addtional synchronization or other coordination from calling code
- stateless objects are always thread-safe
- use atomic variables if required to ensure integrity
- synchronized has performance impacts so use sparingly

### Sharing Objects
- by synchronizing, we also make the memory visible across threads
  - without it, re-ordering may occur, to optimize JVM 
  - stale data may occur (one var is up to date, but another is not)
  - can fix with synchronized get/set, with @GuardedBy("this") to decorate the value that needs to be locked
  - non-atomic 64-bit operations (double/long) are permitted by JVM to split operations so you must declare as volatile or guard with a lock
  - `volatile` is a form of weak synchronization, which forces runtime/compiler to retrieve value from main memory instead of CPU cache for each thread
    - does not lock
    - good use of volatile include ensuring visibility of their own state or object they refer to
    - often used for sleep flags
- locking guarantees visibility + atomicity; locking can only guarantee visibility
- do not allow the `this` reference to escape during construction (violates encapsulation)
  - often done by starting a thread from a constructor
    - can create the thread but don't start it
- To avoid using synchronization, confine state to a single thread
  - known as thread confinement
- strong forms of thread confinement are:
  - stack confinement
    - object can only be reached through local variables
  - ThreadLocal
    - often used to associate transaction context
  - and the weaker one is ad-hoc thread confinement
- Immutability
  - state cannot be modified after construction, all fields are final, properly constructed
  - make all fields final if you can 
- to ensure safe construction, can use static construction 
- safely publish effectively immutable objects, and mutable objects must be safely published + thread-safe or guarded by lock

### Composing Objects
- ownership and encapsulation often go together, but not always
- Instance Confinement
  - encapsulating data within an object confines access to the data to the object's methods, ensuring locks
  - if you hide a mutable object within a class through private, it can be safe if you use proper locking strategies
  - Java monitor pattern has a private final object lock that guards another public object
    - done to simplify access of lock and to ensure synchronization
  - document a class's thread safety guarantees for clients; synchronization policy for maintainers

### Building Blocks
- Synchronized Collections (Vector, Hashtable, Collections.synchronizedXxx)
  - only on best effort basis to detect concurrency issues
  - not easy to synchronize on iteration because that will block access
- Concurrent Collections
  - ConcurrentHashMap uses lock striping to allow greater shared access
  - drawback is weakly consistent size and count methods
    - they were correct at the time of creation but more like an estimate
  - producer-consumer design pattern separates execution from identification of work
    - embodied in a thread pool and a work queue
    - blockingQueues
- STOPPED AT 5.5 Synchronizers start