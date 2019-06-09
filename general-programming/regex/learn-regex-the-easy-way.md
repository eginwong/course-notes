# Learn Regex the easy way
[ref](https://github.com/ziishaned/learn-regex)

- regex is a group of chars or symbols which is used to find a specific pattern from a text
  - matched against a subject string from left to right
- there is basic matching, which matches strings
- meta characters
  - `.`, `[]`, `[^]`, `*`, `+`, `?`, `{n,m}, matches at least n but no more than m`, `()`, `|`, `\`, `^`, `$`
- shorthand character sets
  - `\w`, `\W`, `\d`, `\D`, `\s`, `\S`
  - what it is, and its negation
- lookaround
  - positive lookahead `?=`
    - `"(T|t)he(?=\sfat)" => **The** fat cat sat on the mat.`
    - will only match given the lookahead condition as well
  - negative lookahead `?!`
    - get everything that doesn't have what follows
  - positive lookbehind `?<=`
    - get all which precedes this pattern
  - negative lookbehind `?<!`
    - don't get these which precede this pattern
- flags
  - `i` case insensitive
  - `g` global search
  - `m` multiline
    - will match pattern at the end of each line in a string
- greedy vs lazy matching
  - `.*` will match the longest possible
  - to get shortest match, use `.*?`