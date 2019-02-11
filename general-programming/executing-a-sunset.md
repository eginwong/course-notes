# Executing a Sunset
[ref](https://codeascraft.com/2019/02/01/executing-a-sunset/)

- use feature flags and turn off traffic
- export data for users so that code can be removed (no need to go back and export data)
- set up DNS redirects when required
- delete code in small chunks and ensure CI/CD and tests will cover for the edge cases
- beware of compliance as well