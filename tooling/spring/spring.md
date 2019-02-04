# Spring 

## BEANS

### Lifecycle
- Init -> Dependency Injection, if any -> Post Construct -> Destroy

### Description
- Java Beans are:
    * serializable
    * have getter and setters for properties
    * have a default parameterless constructor
- Spring Beans are:
    * managed by Spring container for IoC
    * for dependency injection, so they are of familiar format to autowire and configure
    * default scope is singleton per instance of Spring IoC
    * prototype is single bean defn for any number of object instances
    * request is single bean defn per lifecycle of single HTTP request only for web-aware
    * session is only for lifecycle of a HTTP session
    * global session

## Spring Boot Application

### Annotation
- `@SpringBootApplication` enables
    * `@EnableAutoConfiguration`
    * `@ComponentScan`
    * `@Configuration`

## Cross Cutting Concerns
- concern: cannot be cleanly decomposed from rest of the system
- do not fit cleanly into OOP
    * i18n
    * logging
    * memory management
    * persistence
    * synchronization
    * transaction processing
    * security
    * caching
- Solve with aspect-oriented programming (AOP)
    * creates "advice" that doesn't touch the code but is applied on top of via `pointcut` specification
    * `Aspect` is pointcut + advice

## JSON Marshalling
- JSR-310 dependency for date/time serialization
- can create custom `JSON/De/Serializer` by passing to the `ObjectMapper`
- using Jackson for serialization
- `mapper.writeValueAsString()`
- `mapper.readValue(json, new TypeReference<Map<String, String>>);`