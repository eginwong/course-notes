# Learn and Understand Node.js
[udemy](https://www.udemy.com/understand-nodejs/learn/v4/t/lecture/3452978?start=0)


## V8: The Javascript Engine
- node is written in C++, V8 is written in C++ 
- can be run standalone or embedded in a C++ program
- can hook in C++ programs to extend V8

## The Node Core
- js code in node project is a wrapper for the corresponding C++ code
- is both a framework and a library

## Modules, Exports, and Require
- module: reusable block of code which does not accidentally impact other code
- commonjs is a set of standards
- `require(...)` to retrieve module
- module is self-contained
  - use `module.exports` to export value outside of module
- function constructor: normal function used to construct objects 
- `require` creates a `Module` object
  - then creates a wrapper for your js content 
  - is passed through scope, which is wrapped by `(function(exports, require, module, __filename, __dirname));`
- `require` will pull from a folder instead if file isn't found
- can require an `index.js` that requires other files
- require will cache the `module.exports` when required again
- revealing module pattern: only expose props and methods you want via a returned object
- can mutate `exports` but can't directly set it
- requiring native modules
  - from within javascript core
  - don't need the `/` for the path as the file should be part of the library's folder
- import is for ES6 modules

## Events and the Event Emitter
- two types of events:
  - system events (C++ core, libuv)
  - custom events (javascript core, event emitter)
- Emitter would just be an object of events
  - the `on` function would retrieve either the type or create an empty array
    - then it would push a listener into that array
  - the `emit` function, loop over array of `this.events[type]` and execute the listener()
- suffers from magic strings
  - can create an object of enums to translate them
- can create objects with prototype chain by using `Object.create()`
- `util.inherits` works by adding a middle-man proto object to extend the prototype chain
  - `util.inherits(a,b)` means object constructor `a` should get all props from super constructor `b`
- `.call()` will overwrite `this`, pass arguments with commas
- `.apply()`, pass an array of arguments
- `util.inherits` only links the prototypes, but not necessarily runs its constructor

## Asynchronous Code, libuv, The Event Loop, Streams, Files, and more...
- js is synchronous
- libuv has an event loop that constantly runs
  - actual C code that's just looping
- character set (unicode) and character encoding (UTF-8, how to encode to bits)
- `Buffer` is global, the string + encoding
  - ES6 can handle raw binary data with `Buffer` but not commonly used yet
- `fs` filesystem
  - will load content into buffer (because of binary data), in specified encoding
  - `readFile` and `readFileSync` for callback or no
  - if buffer is too big, will eat up all memory 
- error-first callback means you will get object of error first or null as a parameter 
- chunks are pieces of data sent through a stream
  - Streams are event emitters
  - readable and writable, event is `data`
  - pipe goes from one stream to another
  - `zlib` can zip

## HTTP and being a Web Server
- MIME type - multipurpose internet mail extensions, standard for specifying the type of data being sent
- `http_parser` in C++ code
- use `http` library to `createServer`
- req and res are read and write streams, so we can `pipe` to improve performance
- always use streams for performance!!

## NPM: The Node Package Manager

## Express
- wraps http server
- can use `process.env` for environment variable
- express can identify content-type to clean up code
- use `req.params._` to get the parameter passed in
- use `express.static` to retrieve files
- can chain requests routes by using `next()`
- can use template engines, `app.set('view engine', 'jade');`
- can use `express.Router()` to segment portions of the app and then run `app.use()`
- can pass `app` by reference to clean up code

## Javascript, JSON, and Databases
- 