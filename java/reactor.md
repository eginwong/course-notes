# Project Reactor

* efficient message passing with **low memory footprint**
* include with BOM and add dependencies without versions
* currently, async processing is handled via `callbacks` or `Futures`
* can `dispose()` of Flux or Mono types
* can programmatically create `Flux` through the `generate`, `push`, or `create`
* `handle` is combination of map and filter
* can play with threading based on Subscribers
* Processor are subjects in rxjs

### Backpressure
* can use `preFetch`, `buffer`, `limit__` to change downstream flow of events

### Testing
* test with `StepVerifier` and make sure to end with `verify()` to trigger test