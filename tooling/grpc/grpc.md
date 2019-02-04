# gRPC

[ref](https://grpc.io/docs/guides/index.html)

## What is it?
> a client application can directly call methods on a server application on a different machine as if it was a local object, making it easier to create distributed applications and services
- define a service, specify methods that can be called remotely with params and return types
- server side will implement the interface and run the gRPC server to handle client calls
- client has a stub that provides same methods as the server
- gRPC makes use of protocol buffers, which serialize structured data
    * message
    * protoc will then generate data access classes in whatever language you need
    * define services in proto files, specifying request and ersponse as messages

## Concepts
- protocol buffers == interface definition language (IDL)
- gRPC has different kinds of service methods:
    * Unary RPC: one request, one response
    * Server Streaming RPC: one request, stream of messages back
        * guaranteed message ordering
    * Client Streaming RPC: client writes stream of messages to server, one response
    * Bidirectional Streaming RPC: both sides send streams of data
- Can specify deadlines and timeouts from the server side for each client call
- Either client or server can cancel an RPC at any time, but does not undo changes
- metadata is also associated with each RPC call, dependent on language

## Authentication


## Further Reading
- [Apache Thrift](https://thrift.apache.org/tutorial/), a similar protocol used by Facebook