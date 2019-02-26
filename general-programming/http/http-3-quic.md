# HTTP/3, QUIC
[ref](https://blog.cloudflare.com/the-road-to-quic/)
[ref](https://ma.ttias.be/googles-quic-protocol-moving-web-tcp-udp/)

> Quick UDP Internet Connections
> ... encrypted-by-default Internet transport protocol
> ... replace TCP and TLS on the web

[TCP Fast Open](https://en.wikipedia.org/wiki/TCP_Fast_Open) will improve TCP but it isn't widely adopted yet (storing a cookie on client header to speed up TLS acknowledgment)

## Why is QUIC needed?
- much faster iteration cycles as updates to TCP can take years or decades due to regulation
- QUIC would replace TLS and parts of HTTP/2
- implements its own [crypto-layer](https://docs.google.com/document/d/1g5nIXAIkN_Y-7XJW5K45IblHd_L2f5LTaDUDwvZ5L6g/edit) so no need for TLS 1.2
- head-of-line blocking means block when TCP packet is missed because processing order matters
- FEC, forward error correction, every packet includes enough data of other packets such that a missing packet can be reconstructed without having to retransmit
    * each packet is actually contains more payload (about 10%) than necessary, for contingency
- TCP needs quadruplet (source,dest ip/port) but UDP has **Connection UUID** which can be preserved between networks
- firewall needs to be opened at 443/UDP on in and out ports

## Improvements
- QUIC has been accepted into IETF and is different from its predecessor, gQUIC
- authentication and encryption from the transport protocol
- QUIC handshake combines TCP + TLS handshakes, which will provide authentication for endpoints and negotiation of cryptographic parameters
    * requires only single round trip between client and server as opposed to two
- also encrypts additional metadata
- HTTP/2 could multiplex different HTTP requests onto same TCP connection which better utilized bandwidth (as opposed to multiple TCP/TLS connections for each new parallel request)
    * QUIC does the same but multiplexes onto different QUIC transport streams which means individual streams are not all affected by packet loss that would affect one stream (HTTP/2 has head-of-line blocking which would affect all)
- built on top of UDP, which means that NAT routers that don't support QUIC can have arbitrary timeouts
- in order to reduce data sent, flatten headers to refer to previously sent headers
    * QPACK will ensure order sent in ONLY the headers