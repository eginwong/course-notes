# Interview Prep

spring boot + cloud, base knowledge on functional and reactive programming that is at teachable and coachable level with a potential to learn.

Functional, Reactive programing in depth and Kotlin



* Spring WebFlux framework
* be wary that your data repository supports non-blocking reactive streams (Mongo)
* Mono: emit at most 1 element
* Flux: emit 0..n elements
* WebClient is a non-blocking client with support for Reactive Streams
* 
```Java
Flux<Employee> employeeFlux = client.get()
    .uri("/employees")
    .retrieve()
    .bodyToFlux(Employee.class);

employeeFlux.subscribe(System.out::printLn);
```
* add Spring Security WebFlux support with `@EnableWebFluxSecurity`
* Functional Web Framework uses `HandlerFunction` and `RouterFunctions`
    * `HandlerFunction` generates responses for requests routed to them
    * `RouterFunction` routes incoming requests to handler functions (instead of `RequestMapping`)
        * can chain routes with `.and()`
```java
@Bean
RouterFunction<ServerResponse> getEmployeeByIdRoute() {
  return route(GET("/employees/{id}"), 
    req -> ok().body(
      employeeRepository().findEmployeeById(req.pathVariable("id")), Employee.class));
}
```
* can test with WebTestClient
* `Publisher` -> `Observable`, and `Subscriber` -> `.subscribe class`
* set up request for `WebClient` with a bunch of builder functions
* send the request through `retrieve()` and `exchange()`, and then `bodyToMono()`

## Functional Programming
* lambda expression represents an anonymous function, comprising of a set of parameters, lambda operator, and function body
* Optionals, functional interfaces with no need for synchronized as they should not be manipulating any state
* streams


* Reactive good for message processing, external HTTP calls
* Flow **Processor** transforms message to pass to next Subscriber
* Flow **Publisher** to produce/publish items
* Flow **Subscriber** consumes messages
* Flow **Subscription** links Publisher and Subscriber with request/cancel methodsf
* Publisher has:
    * onSubscribe
    * onNext
    * onError
    * onComplete

* Reactive manifesto
    * response
    * elastic
    * resilient
    * message-driven

* use `then` for Mono and `thenMany()` for Flux or Mono to do something after Flux/Mono has completed their events
* Mono and Flux are reactive types, used to handle async nature of operations
* Handler functions are kinda like your controllers with logic
* Routers are more like the `RequestMapping` section of the controllers
* Reactive + Functional style would use ServerRequest and ServerResponse
* WebClient replaces RestTemplate
    * `exchange` can get the response header etc etc
    * retrieve pulls the data directly  

* WebFlux supports two programming models
    * annotated controllers
    * functional endpoints
* Reactive and non-blocking benefits are the predictable scale with less required memory
* Spring WebFlux uses a small number of threads, as it is assumed that they will not be blocking
* WebClient makes use of the event loop style

## Resources
* [Spring Boot Course, Jack Ton](https://spring-boot-course-labs.herokuapp.com/11-spring-boot-webflux.html)
* [Reactive Documentation for Spring WebFlux](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#webflux-websocket)