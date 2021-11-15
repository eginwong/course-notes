# SQL IS versus NULL

[ref](https://www.xaprb.com/blog/2006/05/18/why-null-never-compares-false-to-anything-in-sql/)
- no equality or inequality with `NULL`, as they are pure void
- one can only say "is" or "is not" `NULL`
- any comparison with `NULL` is always `NULL`, not boolean true or false
- booleans are actually three values: `TRUE`, `FALSE`, and `UNKNOWN`
  - which means any comparison with `NULL` is actually `UNKNOWN`