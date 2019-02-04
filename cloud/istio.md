# Istio

## For Security
- accordingly without application code, can lock down inter-service calls
- Istio Auth
- trust the endpoints, not the network
- strong mutual authentication based on service identity and service level authorization
- service in a pod to speak with Envoy (proxy) that communicates with another envoy via mTLS + Secure Naming
    * using Cluster CA which will provide generation, deployment, rotation, and revocation
    * Kubernetes service accounts, to identify WHO the service runs as, encoded in the SAN of an X.509 cert
        * administrators can configure access to service account via RBAC feature
    * Service-to-service, mutual TLS
        * service identity is not expressed as a bearer token
- Istio Auth provides a per-cluster Certificate Authority (CA) and automated key and cert mgmt
    * generates key + cert pair for each service account
    * distributes both to appropriate pods via k8s secrets
    * rotates keys and certs periodically
    * revokes key and cert pair when necessary
- provides Network Isolation and API and Service Endpoint Management container security
- secure by default, minimal or no application change
- for origin authentication (JWT), the **application** is responsible for acquiring and attaching the JWT credential to the request
- authentication policy apply to requests that a service receives, but done through configuration settings
- service accounts are for processes which run in pods (local to namespace), user accounts are for humans (global)

## High-level Architecture
- **Citadel** for key and cert mgmt
- **Sidecar and perimeter proxies** for secure communication between client and server
- **Pilot** to distribute authentication policies and secure naming info to proxies
- **Mixer** to manage authorization and auditing
- ![reference architecture](https://preliminary.istio.io/docs/concepts/security/architecture.svg)
- client: server identity checked against secure naming info to see if authorized to use service
- server: determine via authorization policies to see if clients can access the service
- Citadel watches k8s apiserver and creates SPIFFE cert and key pair for each existing and new service account, stored as k8s secrets
    * mount cert and key pair to pod via k8s secret volume
    * Cital rotates cert after lifetime
    * Pilot generates secure naming info and passes along to Envoy sidecar
- Authentication
    * **transport authentication**, service-to-service, uses mutual TLS
    * **origin authentication**, end-user, verifies original client making request and uses JWT validation with OpenID Connect provider on developer side
- mTLS
    * routes all outbound traffic to Envoy sidecar which initiates mTLS handshake, and then forwards to client side Envoy for real service
- can specify `origins` authentication for specific issues of JWTs 
- uses RBAC
- [ref](https://www.infoq.com/articles/istio-security-mtls-jwt)
- Istio configured with k8s Custom Resource Definition (CRD) objects
    * Security policies are configured via Policy and DestinationRule objects
        * Policy: security settings of a service, services in namespace will expect any incoming traffic to use mTLS
        * DestinationRule: will specify how clients talk to a service (circuit breaking, load balancing, TLS)
        * Istio will take care of keys and certs 
    * Use policies to handle JWT for services as well

## In the wild (miscellaneous)
[ref](https://istio.io/docs/tasks/security/role-based-access-control/)
- can have namespace-level access control, 1 per ns
- can have service-level access control, 0 or many
- can have only one mesh-wide policy
    * define `serviceRole` and then a `serviceRoleBinding`

## Open Questions
1. Setting appropriate request headers for authorization and authentication
    1. https://istio.io/docs/tasks/telemetry/distributed-tracing/
2. Learning where and how to create/consume JWTs
3. Other security concerns + policy
4. How to retrieve security context
    1. https://istio.io/docs/tasks/telemetry/distributed-tracing/, read from header param
5. OAuth2 Token Checking?
   1. https://github.com/istio/istio/blob/master/samples/bookinfo/src/reviews/reviews-application/src/main/java/application/rest/LibertyRestEndpoint.java
6. Fine-grained authorization framework
7. Using service account for auth-based

how would you do IOT, enforce permission via role, which can only be done via token