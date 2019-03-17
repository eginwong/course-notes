# Fallacies of Distributed Computing Explained
[ref](https://www.rgoarchitects.com/Files/fallacies.pdf)

1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. There is one administrator.
7. Transport cost is zero.
8. The network is homogeneous. 


- need to address unreliable network
- latency is not zero even if on LAN so we cannot make that assumption
- bandwidth is not infinite so try to limit size of objects when possible
- transport cost is not zero as there is serialization