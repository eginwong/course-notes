# Algorithms Course II
Donald Knuth MOOC

EQUIVALENCE RELATION: reflexive, symmetric, transitive

## Depth-FIrst Search (DFS):
Vertex = intersection
Edge = passage

Mark vertex as visited and recursively visit all adjacent vertices: ball of string for maze
STACK

## Breadth-First Search (BFS):
Not recursive, uses a queue
Shortest-path problem
Put edgeTo and move on
QUEUE

## Connected Component Graph
- DFS every node until no more, go with next node and increment cc[] and look for another component

## Minimum Spanning Tree
- Undirected graph with positive edge weights (connected), find min-weight spanning tree - all vertices connected
- Greedy Algorithm: make sure every node has the min weighted edge to one of their edges
- Adjacency-lists are just an array for each vertex and then a bag of edges as values for each one
- Kruskal’s algorithm: add smallest edge until we create a cycle. Ignore if cycle; use union-find data structure to determine if we create a cycle with new edge 
- Prim’s algorithm: start with one vertex, and look at all entry points to that vertex; repeat until V-1 edges
- LAZY: Use PQ and disregard edge if v and w are in T but don’t immediately trim
- EAGER: only keeps the overall best way to get to all vertices, doesn’t add all adjacent edges. If we find a better route, decrease specific key and update edgeTo and distTo[]; will need an IndexMinPQ

## Dijkstra’s Algorithm:
- Take next vertex and relax all edges pointing to that vertex, all other distTo[] are infinity to begin with, and we check if we have a better path by relaxing each new node
- Choose shortest distTo first
- E log V with binary heap
- Doesn’t work with negative weights

## Topological sort SP 
- is indifferent to positive or negative weights for DAG
- Only for DAG
## Negative Weights:
- if no negative cycles, will exist SPT
- Bellman-Ford algorithm - repeat V times: relax all Edges (E*V)



## Maxflow/Mincut problems:
Edge-weighted digraph
- Find with lowest capacity cut (sum of all out-going edge weights)
- Max outflow to sink

## Ford-Fulkerson Algorithm:
- Start no flow, increase flow on forward edges and decrease flow on backward edge
- Terminates if full forwards or empty backward

Residual network has directed paths instead of back flow shown confusingly

## String fun:
Reversing a string more efficient with StringBuilder because String concat recreates array every time, so can be quadratic time

Key-indexed counting for strings - is linear in time with one pass through, but limited to chars (R) in alphabet

Least-significant-digit sorting - go from right to left and sort - stable 
Most-significant-digit sorting - use left to right, recursively sort any sub-arrays. Really bad for small texts groups and may need to cut off to do insertion sort in that case. Too many chars to initialize (large space) for small subsets

Three-way quick sort is choosing where to do middle split like quick sort. Not good for long duplicates

Suffix-sorting to find duplicates in text; 

## Tries:
R-Tries
- Efficient Symbol Table for Strings
- Node for each character, assign value if end of string
- Sublinear but R space required
- Don’t have to check entire length of string unless match

Ternary Search Tries
- Smaller, even, greater
- More space-efficient, less null links
- Faster than red-black BSTs

Character-Based Operations:
- match longest prefix


## Substring Search:

Knuth-Morris-Pratt:
- Always avoid backup
- Construct DFA with simple path and think through mis-matched cases
- Mismatched cases: Keep track of state x, which is 1 to j-1, shifted over to right
- For x + 1, copy over from x - 1 for non-correct path

Boyer-Moore:
- Mismatched character heuristic
- If wrong, shift over as necessary using precomputed values like FSM
- Best case is n/m but worst case is n*m

Rabin-Karp:
- Use a modular hash and try to match on it
- Can update hash function in constant time
