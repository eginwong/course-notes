# A crash course in just-in-time (JIT) compilers
[ref](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/)

- translating from human language to computer language
  - interpreters or compilers
- interpreters go line-by-line
  - inefficient because optimizations are minimal
  - JS originally used an interpreter
  - at runtime
- compilers work ahead of time and create that translation
  - more time required to start up
  - more efficient with optimizations
- JIT compilers mix interpreters and compilers in the browser
  - there is a profiler that monitors the code in the interpreter to take note of how many times it is run and what types are used
  - if code is used often, JIT will send it to be compiled and then stored for future use  
  - compiler doesn't want to take too long either, or it will hold up execution
  - if code is used all the time, the compiler will take more time to make optimizations for overall gain
  - based off of the monitor/profiler, it will try to cut corners and make assumptions for improved performance
  - if it keeps trying to optimize and throwing it out, the performance can deteriorate. That's why it has a capped limit
  - 