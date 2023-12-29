# Docker Presentation Ideas

- intro
  - quick history of servers => vms => containers => serverless?
  - vms vs containers
    - what's the big deal with them?
    - license costs
    - OS overhead/CPU
- okay, I want one. How do I get one?
  - building / running
- deep dive
  - current architecture
    - components to Docker
    - docker client
    - docker daemon
    - containerd
    - runc
  - images
    - like vm templates
    - storage driver than enables layer creation
      - image layering
      - layer sharing
      - copy-on-write
    - tags mutable but digests are not
    - layers vs images
      - immutable
    - commands for layers!
      - `LABEL` for metadata as kv pairs
      - `RUN` runs commands and installs a new layer on top of the image
      - `COPY` from and to, to move app files from the build context
      - `WORKDIR` sets current working directory for further docker commands, relative to the image
      - `EXPOSE` for ports is a metadata
      - `ENTRYPOINT` is also metadata for the image to run on
      - `docker image inspect <name>` to see the steps in the configuration of the image
      - CAPS case is best practice for `INSTRUCTION argument`
      - two types of instructions
        - creates new layers: anything that adds content
        - no new layers: only metadata
      - `docker image history <name>` to see the effect/changes of each action
        - general operation is to run instruction inside a temporary container; create layer; delete temp container
      - each `RUN` command adds a new layer
        - best practice: combine many commands together into one `RUN` call
      - multi-stage builds
        - single Dockerfile with multiple `FROM` instructions
          - each `FROM` is a new build stage that can easily `COPY` from previous stages
        - create multiple `FROM` and use the last one to `COPY` artifacts from the previous stages into this one
          - this way, you can drop unnecessary build files
    - EXERCISE
      - building layers and noting the difference
  - containers
    - under the hood, Docker client > Docker daemon > Docker host checks local cache for copy of image. If not, pull from Docker Hub
    - non-TLS port for Docker is 2375, TLS is 2376
    - data persistence in containers
- swarm mode vs k8s?
- overlay, services, security ...



to reduce overall size of image, you can look at what's adding space via:
`docker history --human --format "{{.CreatedBy}}: {{.Size}}" <image_name>`

- talk about containers from scratch (watch again!)