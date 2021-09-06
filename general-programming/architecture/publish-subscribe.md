# Publish/Subscribe (pub/sub) Architecture

[ably on pubsub](https://ably.com/topic/pub-sub)
- host publishes message for subscribers to sign up to
- decouples
- used to use IPC or hard-coding but now need dynamic scaling
- not suitable for media streaming
- overkill for simpler systems
- async can cause logistical challenges

[GCP](https://cloud.google.com/pubsub/architecture)
- terminology
  - message
  - topic
  - subscription
    - named entity that represents an interest in receiving messages from a particular topic
  - publisher/producer
  - subscriber
- judging performance
  - availability
  - scalability
  - latency
    - amount of time to deliver message to subscriber
    - amount of time to acknowledge a published message
- monitoring
- control plane v data plane
  - control: handles assignment of publishers and subscribers to servers on data plane
  - data: layer that handles moving messages between publishers and subscribers

[Zapier on webhooks](https://zapier.com/engineering/webhook-design/)
- webhook-enabled API can save on system resources instead of polling
- treat webhooks for REST endpoint as any other resource
  - static: hardcode url in admin
  - dynamic: allow users to create on the fly
- how to trigger webhook operation?
  - 1. hardcode event trigger to check existing webhooks
    - not scalable beyond testing or poc
  - 2. create a db queue and have another app poll this instead
  - 3. create an actual queue
    - still need a consumer for this queue

[Ably on webhooks](https://ably.com/topic/webhooks)
- user-defined HTTP callbacks
- DropBox
- GitHub
- HubSpot

[Workos on webhooks](https://workos.com/blog/building-webhooks-into-your-application-guidelines-and-best-practices)
- consider auth for webhooks by passing a challenge string or echo to get values back
- OR send useless data like the id without actual meat
- encrypt your webhook auth using a symmetrical key
- test payload by sending only via HTTPS and not for self-signed certs
- error scenarios
  - mark broken endpoints
  - try exponential backoff to increase time between retries
  - set a const to ensure you don't have insane retry times
- don't guarantee order or duplicates
- start with simple relational db to store url, userid/email, last event sent time, broken

[new stack on dev experience of webhooks](https://thenewstack.io/webhooks-the-building-blocks-of-an-event-driven-architecture/)
- focus on dev experience by having a "test webhook" function
- 