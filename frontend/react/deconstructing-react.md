# Deconstructing React
[ref](https://www.youtube.com/watch?v=f2mMOiCSj5c)

- Tejas Kumar
- building React from scratch
- use `...args` to log out some info on the original expected contract of a library
- virtual DOM is a tree with elements; just an object
- need something to create the visuals from the virtual DOM
  - react-native does that for mobile
  - react-dom does that for web
  - react-chalk? does that for cli
- all `id` in html are accessible via `window`, as it is a global variable
- how hooks work?
  - having closures enable persisting of state between re-renders
  - can't do conditionals because react doesn't understand how to handle the array of states
- concurrency in React
  - throwing Promises instead of errors
  - React uses `createResource` and `key`
  - React will render promises but how does React suspend?
  - uses a `throw` to quickly bubble up the React tree
  - has a `try/catch` in `createElement` to render