# angular js: Clean Code - Pluralsight

* name controllers using PascalCase
* Avoid generic names like utility
* Use camelCasing for non controller components like factories
* file naming convention - dashes, camelcases, ., up to you but be consistent
* `angular.module('app')` is a getter, `angular.module('app', [])` is a setter
    * Angular Modules > Custom Modules > 3rd Party Modules
    * core modules (to be shared), widgets (directives that are used by other feature modules)
* register controller, inject, and then define function
* Put public interface at the top
* Controller
    * essentially creates a new instance every time
* In routing, can add `resolve: { message: function(){} }` to pass content before the controller is created (must inject in controller)
* `ngAnnotate` is pretty handy for handling our auto-injections
* Use a decorator to handle all basic errors
* create a consistent way to catch routing, xhr errors too