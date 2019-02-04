# Angular JS Directive Fundamentals - Pluralsight

- `restrict: _` is E for element (<>) or A for attribute (<div directive-name-here></div>) or M for comments `<!-- directive: -->` or C for class `<div class="directive-name-here"></div>`
- A is the default
- directive name will be camelCase but in HTML, will be snake case as HTML is case-insensitive
- Three types of directives: Components (Custom Directive), Decorators, or Structural/Templating
- always prefix your directives to avoid collision
- can add controller to directive to have its own logic
- parent scope and directive scope will be shared if we pass $scope directly
    * to encapsulate data, set `scope: true` to have its own local scope via inheritance, but its $parent scope can be found through delegation again in prototype
    * if isolated scope, will not have reference to parent; set `scope: {user: '='}`, need to pass through html tag as an input property - as data, two-way binding
    * cannot have two directives on the same html element that have isolated/shared scopes
        * if passing String value `@`, can rename with `@somethingElse` for alias
        * if passing method for event handling, use `&`. This limits the directives we can use (can't have multiple with isolated scope), so we can use the link function to grab attrs and use the `$parse` to retrieve the method
- link function takes scope, the element that the directive is on, and the attributes on that element, in an array
    * can return link function directly if its a simple directive
    * there's a `pre` and a `post` link function
- Decorator directive is when you manipulate the DOM
- can require a controller from same node or parent node, but not inherit their scope - to communicate from one controller to another
    * `require: '^directiveName`, and would be put into link function as a parameter, `^^` means to look only at parent nodes, `?` can be null
    * can require an array of controllers, through `[]`
- Use services to hold business logic, and to share data