# Containers From Scratch

2018-11-03 16:36:19

[ref](https://www.youtube.com/watch?v=8fi7uSYlOdc)

- when you run `ps` on terminal, it looks up all processes in `/proc`
- when you run `/proc/self`, you spawn another process
- can see metadata of process, using `/proc/####` and can view its root directory, `/proc/####/root`
    * that's how containers generally mount a different namespace and "world" 
    * in order to create a different proc space, need to mount it within the container world
- namespaces limit what you can see, with the `chroot` command
- Cgroups limit what you can use (i.e. memory, cpu, i/o. process numbers)
    * `/sys/fs/cgroup/memory/docker/###`, will store the metadata and the limits of what resources are available