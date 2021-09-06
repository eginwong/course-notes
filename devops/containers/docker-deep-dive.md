# Docker Deep Dive, Nigel Poulton

# The Big Picture
## Containers from 30000 feet
- extra servers sucked
  - vms were introduced
- vms sucked later
  - OS costs CPU, RAM, storage that are unnecessary
  - license costs
  - slow to boot and portability is poor
- containers!
  - same as vms minus the overhead of the OS
  - fast to start, portable
- technology that enabled containers
  - kernel namespaces
  - control groups
  - Docker
- container uses kernel of host machine it runs on
  - windows containers go with windows, and vice versa
  - but recently, windows is starting to support linux containers

## Docker
- Docker is equivocal
  - 1. Docker, the company
    - started as a PaaS but built Docker to support the platforms
    - Solomon Hykes
  - 2. Docker, the container runtime
    - infrastructure plumbing software that runs and orchestrates containers
    - similar to ESXi
  - 3. Docker, the open source project (Moby)
    - goal to break down Docker into modular components
- standard body is Open Container Initiative (OCI)
  - image spec
  - runtime spec

## Installing Docker
- Docker for Windows
  - not for production workloads
  - certain BIOS settings are required, like Hyper-V
- Docker for Mac
  - linux-style
- Docker for Linux
  - via `wget`
  - aim to use non-root users for docker

## The Big Picture
- The Ops perspective
  - use `docker version` to test connectability
  - image is a stopped vm template
    - `docker image ls` to get a list of images locally
    - `docker image pull ubuntu:latest` to pull new image
    - each image gets its own unique ID
  - to run a container: `docker container run -it ubuntu:latest /bin/bash`
    - `docker container run` starts a new container
    - the `it` is the interactive terminal flag
    - next is the image name
    - last is the process we want to run inside the container
    - `Ctrl-PQ` exits without killing the container
  - list containers with `docker container ls`
  - can reconnect with: `docker container exec -it <name_of_container> bash`
  - stop container with `docker container stop` and kill with `docker container rm`
- The Dev Perspective
  - Dockerfile explains how to build the image
  - `docker image build` to create the image
  - `docker image build -t test:latest .`
    - `-t` is for tag
  - to run: `docker container run -d --name web1 -p 8080:8080 test:latest`

# The Technical Stuff

## The Docker Engine
- Main list of parts
  - docker client
  - docker daemon
  - containerd
  - runc
- Originally, it was the Docker daemon + LXC (kernel namespaces + control groups)
  - LXC was 3rd party and was Linux-specific
    - replaced with in-house libcontainer project
    - default execution driver in Docker 0.9+
- current architecture
  - docker client > docker daemon > containerd (container supervisor) > shim > runc (container runtime) > containers
  - runc is a lightweight CLI wrapper around libcontainer
    - fast and goal is to create containers
  - containerd
    - Docker engine needed a bridge between daemon and runc
    - implements execution logic pulled out of the docker daemon
    - container lifecycle management (start, stop, pause, destroy)
  - because running containers and managing containers are decoupled, upgrades can happen without affecting containers
  - on creation of new container, runc is forked into a new parent process that exits after creation
    - then a containerd-shim owns the process and handles keeping STDIN/STOUT streams alive when daemon is restarted and reports the container's exit status back to daemon
      - sort of like an orphaned process
  - in Linux
    - dockerd (docker Daemon)
    - docker-containerd (containerd)
    - docker-containerd-shim (shim)
    - docker-runc (runc)
  - what remains in the daemon?
    - image management, image builds, REST API, authN, security, core networking, orchestration

## Images
- images are like VM templates
  - pull images from image registry
  - images are composed of multiple layers with minimal OS and dependencies
- images are build-time constructs
  - containers are run-time constructs
  - can't delete image without deleting all containers referencing it first
  - all containers running on a Docker host share access to the host's kernel
  - Alpine Linux (4MB) vs. the regular OS size
  - check via `docker image ls`
  - to get images, need to `docker image pull <>`
- images are stored in image registries
  - official vs unofficial repos
  - denoted by `repository:tag`
  - default is the `latest`
    - not always the latest, but the nomenclature
  - third-party registries require the extra prefix if not from Docker Hub
  - tags are purely metadata and can have multiple tags for the same image id
- images consist of read-only layers
  - `docker image inspect <image_name>`
- uses a storage driver that is responsible for stacking layers and presenting them as a single unified filesystem
  - e.g., AUFS, overlay2, devicemapper, btrfs, zfs
  - responsibilities:
    - image layering
    - layer sharing
    - copy-on-write
- layers are shared and help to save space
- all images have cryptographic content hash (aka digest)
  - tags are mutable but hashes are not
  - digests are immutable
  - pull via digest `docker image pull alpine@sha256:...`
- image is a configuration object that lists layers + metadata
- layers are fully independent and have no concept of being part of a collective image
  - each has content hashes based on their contents
  - any changes will generate a new hash
  - push/pull images are compressed to help bandwidth
    - but that changes the image and subsequently the hash?
    - each layer has a distribution hash (compressed version) and content hash to allow for verification of layer
- multi-architecture images
  - registry API supports a fat manifest and an image manifest
    - fat: architectures supported by a particular image
    - image: lists layers that compose a particular image
  - example: when you pull an image, the Docker client will check if the Registry has a fat manifest for that image and if it has an entry for the architecture. If so, map to the actual image manifest
- list docker images: `docker image ls -q`

## Containers
- containers vs VMs
  - VM: physical server > hypervisor (like an OS meant for VMs; takes physical resources like CPU, RAM, storage, NICs) > carved into virtual versions > VMs > install OS on each VM
  - Container: physical server > underlying OS (claims hardware resources) > container engine takes OS resources like process tree, fs, network stack and carves them up into isolated sections > run app in container
  - hypervisors perform hardware virtualization (physical hardware > virtual)
  - containers perform OS virtualization
- VM tax
  - VM model carves low-level hardware resources into VMs
    - costs licenses and OS overhead
  - container model has only one OS
    - starts much faster than VM
    - no kernel required to locate, decompress, and initialize + hardware manipulation
- Running containers
  - `docker version` to ensure that all systems are good to go
  - `docker container run -<options> <image>:<tag> <command>`
  - under the hood, Docker client > Docker daemon > Docker host checks local cache for copy of image. If not, pull from Docker Hub
  - non-TLS port for Docker is 2375, TLS is 2376
- Container Lifecycle
  - data does persist in a container
  - volumes are the preferred way of persisting data though
  - `d` and `it` are mutually exclusive options, `d` is for background daemon
  - `-p <host OS port>:<docker OS port>`
  - `docker image inspect <image>` can show you the DockerFile metadata to explain what commands are running by default in the container
  - `docker container stop` allows for the container 10s to shutdown gracefully SIGTERM instead of SIGKILL

## Containerizing an App
- create Dockerfile that describes app, dependencies, and how to run it
- run `docker image build`
- build context is where the application code is
  - common to put Dockerfile in the build context
- starts with a `FROM` as the base image
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
  - new as of 17.05

## Swarm Mode
- ships default as of 1.12
- concepts
  - native clustering of Docker hosts
  - cluster == swarm, Docker hosts in a swarm are said to be running in _swarm mode_ vs. _single-engine mode_
  - nodes can be either managers or workers
    - managers dispatch tasks to workers
    - tasks are containers == replicas
  - services are a way to run tasks on a Swarm
    - declarative way to set the desired state
      - # number of tasks in a service
      - image the containers in the service will use
      - procedure for updating to newer versions of the image
- swarm configuration and state are stored in a distributed etcd db
  - located on all managers in the swarm
  - hosted in-memory
  - zero-configuration required
- swarm mode uses TLS to encrypt comms, authN nodes, authZ roles
  - includes automatic key rotation
- enabling swarm mode
  - `docker swarm init` to swap mode and create first manager in swarm
    - can specify address to advertise/listen on
    - advertise can be on lb IP address
    - listen and advertise are usually the same
    - be specific, ideally
    - default port is 2377
  - `docker swarm join` can add nodes as workers and managers
  - `docker swarm join-token [manager/worker]` to get the command to run
    - protect your swarm tokens because safety
  - swarm managers have native support for HA
    - they implement active-passive
    - non-leader manager will proxy request to actual leader (active)
  - uses Raft concensus algorithm
    - best practice: deploy odd number of managers
    - don't deploy too many managers (3 or 5)
      - otherwise, you have split brain because you can't reach a quorum
      - the more managers, the longer it takes to reach quorum
  - make sure your managers are in high speed reliable networks across availability zones
- services
  - `docker service create`, specify port, replicas and image
  - swarm constantly runs checks to compare desired state and actual state and reconciles
  - `docker service ls` and `docker service ps <service_name>`
  - `docker service inspect --pretty <service_name>`
  - easy to adjust scale with `docker service scale`
    - swarm-mode runs a scheduling algo to try to distribute tasks across nodes in a swarm
- overlay network is a layer 2 network that connects multiple underlying networks
  - `docker network create -d overlay <name>`
  - can specify a network in a docker service
  - all nodes on the network will redirect to a node that runs the service
  - `docker service update --image <image_name> --update-parallelism <images_to_update_at_a_time> --update-delay <delay>s <service_name>`
  - this command adds to the config of the service for future updates

## Docker overlay networking
- containers must be able to communicate reliably and securely over flat secure layer 2 network
  - `docker network create -d overlay <name>`
  - only the node running on that overlay can see the overlay, to minimize network gossip protocol
  - all nodes on overlay have ip so they can communicate with one another
- Docker overlay networking uses VXLAN tunels to create virtual layer 2 overlay networks
  - built-on top of an L3 network (IP Transport network)
  - in each node on the overlay, there is a VXLAN Tunnel Endpoint that does the encapsulation/de such that it looks like IP/UDP packets as normal
  - in each node, there's a network namespace (like a container but only runs isolated network stack) that connects via a virtual switch (Br0) to the VTEP via UDP:4789.
  - each container than get its own virtual Ethernet connected to the local Br0 virtual switch

## Security in Docker
- Docker platform security contains
  - secrets mgmt
  - docker content trust (DCT)
  - security scanning
  - swarm mode
    - cryptographic node IDs, mutual AuthN, automatic CA config, auto certificate rotation, encrypted cluster store, encrypted networks
    - DCT allows signing images and verifying integrity and publisher of images you pull
    - security scanning for defects
    - secrets are encrypted in flight and stored in encrypted clustre store
- built-in linux security
  - namespaces
    - allows slicing an OS like it's isolated and can allow multiple port use
      - each network namespace gets its own IP and range of ports
    - pid namespace for separate process tree
    - mount namespace allows each to get isolated filesystem
    - inter-process communication namespace: allows sharing memory internally
  - Docker containers are an organized collection of namespaces
  - capabilities allow one to strip root user access to just the pertinent level of capabilities
    - i.e., CAP_CHOWN, CAP_SETUID, CAP_SYS_BOOT