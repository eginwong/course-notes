# Everything you should know about certificates and PKI but are too afraid to ask
[ref](https://smallstep.com/blog/everything-pki.html)

* PKI lets you define a system cryptographically
  * works everywhere and can communicate securely
* > the goal of certificates and PKI is to bind names to public keys

## Glossary
* entity: anything that exists, logically or conceptually
* identity: every entity has an identity; not the same as identifier (names are synonymous with identifiers for this article)
* claim: a claim about a certain attribute
* authentication: process of confirming the truth of some claim
* suscriber/end entity: entity participating in a PKI and can be subject of a certificate
* certificate authority (CA): entity that issues certs to subscribers, an issuer
  * certs that belong to subscribers are sometimes called end entity certs or leaf certs
  * certs belonging to CA are called root certificates or intermediate certs
* relying party: certificate user that verifies and trusts certs issued by a CA
* note: entity can be both a subscriber and a relying party -> single entity with own cert and uses other certs to authenticate remote peers (mutual TLS) 

## MACs and signatures authenticate stuff