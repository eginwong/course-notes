# Develop for the cloud and for Azure storage

## Develop for Azure Storage - CosmosDB
- set specific virtual network for cosmosdb
- create a cosmosdb collection
  - database, collection, partitionkey, throughput, unique key
- develop cosmosdb solution
  - query requires FeedOptions
  - DocumentClient
- principle of data consistency
  - strong, bounded staleness, session, consistent prefix, eventual
  - TODO: REVIEW THIS

## Relational Databases
- create a SQL db
  - create db, then server
  - publicly available server, with whitelist
  - can create based on DTU or by cores for performance
  - collation option
- geo-replication
  - can force failover and extra reading
- using the SQL database firewall
  - whitelisting IP
- SQL development
  - `System.Data.SqlClient`
  - use connectionString from connection strings
  - `new SqlConnection`
  - `conn.Open()` and `conn.Close()`

## Develop for the Cloud
- message-based integration architecture
  - Sendgrid, REST API to send and receive email messages over HTTP
  - Event Grid, connects event sources inside Azure to a lot of event handlers
  - Relay Service, allows message to be passed from Internet inside the company firewall to specific endpoints such as WCF
    - no changes required for firewall
    - messages pass over that link
    - hybrid connections vs WCF Relays
      - hybrid: web sockets, multi-platform support, bizTalk services
      - WCF relay: legacy offering, only supports HTTP communication, limited platform support
  - notification hub, sends messages to mobile phones
  - azure event hub, can receive messages from event producer and consumers
    - big data streaming platform, event ingestion service
    - HTTPS, AMQP
    - for IOT
  - service bus, enterprise-grade messaging queue, at least once and at most once processing
  - microsoft graph API, office 365 integration
- Develop for autoscaling
  - on and off, adding resources, unpredictable autoscaling, predictable autoscaling  

## Tips
    - Different types of storage accounts and when to use them
    - Different types of storage types and what they're for
    - Storage redundancy and when to use each