# What does it mean to listen on a port?
[ref](https://paulbutler.org/2022/what-does-it-mean-to-listen-on-a-port/)

- when you listen on a port, you’re listening on a combination of a port, an IP, a protocol, and an IP version
  - unless you listen on all local IPs. And if you listen on all IPv6 IPs, you also listen on all IPv4 IPs, unless you specifically ask not to before you call bind.
- OS has a hash map from a port and IP pair to a list of sockets, for each combination of TCP or UDP, IPv4 or IPv6.”
  - also listening on all ‘home’ IPs, and to be able to find a socket listening on IPv6 from an IPv4 IP.