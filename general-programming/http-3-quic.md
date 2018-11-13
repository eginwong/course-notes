# HTTP/3, QUIC
[ref](https://blog.cloudflare.com/the-road-to-quic/)

> Quick UDP Internet Connections
> ... encrypted-by-default Internet transport protocol
> ... replace TCP and TLS on the web

## Improvements
* QUIC has been accepted into IETF and is different from its predecessor, gQUIC
* authentication and encryption from the transport protocol
* QUIC handshake combines TCP + TLS handshakes, which will provide authentication for endpoints and negotiation of cryptographic parameters
    * requires only single round trip between client and server as opposed to two
* also encrypts additional metadata
* HTTP/2 could multiplex different HTTP requests onto same TCP connection which better utilized bandwidth (as opposed to multiple TCP/TLS connections for each new parallel request)
    * QUIC does the same but multiplexes onto different QUIC transport streams which means individual streams are not all affected by packet loss that would affect one stream (HTTP/2 has head-of-line blocking which would affect all)
* built on top of UDP, which means that NAT routers that don't support QUIC can have arbitrary timeouts
* in order to reduce data sent, flatten headers to refer to previously sent headers
    * QPACK will ensure order sent in ONLY the headers