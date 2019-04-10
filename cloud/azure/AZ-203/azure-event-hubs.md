# Azure Event Hubs

- push notifications delivered through platform-specific infra called Platform Notification Systems (PNSes)
  - benefits:
    - cross platforms/backends
    - telemetry
    - scalability
    - security
    - delivery patterns
  - challenges:
    - platform dependency
    - scale, lots of calls because of refreshing tokens
    - routing
- how do you choose a messaging service?
  - event grid, reactive programming, event distribution (discrete), react to status changes
  - event hubs, big data pipeline, event streaming (series), telemetry and distributed data streaming
  - notification hubs, multi-platform push notifications, push notification service (PNS), sending mass event notifications to multiple platforms
  - service bus, high value enterprise messaging, message, order processing and financial txns

# Azure Search
- search as a service cloud solution, provides APIs for easy search
- create and load data to azure search index
- `Indexes.Create()` and `Indexes.Delete()`
- We need a `ISearchIndexClient indexClient` to make use of your index
- Construct IndexBatch
- Call `Documents.Index(batch)` to upload the batch to the search service
- `search` will look in searchable fields, indices
- `filter` will apply a boolean predicate
- some questions related to API; note patterns in the API instead