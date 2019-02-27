# Network Protocols for anyone who knows a programming language
[ref](https://www.destroyallsoftware.com/compendium/network-protocols?share_key=97d3ba4c24d21147)

## Network routing
- transferring data as buckets from router to router in a chain
- what is the data's destination?
  - IP, internet protocol
  - IPv4 with 32 bits of address space, and IPv6
- how to route?
  - routing tables indicate paths to various groups of IP addresses
  - Border Gateway Protocol (BGP) used to exchange routing and reachability info among autonomous systems (AS) on the Internet
    - send keep-alives to peers
- IP & BGP don't provide a way to transfer data reliably; no way to detect packet loss and request transmission

## Packet switching
- tend to break down large files into 1,400B chunks for transmission

## Out-of-order packets
- transfer done over HTTP, a protocol layered over the Transmission Control Protocol (TCP)
  - done via a sequence number to ensure order
  - the higher-level protocol (HTTP) contains a "Content-Length" header to indicate completion, TCP doesn't know otherwise
  - why HTTP headers are needed

## Transmission windows and slow start
- acknowledgments (ACKs) are sent from computer to server every so often
  - defined in Linux kernal as `TCP_INIT_CWND`
    - stands for congestion window
- begin with slow start and then ramp up and then back down
  - keep moving data as quickly as is allowed until a lost packet
  - use of asymmetric windows keep up max throughput from up/downstream bandwidths
  - both client and server send ACKs to maintain respective windows

## Reliable transmission
- will continue to send duplicate ACKs if packet is lossed
  - if they come in the wrong order, probably only send a single extra ACK
- when sender receives three duplicate ACKs in a row, it assumes packet is lost and retransmits it
  - TCP fast retransmit

## Physical networking
- Ethernet is most well known
  - RJ45 connectors
  - physical layer protocol
    - how bits turn into electrical signals in a cable
  - link layer protocol
    - describes direct connection of one node to another
  - two primary jobs
    - each device needs to notice that it's connected to something
    - some parameters like connection speed need to be negotiated
  - once link is established, Ethernet needs to carry data
    - done so via frames, 1 500B payloads, plus 22B for header information
      - checksums, source/dest MAC address, payload length
    - frame wrapped in another layer of headers to form the full packet
      - preamble of 56 b of alternating 1/0s to synch clocks
      - 8b start frame delimiter which is the number 171, end of the preamble
      - frame itself
      - interpacket gap of 12B where the line is left idle

## Networking meets the real world
- Ethernet bits getting mapped to real-world physical wire bits
- the encoding balances the 0s and 1s to avoid physical imbalance
  - imbalance leading to eventual bit corruption

## The interconnected network stack
- to squeeze every byte out of small requests, HTTP/2 specifies compression for headers