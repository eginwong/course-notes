# ~jpetazzo/Putting data in a volume in a Dockerfile
[ref](http://jpetazzo.github.io/2015/01/19/dockerfile-and-data-in-volumes/)

- `ADD` downloads files if passed an url
- `VOLUME` will create a volume but will add the data from previous commands, which involves copying all files over
- although metadata, this copy operation occurs each time a container is created from the image
- instead, split into two containers for app vs data, or leave only tiny amounts of data on image