# Exploring Render Props Vs. React Hooks In 2020
[ref](https://hackernoon.com/exploring-render-props-vs-react-hooks-in-2020-xg1b3uko)

- hooks are good when one aggregate of data changes together and needs re-renders
- render props are better for a more fine-grained control over re-render cycles
  - render props are passing in data to create a component instead of passing the component itself
- progression from HoCs -> render props -> hooks
- all solve moving state away from components to keep them reusable
- the prop itself is a function (render prop)
  - good for injecting some state without introducing side effects to your components