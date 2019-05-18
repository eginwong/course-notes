# Git from the inside out
[ref](https://maryrosecook.com/blog/post/git-from-the-inside-out)

- git is a graph
- `git add` creates a blob in the `.git/objects`
  - `git hash-object` will hash something and will use that hash to create the folder structure
  - if you run `cat .git/objects/2e/65`, you will get an encoded output
    - use `git cat-file -p 2e65` instead and it decodes the output
  - a `.git/index` is entry is made, but will need to use `git ls-files -s` to see the output
    - includes path of file and the corresponding blob hash
- when you make an update to a file, the index will point to a new hashed blob but the old hashed blob remains
- on `git commit`
  - author, timestamp, message, and tree is added
    - if commit existed before, will also include a parent hash
  - the tree defines the graph for the message -> root -> data -> actual blob files, all in hashes
  - `.git/HEAD`, take the ref, and then it is also a hash which is part of the graph
- content is stored as trees
- branches are just refs, refs are just files
  - lightweight
- for merges, git can handle auto-conflicts by tracing back to most recent common ancestor commit
- there's a stage flag on each commit that will identify if there are conflicts
  - `0` means no conflict