# What every programmer should know about memory, p1
[ref](https://lwn.net/Articles/250967/)

## Introduction
- hardware devs opted to optimize certain subsystems, making them specialized and leaving bottlenecks elsewhere
- generalization used hereafter is for the commoditized hardware
- chipset is common to be Northbridge and Southbridge
  - all CPUs are connected via a front side bus (FSB) to Northbridge
    - contains memory controller, RAM chips
  - Southbridge is commonly referred to as the I/O bridge, which handles comms with devices through different buses (PCI, PCI-E, SATA, USB)
  - RAM has only a single port
- some bottlenecks with design  
  - all access to RAM had to pass through CPU, which was slow; some devices used direct memory access (DMA) which, with Northbridge, could store and receive data in RAM directly without CPU
    - new problem is that DMA requests must compete with RAM access from the CPUs
  - second bottleneck is the bus from Northbridge to RAM, dependent on memory types deployed; limited bandwidth
    - can deal with this through multiple external memory controllers
    - or integrate memory controllers into CPUs and attach memory to each CPU. 

@reread