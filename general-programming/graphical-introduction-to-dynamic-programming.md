# A graphical introduction to dynamic programming
[ref](https://avikdas.com/2019/04/15/a-graphical-introduction-to-dynamic-programming.html)

> DP helps us solve recursive problems with a highly-overlapping subproblem structure

- DP, create a cache and retrieve if there or compute and put if not
- however, if we draw out the problem space in a graph, Fibonacci is a DAG which can be handled with a bottom-up approach
  - instead of caching, only store the last n values to reduce space
- to solve DP problems, identify subproblems
- fcn should be identifiable by some integer inputs, to allow us to associate inputs with computed results
- function should depend on itself
- for change making problem, we have two dimensions
  - to make the value with the varying denominations of currency
- two choices: use one coin of highest denomination and repeat or don't use any coin of highest denomination and move to a tier lower
- stopping areas are if there's no lower tier or if the denomination > remaining target