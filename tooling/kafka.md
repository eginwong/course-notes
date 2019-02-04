# Kafka Documentation

> Apache Kafka is a distributed streaming platform

- pub/sub
- store streams of records in fault-tolerant way
- process streams of records as they occur
- meant for real-time streaming data apps

## Architecture
- run as a cluster
- stores streams of records called *topics*
- record = key, value, timestamp
- almost like a structured commit log, where subscribers can join at any point
- have leaders and followers, to enable replication