# Syntactically Awesome StyleSheets (SASS) Documentation
[ref](https://sass-lang.com/guide)

- `sass` as the CLI
  - can `watch`, must set input output like so - `sass --watch input.scss output.css`
- `$` to declare variables
  - useful for brand colours
- can nest variables
- can create partial Sass files
  - used with the `@import` directive
  - prefaced with the `_` so compiler knows not to generate into a CSS file
- `@import` will combine the css file to reduce HTTP traffic and serve as one amalgamation
- mixins are groups of css declarations to reuse throught the site
  - can receive inputs
  - use the `@mixin` directive, give it a name
  - consumed with the `@include`
- extend/inheritance
  - placeholder class that only prints when extended
  - `%placeholder-name {}`
  - consumed with `@extend`
- operators like `+`, `-`, `*`, `/`, `%`

## sass-lang documentation
- encodings
  - default in UTF-8
  - can specify encoding with `@charset` but must be compatible with Unicode
    - must be declared at the beginning of the sheet
- referencing parent selectors - `&`
- use variables
  - if global, declare outside nested selector or add `!global` to the value
- data types
  - numbers, strings, colors, booleans, nulls, lists, maps, function refs
  - lists, bracketed lists
  - maps, must be surrounded by parentheses and comma-separated
    - use `inspect($value)` for debugging maps
  - first class functions
- the `/` operator is not always division, depends on context
- the `-` operator is not always subtraction, requires space or otherwise will be negation
- functions
  - can also use explicit keyword arguments
  - interpolation, `#{$var_name}`