# HashiCorp Consul

## Intro
* Handles Service Discovery, Health Check, and Distributed Configuration
* Service Mesh that also generates/distributes TLS certs 
* distributed, HA
* each app has Consul Agent to a cluster of Consul Servers that replicate and elect a leader

## Architecture
* distributed nature via gossip protocol will more quickly determine failure than heartbeat
* minimal replication, will rather forward to other datacentre

## Practical application
* project called `Spring Cloud Consul` that provides easy integration


## Questions to ask before use
* currently devops from jenkins pulls configmap information
    * http://code.hootsuite.com/jenkins-kubernetes-and-hashicorp-vault/ 
* Vault can persist data in Consul's kv store
* jenkins pull from Consul?
    * https://wiki.jenkins.io/display/JENKINS/Consul+Plugin
    * https://github.com/jenkinsci/hashicorp-vault-plugin does not support k8s
* store token on jenkins side
    * response wrapping for build purposes: https://youtu.be/QxE0Hkp-lAs?t=1411 
* do we still need config server?
    * yes if we want transparent changes to app server
* Don't need look Spring-Cloud-Vault, always either Consul or Cloud Config
* Do we encrypt everything?