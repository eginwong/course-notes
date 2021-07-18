# Common Dockerfile Mistakes
[ref](https://blog.developer.atlassian.com/common-dockerfile-mistakes/)

- `ADD` can untar, get remote urls, and add files to image while `COPY` moves the entire file without processing
- `apt-get upgrade` on debian images will stop images from having consistent immutable builds because it updates all dependencies to latest
  - use `apt-get-update` instead to control
- avoid `:latest` for `FROM` images, as this can make your containers brittle
- `ENV` should only be declared for build time, and `EXPOSE` at the end for external
- Docker uses only the last `FROM` statement
- `VOLUME` only exist at run time, not build time
- use a key management system like Vault for runtime access and avoid them in your containers
 