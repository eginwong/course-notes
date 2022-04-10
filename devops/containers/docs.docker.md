# Docker Docs
- [ref](https://docs.docker.com/get-started)

- types of volumes
  - named volumes
    - `docker volume create ..`
    - `docker volume inspect`
  - bind mounts
    - can bind mount to script folder with a watcher like `nodemon` and it will auto-reserve content without having to rebuild container
  - other plugins for more
- keep containers as SRP
  - if two containers are on the same network, they can communicate. Otherwise no