# Designs, Lessons, and Advice from Building Large Distributed Systems
[ref](https://www.cs.cornell.edu/projects/ladis2009/talks/dean-keynote-ladis2009.pdf)

- servers -> racks -> clusters
- lots of ways for hardware to fail
  - slow disks
  - bad memory
  - misconfigured machines
  - failure and failure and maintenance
- protocol buffers
  - self-describing, multi-lingual
  - efficient to encode/decode, compact serialized form
- numbers to know:

|                                       |                   |
| ------------------------------------- | ----------------- |
| L1 cache reference                    | 0.5 ns            |
| Branch mispredict                     | 5 ns              |
| L2 cache reference                    | 7 ns              |
| Mutex lock/unlock                     | 25 ns             |
| Main memory reference                 | 100 ns            |
| Compress 1K bytes with Zippy          | 3 000 ns          |
| Send 2K bytes over 1 Gbps network     | 20 000 ns         |
| Read 1 MB sequentially from memory    | 250 000 ns        |
| Round trip within same datacenter     | 500 000 ns        |
| Disk seek                             | 10 000 000 ns     |
| Read 1 MB sequentially from disk      | 20 000 000 ns     |
| Send packet CA->Netherlands->CA       | 150 000 000 ns    |

- write micro benchmarks to quickly validate assumptions
- use variable length encodings (CPU fast, memory/bandwidth expensive)
- think about low avg. times, 90, 99% matter
- worry about variance
- MapReduce solves reading a lot of data, mapping, reducing into some other summation
- BigTable is hardcore Google solution