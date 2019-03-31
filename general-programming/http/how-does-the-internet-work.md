# How Does the Internet Work?
[ref](https://web.stanford.edu/class/msande91si/www-spr04/readings/week1/InternetWhitepaper.htm)

- each computer connected to the internet must have a unique address, their IP
  - nnn.nnn.nnn.nnn, where nnn is a number between `0 - 255`
- if connected to the internet through an ISP, you usually have a temporary ISP address
  - if you connect via LAN, your computer might have a permanent IP address or obtain a temporary one from the Dynamic Host Configuration Protocol (DHCP)
- communication between computers occurs through the **protocol stack**
  - built-in to OS
  - TCP/IP looks like Application Protocols > Transmission Control Protocol (TCP) > Internet Protocol (IP) > Hardware
  - big messages split into chunks called packets
  - each packet is assigned a port number for multi-processing
  - once converted, messages are sent through ISP to their router which does more forwarding
  - once reached, reverse through protocol layer to decipher message
- internet infrastructure
  - large networks composed of Network Service Providers (NSP) which peer with each other to exchange packet traffic
  - Each NSP must connect to three Network Access Points (NAP) and also interconnect with Metropolitan Area Exchanges (MAE) which are privately owned
  - MAE and NAP are known as Internet Exchange (IX) points
  - NSPs also sell bandwidth to smaller networks like ISPs and other bandwidth providers
- Internet Routing
  - routers are packet switches and more like a spider network communicating with the next route
  - if IP address is found in routing table, route there
  - if not, route default, which is often to a larger backbone scale to find the IP
- Domain Names and Address Resolution
  - uses Domain Name Service (DNS) which is a distributed database
- Application Protocols
  - HTTP
  - SMTP
- TCP layer
- IP layer