# Docker Security Best Practices
[ref](https://cloudberry.engineering/article/dockerfile-security-best-practices/)

1. Do not store secrets in environment variables
2. Only use trusted base images
3. Do not use ‘latest’ tag for base image
   1. Do not upgrade your system packages
4. Avoid curl bashing
   1. Do not use ADD if possible
   2. you pull in potentially malicious data
5. Do not root
   1. do not sudo