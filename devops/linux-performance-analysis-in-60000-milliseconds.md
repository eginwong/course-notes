# Linux Performance Analysis in 60,000 Milliseconds
[ref](https://medium.com/netflix-techblog/linux-performance-analysis-in-60-000-milliseconds-accc10403c55)

```s
uptime
dmesg | tail
vmstat 1
mpstat -P ALL 1
pidstat 1
iostat -xz 1
free -m
sar -n DEV 1
sar -n TCP,ETCP 1
top
```
- `uptime` indicates quick look and how load is handled over past 1,5,15 minute periods
- `dmesg | tail` checks the last 10 system messages, look for perf errors
- `vmstat 1`, print 1s summaries
  - `r` is related to processes running on CPU waiting for a turn, not including IO
  - `free` is memory in kB
  - `si, so`, swap-ins/outs, if non-zero, you're OOM
  - `us, sy, id, wa, st`, breakdowns of CPU time, on average across all CPUs
- `mpstat -P ALL 1`, CPU time breakdowns per CPU
- `pidstat 1`, prints a rolling summary of per-process summary
- `iostat -xz 1`, understanding disks, workload applied and resulting performance
- `free -m`, if they are near-zero in size, higher disk I/O and bad perf
- `sar -n DEV 1`, check network interface throughput
- `sar -n TCP,ETCP 1`, key metrics of TCP to indicate maybe network or server issue, or overloaded server
- `top`