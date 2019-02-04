# Angular Best Practices - Pluralsight

## Immutability
- use Object.assign({}, someObject, {}) for immutability

## Angular Module Organization
- Core Module: shared singleton services, app-level components
    * Across features
- Shared MOdule: Shared components, directives, pipes

## Best Practices
- add prefixes to all selectors
- if component template and styles are less than 3 lines, can leave inline
- Delegating complex logic to separate service/directive (design decisions)
- put all private class members after all public class members, in order to very easily identify API

## Performance Best Practices
- Use AOT compilation which will reduce bundle size
- Use lazy loading for feature modules
``` javascript
// in appRoutes:
{ path: 'users', loadChildren: 'app/users/users.module#UsersModule'}

// and then in the UsersModule
RouterModule.forChild([
    { path: 'register', component: RegisterComponent },
    ...
])
```
- think about bundle sizing detection in CI/CD pipeline
- Think about OnPush change detection for a crap ton of bindings
- `changeDetection: ChangeDetectionStrategy.OnPush`, needs immutability
- Pipes are pure, so they will not re-run but can change reference and the pipe will detect this and fire again
- can make them impure by setting `pure: false` - don't do this 
- use `npm run stats` to check size of files!