# Algorithms Course I
Donald Knuth MOOC

Selection Sort: Find min and swap, make set smaller for each swap: n^2/2 and N exchanges
Insertion Sort: pointer moving right, if less than, swap backwards until ascending, continue. N^2/4 swaps and compares. Best case N-1 compares [linear for partially sorted] and 0 exchanges if sorted.
Shell Sort: Insertion but with subarrays at h-distance
Merge Sort: Split and sort, and then finally merge (divide and conquer) n log n; uses space proportional to N; use insertion for smaller arrays, O/H too great
	* Bottom-up merge sort: go through multiple times, no recursion
**Suffers from using space proportional to N
**Lower bound of random sorting is n log(n), so merge sort is optimal without any extra info

Stable - will it preserve order within equal keys (insertion/merge, but not selection or shell); beware of less than + equals, quick counter is to see if long exchanges between equal values

Quicksort: in-place, constant + log extra space; shuffle, partition with two pointers that swap if incorrect and less than arbitrary pointer. Then arbitrary when two pointers cross. Then recursive. Note, not stable and shuffling to guarantee performance
-best case is nlgn, worst case n^2; avg is 1.39nlgn

Selection using quick sort would be linear on average, quad at worse

Binary heap is a BST using arrays and arithmetic. Reverse-sorted arrays are always BSTs, Max is always on top.
Try to keep keys immutable for benefits, so don’t put stacks, counter, string, or arrays
Might be good to leave at 1-index and shift back to 0 for arrays, better performance with bit vectors

HeapSort: construct heap, order it, then remove max by swapping with root and base and iterating until finished. 
In-place and n log n; not stable; inner loop greater than quick sort; poor use of memory


BST: is a binary tree in symmetric order
Height always logn or 2logn
Tree shape depends on order of insertion. Sorted is worst!
Worst case linear, average case ln n, most operations are dependent on height of tree
Deletion - Hibbard, find utmost left recursively, set to root, update counts on the way up. NOT SYMMETRIC, ends up being sqrt(n)


2-3 tree: one key, two children, or two keys, three children
Perfect balance (all root to null are same length), symmetric order
Only increase height when you get a four-node and middle rises past root
Splitting a local node is constant time (does not matter how big any of the rest of the tree is). If all 2 nodes, lg2N, if all 3 nodes, lg3N
 
Red-black BST: left-leaning; no node has two red links, red links lean left, perfect black line balance (all same)
-> Search is identical as just a better balanced tree
Add a color to node
-> need to add rotateLeft for temporary right-leaning red links 
Red-link = 2+ node
-> when you flip colors, you flip the parent as well.
-> all new inserts are red!

Applications: 
- 1d range, regular queries, would be R+logN, where R is number of matching
- 2d find all orthogonal intersections is to use a sweeping algorithm with nlogn + R, for intersections 
- 2d-tree, BST but alternate using x,y coordinates as key, search gives rectangle containing point, insert further subdivides: left, right and below, above
- Kd is multi-dimensional
- 1d interval, left endpoint as key, right endpoint is extra data max at each node root

Hashcodes
Combine fields with 31x + y,  where x is hash, and y is next hashcode
Reference, use hashCode(); primitive, use wrapper hashCode(); for null, return 0; if array, deepHashCode()

Use separate chaining (linkedlists) to deal with collisions OR linear probing - shift over when position is blocked