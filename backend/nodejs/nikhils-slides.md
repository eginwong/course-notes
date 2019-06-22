# Nikhil's Node.js 200 slides

- Module pattern
  - `require`
    - resolve: find the file in any of the dirs in module.paths
    - load: read and determine content of file
    - wrap: gives private scope to file
    - evaluate: run wrapped file
    - cache: save for multiple imports