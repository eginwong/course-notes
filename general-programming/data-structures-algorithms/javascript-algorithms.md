# Javascript Algorithms
[ref](https://github.com/trekhleb/javascript-algorithms)

@reread

## Data Structures

### Bloom Set
- m size of memory, k number of hashing functions
- only two operations, insert and search
- probabilistic search to determine if value is maybe stored or not at all
- commonly used for blogging such that the end user will never see an old article
- also used when the memory required to properly search is not realistic

### Disjoint Set (union-find)
- tracks a set of elements partitioned into a number of disjoint subsets
- constant time to add new sets, merge existing sets, and determine whether elements are in the same set
- key role in Kruskal's algorithm for finding the minimum spanning tree of a graph

### Trie
- digital tree, radix tree, prefix tree is a kind of search tree
- unlike BSTs, no node stores associated key but rather its position in three defines the key with which it is associated
- all descendents of a node have common prefix of string associated
- root is empty string

### AVL Tree
- self-balancing tree
- lookup, insertion, deletion all take `O(log n)`

### Red Black Tree
- to some extent, self-balancing
- one bit in each node is to determine colour and will try to ensure balance otherwise
- every path from a given node to any of its descendant NIL nodes contains the same number of black nodes
- roughly height balanced

### Segment Tree
- statistic tree for storing information about intervals/segments
- BTree, root of tree represents whole array
- used in computational geometry and geographic information systems

### Fenwick Tree / Binary Indexed Tree
- efficiently update elements and calculate prefix sums in a table of numbers
- represented as an array