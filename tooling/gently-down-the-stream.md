# Gently Down the Stream
[ref](https://www.gentlydownthe.stream/)

- kafka, solves scalability challenges and breaks coupling
- events > records
  - records places on topics
  - using persistent store, otters can read at their own pace
- Producers and Consumers
- created partitions in the topics as there were too many
  - a Subset Leader would determine which listener otter would listen on which partition
  - this consumer group pattern allows for HA and Fault Tolerance
  - 