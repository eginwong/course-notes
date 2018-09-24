# Angular JS Services in Depth - Pluralsight

* can create in a manner of ways: `provider()`, `factory()`, `service()`, `value()`, `constant()`
* `$provide` registers service to angular architecture
* provider must define a `$get`, that's how to return the service
    * Configurable 
``` javascript
(function() {
    var app = angular.module('app', []);
    app.config(function($provide) {
        $provide.provider('books', function() {
            this.$get = function () {
                // implementation details
                return {
                    property: property
                };
            };
        })
    })
})
```
* Could be done directly from the module as well, through `app.provider()`
* `factory` will return a service instance and is used when configur  ation is not required
* `service` wraps factory and is used when you need to treat the service as a constructor (often inheritance)
* `value` is shorthand for factory with no parameters, cannot be injected into module config function
* `constant` only registers service with injector but not through provider, can be injected into module config

* inject $routeProvider through `app.config`, and chain `when('route/', {} )` and `otherwise()`
* `resolve: {}` parameter is usually different dependencies to be injected before route is loaded
* use `$cookie` for single attribute, but `$cookieStore` for an object
* `$resource` is an abstraction layer over the `$http` layer, not as flexible
* `$resource` would return a resource class, using a method from the class will return instance

* `$cacheFactory` is your typical cache object map; default http cache is `$http`
* can cache `$http`
``` javascript
return $http({
    ...
    cache: true // or your own cacheFactory reference
})
```

## Decorators
* can modify behaviour of existing pattern
```javascript 
app.config('$provide', function($provide) { 
    $provide.decorator('$log', logDecorator);
});

function logDecorator($delegate) {
    function log(message) {
        $delegate.log(message.toUpperCase());
    }

    return {
        log: log
    }
}
```
* `$delegate` is OG function