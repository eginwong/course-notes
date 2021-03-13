# Grokking Algorithms
Aditya Y. Bhargava
[ref](https://www.manning.com/books/grokking-algorithms)

## Introduction to algorithms
- binary search
  - log2n (because it divides in half every time)
  - make sure you understand logarithms
  - only works when in sorted order
- big O is worst-case run time
- exercises (221)
  - 1.1 log2(128) => 7
  - 1.2 => 8
  - 1.3 constant (O log N), I guess because of search?
  - 1.4 n
  - 1.5 m x n (number of numbers per person) [actually O(n)]
  - 1.6 m (number in A) x n (number of persons) [actually O(n)]
- travelling salesperson
  - factorial runtime

## Selection sort
- arrays and linkedlists
  - array: reading O(1), insertion O(n), deletion O(n)
    - random access
  - linked list: reading O(n), insertion O(1), deletion O(1)
    - sequential access only
    - better for inserting in the middle
- selection sort
  - pick top one and move it into correct position, do that for every item
    - O(n^2)
- exercises (222)
  - 2.1 linkedlist
  - 2.2 linkedlist
  - 2.3 array
  - 2.4 inserts may take longer because re-allocation is required
    - adding is O(n*log n) because you need to place it in the right place
  - 2.5 new one would be slower than arrays at searching but faster than linked list
    - inserting would be slower/same as linked list but faster than array, in the middle

## Recursion
- always have a base case and a recursive case
- calling a function from another function adds a frame to the call stack
- exercises
  - 3.1 Greet function calls Greet2 function
  - 3.2 OOM; stack overflow exception

## Quicksort
- divide and conquer strategies are recursive algos
  - every recursive case, reduce the problem area
  - Euclid's algorithm explains this
  - base case for array-like problems is reducing the array to 1 or 0 elements
- exercises
  - 4.1
    - def sum(arr):
    -   if (arr.length < 1) return 0;
    -   elif return arr.pop() + sum(arr)
  - 4.2 same but with index count
  - 4.3 keep on going but with bigger or smaller number; return -number if no more elements in a list
  - 4.4 base case: when tree is lowest leaf node, going left or right depending on greater or smaller of tree
  - 4.5 O(n)
  - 4.6 O(n)
  - 4.7 O(1)
  - 4.8 O(n^2)
- quicksort
  - uses recursion
  - pick a pivot
    - partition with the pivot
    - sub array less than, sub array more than, pivot
  - keep picking a pivot in each sub-array until all sides are sorted
  - return qs(less) + pivot + qs(greater)
  - merge sort and quicksort are O(n log n) but on average, qs is faster
  - qs depends on what pivot you choose
    - worst case is choosing the lowest OR highest in an already sorted array O(n)
    - best case O(log n) and each level to sort is O(n) time,
      - therefore, worst case is O(n^2) and best/average is O(n log n)

## Hash tables
- hash function
  - enter a string, get a number out
  - maps strings to numbers
  - must be consistent
  - must map differently depending on input
  - hash function returns a valid index for your storage array
- hash tables
  - fast for identifying dupes
  - good for caches
- performance
  - collisions impact
  - hash functions are therefore important
  - average is O(1), worst case is O(n) for all operations
  - load factor
    - # of items / # of slots
- exercises
  - 5.1 yes
  - 5.2 nope
  - 5.3 nope
  - 5.4 yes
  - 5.5 D or C
  - 5.6 B or D
  - 5.7 B or C or D

## Breadth-first search
- can be used to find shortest distance
  - application could be AI or spell check or closest location
- shortest-path problem in graph theory
- what is a graph?
  - models a set of connections
  - each entity is a node, each connection is an edge
- BFS
  - questions to ask
    - 1. is there a path from A to B
    - 2. what is the shortest path?
  - search in onions and add open questions to the queue
  - use of a queue to prioritize
- implementing the graph
  - you can store the relations in a hash table
  - undirected vs directed graphs
  - need another list to note if the node has been checked yet
- BFS REQUIRES
  - queue
  - mechanism to hold status of checked or not
  - algo to loop through the queue
- runtime:
  - keeping a queue of every person is constant O(1)
  - adding every person on the queue when their node is hit AND their relationships is O(V+E), vertices and edges
- tree
  - special kind of graph where no edges go back the other way
- exercises
  - 6.1 2
  - 6.2 2
  - 6.3 A invalid, B valid, C invalid
  - 6.4 wake up < exercise < shower < get dressed < brush teeth < eat breakfast < pack lunch
  - 6.5 A C

## Dijkstra's algorithm
- can handle fastest path, but not shortest
- steps
  - 1. find cheapest node
  - 2. update costs of neighbours of this node
  - 3. repeat until all nodes are updated
  - 4. calculate the final path
- assigns a number/weight to each segment
- graph with weights is weighted graph vs unweighted graph
- cycles are graphs with loops
- dijkstra's ONLY works for DAGs
  - directed acyclic graphs
- start with a table of all nodes with a cost associated with each
  - ALSO need a node <-> parent lookup table
- YOU CANNOT HAVE NEGATIVE WEIGHTS OR ELSE DISASTER
  - when you visit a node, you set the lowest cost, so negative numbers break that principle
  - USE Bellman-Ford's algo instead
- DIJKSTRA'S REQUIRES
  - hash tables
    - graph
    - costs
    - parents
  - array to track processed nodes
- exercises
  - 7.1 skipped

## Greedy algorithms
- easy approach to challenging problems
  - at each step, pick the optimal move
    - locally optimal solution
  - e.g., classroom scheduling, knapsack
- greedy algorithms are good approximations
  - pick the largest set and keep going
  - judged by how accurate and how fast
- in python, can do set manipulation
  - &, |, -
- travelling salesman
  - factorial
  - NP-complete
  - no easy ways to tell if problem is NP complete
    - clue #1: slows down with scale
    - clue #2: all combinations of X is NP-complete
    - clue #3: must calculate every possible version? likely NP-complete
    - clue #4: set is involved and it's hard? maybe NP-complete
    - clue #5: sequence and hard to solve, maybe NP-complete
    - clue #6: restate problem to travelling salesman OR set-covering? NP-complete
- exercises
  - 8.1 pick the biggest boxes first, not always optimal because you may have a lot of extra space
  - 8.2 pick the highest rated things, not always optimal because you may hit 10 things worth more than 1 long thing
  - 8.3 no
  - 8.4 no (yes?), b/c we don't try all nodes, only ones we care about
  - 8.5 no (yes?), b/c we don't try all nodes, only ones we care about
  - 8.6 yes
  - 8.7 yes
  - 8.8 yes

## Dynamic programming
- solves subproblems
- can use current option or options above your current cell in the column
- `cell[i][j] = max (previous max(cell[i-1][j]), current item + cell[i-1][j-item's weight])`
- order doesn't matter
- cannot use dp if subproblems depend on other subproblems, each must be discrete
- good for optimizing against a constraint
  - when problem can be broken down into discrete subproblems
  - every dp involves a grid
  - values in the cells are what you are trying to optimize
  - you're trying to maximize something
- longest common substring
  - in this case, maximize longest substring
  - largest is cell in all grid, not bottom right one
  - if match (add 1 to top left value) else 0
  - longest common subsequence
    - if match, add 1 to top left value
    - else, max (row up, col left)
- exercise
  - 9.1 skipped
  - 9.2
|                 | 1 lb | 2 lbs | 3 lbs | 4 lbs | 5 lbs | 6 lbs |
|:---------------:|:----:|:-----:|:-----:|:-----:|:-----:|:-----:|
| Water (3lb, 10) |   0  |   0   |   10  |   10  |   10  |   10  |
|  Book (1lb, 3)  |   3  |   3   |   10  |   13  |   13  |   13  |
|  Food (2lb, 9)  |   3  |   9   |   12  |   13  |   19  |   22  | (water, food, book)
| Jacket (2lb, 5) |   3  |   9   |   12  |   14  |   19  |   22  | (not jacket)
| Camera (1lb, 6) |   6  |   9   |   15  |   18  |   20  |   25  | (camera, water, food)
  - 9.3 longest common substring
|   | b | l | u | e |
|:-:|:-:|:-:|:-:|:-:|
| c | 0 | 0 | 0 | 0 |
| l | 0 | 1 | 0 | 0 |
| u | 0 | 0 | 2 | 0 |
| e | 0 | 0 | 0 | 3 |
| s | 0 | 0 | 0 | 0 |

## K-nearest neighbors
- look at neighbours and classify by majority for KNN
  - classification
  - for recommendations systems
  - but how do you understand how similar? feature extraction
- regression
  - used with KNN to make predictions
  - use cosine similarity instead of values if different users rate consistently differently
  - picking the right features is essential
    - avoid ones with bias
  - OCR makes use of KNN-like algos
  - spam filters
- exercises
  - 10.1 take average of values for each user and balance out ratings
  - 10.2 add a multiplier for influencers
  - 10.3 low, good rule of thumb is sqrt(N) of users

## Where to go next
- BST
  - O(log n) on average, O(n) in the worst case
  - search/insert/delete: O(log n)
- balanced trees are better for use
  - a self rebalancing tree are red-black trees
  - B-trees
    - useful in DBs
  - red-black trees
  - heaps
  - splay trees
- search engines
  - IDF inverted term frequency or something like that
- fourier transform
  - e.g., given a smoothie, can find ingredients for you
- parallel algos
  - harder to write and no guarantee of 2x with 2 threads
    - b/c of load balancing, overhead
  - MapReduce
    - for large loads of data, with Apache Hadoop
  - Bloom Filters
    - when you would rather look things up in a hash but the size is huge (e.g., websites, urls, etc)
    - not an exact answer, but probable and saves on space
  - HyperLogLog
- Hash Functions
  - for dictionaries, we hash object -> index #
  - for SHA, we hash string to string to compare
    - one-way hash
  - locality insensitive
    - you can change one char and it's completely different hash, can't be used to guess
    - SimHash is a locality-sensitive algo, for verifying dupes like plagiarism
- Diffie-Hellman
  - public/private keys to communicate securely
  - both parties don't need to know the cipher, and encrypted messages are extremely hard to decode
  - successor: RSA