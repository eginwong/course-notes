# Creating and working with WebAssembly modules
[ref](https://hacks.mozilla.org/2017/02/creating-and-working-with-webassembly-modules/)

- we can run webassembly modules from js like an import of other modules
- webassembly is assembly code for a conceptual machine, not an actual one
  - virtual instructions
  - more direct mapping to machine code than JS source code
- compiler tool chain for wasm is LLVM
- currently functions in WebAssembly can only use numbers (ints or floats) as parameters or return values
- to work with complex data types like strings, we have to use wasm module's memory
  - like languages that have manual memory management
  - in JS, we use ArrayBuffer
- Wasm uses a stack machine 
  - all values of an operation are queued up on the stack before the operation is performed