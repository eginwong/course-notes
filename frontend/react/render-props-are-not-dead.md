# Render Props are Not Dead
[ref](https://www.youtube.com/watch?v=pn0pIgdQvhU&list=PLCC436JpVnK0Q4WHoB85ZYBwcCyTaMgAl&index=8)

- drawbacks of HoC
  - need to wrap entire component, could not inject state when desired easily
- render props
  - allowed for finer grain control
- hooks need to be in functional components
  - can return hooks result either as an object or an array
  - object if many return results and not repeated
  - array if repeated hook use and consistent pattern
- render props delegate control of rendering inline and reduce extra rerenders if there are slow third party components