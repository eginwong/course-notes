# Istio

## For Security
* accordingly without application code, can lock down inter-service calls
* Istio Auth
* trust the endpoints, not the network
* strong mutual authentication based on service identity and service level authorization
* service in a pod to speak with Envoy (proxy) that communicates with another envoy via mTLS + Secure Naming
    * using Cluster CA which will provide generation, deployment, rotation, and revocation
    * Kubernetes service accounts, to identify WHO the service runs as, encoded in the SAN of an X.509 cert
        * administrators can configure access to service account via RBAC feature
    * Service-to-service, mutual TLS
        * service identity is not expressed as a bearer token
* Istio Auth provides a per-cluster Certificate Authority (CA) and automated key and cert mgmt
    * generates key + cert pair for each service account
    * distributes both to appropriate pods via k8s secrets
    * rotates keys and certs periodically
    * revokes key and cert pair when necessary
* provides Network Isolation and API and Service Endpoint Management container security
* secure by default, minimal or no application change
* for origin authentication (JWT), the **application** is responsible for acquiring and attaching the JWT credential to the request
* authentication policy apply to requests that a service receives, but done through configuration settings