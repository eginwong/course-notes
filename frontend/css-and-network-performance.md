# CSS and Network Performance
[ref](https://csswizardry.com/2018/11/css-and-network-performance/)

- view won't work until CSSOM and DOM are rendered
- CSS hard to load asynchronously
- tips
  - inline styles that are critical and load fluff later
  - if you use media queries in css, it will lazy load what's not needed immediately
  - avoid `@import` because it is slow for rendering tree
  - keep async js scripts above css loads if not dependent because css load blocks