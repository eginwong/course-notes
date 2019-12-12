# What makes WebAssembly fast?
[ref](https://hacks.mozilla.org/2017/02/what-makes-webassembly-fast/)

- JS performance today
  - parsing, compiling + optimizing, re-optimizing, execution, garbage collection
  - operations are interleaved
- WASM performance
  - fetching (faster because binary is smaller)
  - parsing (JS needs to parse into abstract syntax tree and then lazy loaded into an IR called bytecode, but WASM is already in IR)
  - compiling + optimizing (much has been done in LLVM, so minimal optimization for WASM)
  - re-optimizing (WASMA types are explicit, so no throw-away or reoptimizing required)
  - executing (WASM is more for assembly and thus meant to be performant)
  - gc (JS handles it but inconsistent, WASM is manual so consistent)