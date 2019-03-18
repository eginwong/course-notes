# Angular JS play by play - Pluralsight

- can disable cache with settings in Chrome Debugger
- Bower to get packages
- define module as a sort of package/namespace
- Uppercase controller names - something you're going to invoke
- `var vm = this` is binding the this of the controller to a variable, avoid `this` context problems
- `ng-model=''` is the directive to enable two-way double-binding
- `ng-repeat="person in vm.people"` is another directive
- one-way data-binding is `{{}}`, two-way is `ng-model`
- can align html and controller by putting `ng-controller=""` in top html tag OR do so via routing `controller: 'name of Controller', controllerAs: 'vm'`
- `data-ng-app="name of namespace"` need to make sure to link up angular
- controller should not be fetching data if possible, use a service
- service would use a factory
- declare variable as object that returns method references, public API
    * would be a closure
- `$___` is usually for angular libraries that are offered
- module is where you define namespace, we create a new one for each feature
- Put route with feature module
- Don't forget to add new js files to index.html and app.module.js