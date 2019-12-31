# Everything you should know about certificates and PKI but are too afraid to ask
[ref](https://smallstep.com/blog/everything-pki.html)

- PKI lets you define a system cryptographically
  - works everywhere and can communicate securely
- > the goal of certificates and PKI is to bind names to public keys

## Glossary
- entity: anything that exists, logically or conceptually
- identity: every entity has an identity; not the same as identifier (names are synonymous with identifiers for this article)
- claim: a claim about a certain attribute
- authentication: process of confirming the truth of some claim
- suscriber/end entity: entity participating in a PKI and can be subject of a certificate
- certificate authority (CA): entity that issues certs to subscribers, an issuer
  - certs that belong to subscribers are sometimes called end entity certs or leaf certs
  - certs belonging to CA are called root certificates or intermediate certs
- relying party: certificate user that verifies and trusts certs issued by a CA
- note: entity can be both a subscriber and a relying party -> single entity with own cert and uses other certs to authenticate remote peers (mutual TLS) 

## MACs and signatures authenticate stuff
- message authentication code (MAC) is bit of data to verify which entity sent a message and that it hasn't been modified
  - hash output is a MAC, sent along with message to some recipient
  - shared secret + message into a hash, then use shared secret to decode
  - don't try to roll your own MAC algorithm, use HMAC, cryptography
- signature is similar to MAC but use key-pair instead of shared secret
  - signature can be verified using a public key but only generated with corresponding private key
  - if only one entity knows private key, we get **non-repudiation** property
    - no one else possibly could have signed the data

## Public key cryptography lets computer see
- Certificates and PKI are built on public key cryptography / asymmetric cryptography
  - key pairs
    - public key shared with world
    - private key kept confidential
  - can encrypt data with public key and only decrypt with private key
  - can sign data with private key and public key can verify its signature

## Certificates: driver's licenses for computers and code
- certificate is a data structure that contains a public key and a name, then signed
- entity that signs a certificate is the issuer (or CA) and entity named in cert is the subject

## X.509, ASN.1, OIDs, DER, PEM, PKCS
- X.509 v3 certs work out of the box with HTTPS
  - format is ASN.1 (Abstract Syntax Notation, like JSON or protobuf)
  - ASN.1 has a special data type, the object identifier (OID)
    - like a URI, has tag data
  - ASN is encoded cmmonly with distinguished encoding rules (DER) or basic (BER)
    - straight binary, and so are packed in Privacy Enhanced EMail (PEM) files
      - PEM is a base64 encoded payload between header and footer
      - lot of inconsistencies here
    - Other envelope formats are part of a suite of standards called Public Key Cryptography Standards (PKCS)
    - private keys are encrypted at times as well, so the whole standards thing isn't all followed

## Public key infrastructure (PKI)
- PKI is umbrella term for stuff we need in order to issue, distribute, store, use, verify, revoke, and manage and interact with certs and keys
- Web PKI vs Internal PKI
  - Web PKI via browser through HTTPS URL
  - Internal PKI run yourself, for your own stuff like issue lots of certs, control details, etc.

## Trust & Trustworthiness
- relying parties are pre-configured with a list of trusted root certs in a trust store
- root certs in trust stores are self-signed, meaning subject and issuer are the same
  - "Mike says Mike's public key is blah"
- Where do these trust stores come from?
  - Web PKI, rely on browsers 
    - Apple's root certificate program used by iOS and macOS
    - Microsoft's root cert program used by Windows
    - Mozilla's root cert program by their products, Linux distros
    - Google, built off Mozilla's and has a blacklist for who it doesn't trust
  - not very trustworthy, and browser community is beginning to audit CAs for compliance
- a lot of tools out there to keep security but not a lot of people follow protocols

## What's a CA
- trusted cert issuer
- vouches for the binding between a public key and a name by signing a cert
  - really just another cert and private key to sign other certs
- Web PKI root CAs can't automate cert signing, for security purposes
  - ideally keep private keys offline, with good physical security
  - create intermediate certs, which can sign and issue leaf certs which are then used to automate more
  - bundle of certs (leaf, intermediate, root) forms a cert chain
  - for a subscriber (web servers), you'll need to provide cert bundle that can be stored in PEM objects
- to validate certificate, relying party verifies leaf and intermediate through certificate path validation
  - **DON'T DISABLE THIS AUTHENTICATION**
  - encryption without authentication is pretty meaningless
- can expire certs, and you can get a cert by a subscriber generating a key pair and submitting a request to a CA to sign it if all good
- Naming things
  - X.509 used distinguished names (DNs) to name subject of a certificate (the subscriber)
    - no need to use extra fields, just the common name
    - best practice is to leverage subject alternative name (SAN) X.509 extension to bind a name in a cert
    - SANs in common use
      - email addresses
      - domain names (DNS)
      - IP addresses
      - URIs
    - can have multiple SANs or wildcards
- Generating key pairs
  - once we have an ame, need to generate a key pair before creating a cert
  - let subscriber generate its own private key
    - elliptic curve keys over RSA keys, but if RSA, >= 2048 bits <= 4096 bits
    - ECDSA, the P-256 curve is best 
  - afterwards, must get leaf cert from CA
    - CA must prove public key bound is subscriber's public key
    - name bound is subscriber's name
    - submit a certificate signing request (CSR) to CA, in ASN.1 structure
      - CSR contains public key, name, signature, self-signed with private key of CSR
      - identity proofing, CA receives CSR and validates via domain (DV), organization (OV), or extended (EV) certs
        - either through DNS records or money and time with corporate officers
- expiration
  - remove old private keys as well
  - remember to renew them
- revocation
  - depends on RPs to actually respect the revokatino of the cert
  - can issue short certs and don't let them be renewed to passively revoke
  - use Certification revocation Lists (CRLs) or Online Certificate Signing Protocol (OCSP) 
    - CRLs are long lists and are often cached so not as useful
    - can DOS a CRL server so that other websites cannot check revocation lists
    - OCSP allows RPs to query a responder with cert to check revocation status, but is a privacy issue
