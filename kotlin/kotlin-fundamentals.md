# Kotlin Fundamentals

* default return type is void, or `unit`
* functions are first-class citizens
* object-oriented
* less ceremony than Java
* declare variable with `var` and assign type like: `var Name: String = ""`
* `val` makes value immutable 
* Kotlin uses string interpolation so, `print("Hello ${person.Name}")
* Kotlin doesn't use the `new` keyword
* public is default behaviour in Kotlin classes
* can pass functions as parameters, arguments
    * defined as `fun: (parameters) -> Unit`
* Kotlin will create a class for standalone function but requires Kotlin binaries
* setters and getters are created automagically
* if statements actually have a return value
* Kotlin cannot assign `null` values unless assigning variable to include the `?` notation
* can use `when` statement as it is similar to a `switch` statement
* can use range, like `1..10 step 2`
* can make use of extension functions, sort of like extending the prototype
* infix prefix to a function makes it look like an operator, can overload operators
    * need to add `operator infix`
* can also use `tailrec` to avoid stack overflow
* `: ` means implements or extends
* have to use `override` before the `fun` if we are to override

## Classes
* naturally final
* Sealed classes, restricted number of types, similar to an enum
* can have secondary constructors, but prefer default vals
* data classes automatically override hashcode and equals and toString
    * includes a copy method

## Companion Objects
* don't have static methods
* can create a singleton, but may be difficult to test
* can be extended or implement interfaces
* add companion object to class, to have a sort of static method feel
* annotate with `@JvmStatic` if you want to run methods from companion objects as static

## High Level Functions
* pass functions around
* `calculate(1,2, ::print)` or `calculate(1,2) {print(it)}`
* kotlin can mutate variables in lambda functions
* `with` and `apply`, lambda functions

## Functional Style and Collections
* order matters

## Collections
* use sequences if infinite list
* not evaluated until a terminal operation is applied
* sequence can immediately finish an operation instead of going through all values
  
## Using kotlin code in Java
* easy to pass lambdas to Java methods
* may need to use SAM constructors when program cannot infer what type

## Kotlin's nullability constraints
* safe call `?`
* elvis operator `?:`, returns value or null
* safe cast `o as? ISaveable`m casts to type or returns null
* not null assertion `!!`, asserts that something is not null
* `let` only calls lambda function if calling var is not null
* `lateinit` for initializing later in the code, but don't want to assign default value or null
* `@Nullable` from the Java side will help to give the Kotlin compiler a clue that the value is nullable

## Kotlin's Collections
* listOf, setOf, mapOf, arrayListOf, hashSetOf, mutableListOf
* can iterate over the values of an array index
    * `args.indices`
* generally read-only

## Using Higher Order Functions
* inlining functions usually improves performance
* `inline` is the keyword
* if lambda is used later, cannot inline
* sequences cannot inline, because they are held up to execute later

## Generics support in Kotlin
* can constrain generics
* reified types, only works for inline functions
* `noinline` for lambda values that you want to pass to a reified + inline function
* call site variance, will add `out` to the type to say that we only retrieve values and never set on the type