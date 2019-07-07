# Node js Notes for Professionals

- can create server with private key and public certs
  - the client must send an options object with key, cert configs
  - can do the same for creating an `https` enabled server
- to remove extraneous package in node, run `npm prune`
- for express, use modular express by defining router individually
- can add hooks for execution before any req and after any res
- can get list of all listeners of an EventEmitter by using `emitter.eventNames()`