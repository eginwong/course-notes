# Introduction to WebRender Part 1 - Browsers Today
[ref](https://mozillagfx.wordpress.com/2017/09/21/introduction-to-webrender-part-1-browsers-today/)

- WebRender is 2d renderer for the web
- current web renderers
  - result of layout computation is a tree of positioned elements in the page, called frame tree (or flow tree)
  - from tree, we generate a mostly flat list of drawing commands = display list
  - portions of display list are then painted into layers
  - layers are then combined together into one final image during the compositing phase
- Content process (DOM tree -> Frame tree -> Display List -> Layer tree) then Compositor Process (Compositor layer tree)
- display lists are handy because keeping track of order and sorting is challenging while traversing frame tree, and complicated interactions between contexts and z-ordering in CSS
- display list is useful for invalidation (to know what to repaint)
- compositing
  - some browsers have their own compositor while others (Edge, Safari) will delegate to the OS