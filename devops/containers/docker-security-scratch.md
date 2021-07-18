# Docker Security
- if you need to use SSH private keys to retrieve values during image creation, can add them, install, and then remove + squash the image to hide those keys
  - or, you know, vault
- TwistLock or Aqua for runtime and audit scanning of images
- [helpful security cheatsheet for docker](https://blog.container-solutions.com/hs-fs/hubfs/Imported_Blog_Media/15_06_15_DockerCheatSheet_A41-1024x724-1.jpg?width=1536&name=15_06_15_DockerCheatSheet_A41-1024x724-1.jpg)
- [docker bench security sh script](https://github.com/docker/docker-bench-security)
- limit capabilities so docker internal users cannot be malicious
- read-only mount points are generally concensus good idea