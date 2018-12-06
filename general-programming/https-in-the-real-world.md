# HTTPS in the real world
[ref](https://robertheaton.com/2018/11/28/https-in-the-real-world/)
[OG ref](https://robertheaton.com/2014/03/27/how-does-https-actually-work/)
Robert Heaton

* HTTPS is HTTP with generous layer of SSL/TLS encryption layer over top
    * verifies that you are talking directly to the server you think you are talking to
    * ensures only the server can read what you sent and vice versa
    * done through a handshake
        * client sends request with info including cipher suites and max SSL version it supports
        * server responds with decision based on client's preferences
        * server sends SSL certificate and verifies to see if trusted implicitly or by CA
            * sometimes the client also needs to send SSL but only for super seecure cases  
        * symmetric algo uses a single key for both encrypt/decrypt and need to be agreed upon
            * otherwise, need to use public/private keys
        * client generates random key, encrypts with agreed upon algorithm and sever's public key and then completes
* trust based on verified CA certs or digital signatures otherwise
    * done through a certified authority signing with private key and letting others decrypt with public key available to others
    * only the trusted source can encrpyt using the private key
    * can have self-signed but not reliable
    * you can trust the public key embedded in the SSL cert because although they are public (the certs), you can only decrypt if you have the private key, which is usually not the case
* Complications
    * > Your private key may not stay private
        * can isolate to only a specific fleet of private key-wielding servers to aggressively lockdown
        * certificate revocation log (CRL), monolithic, to list all compromised certs
            * not a good solution, as list can grow and connection may not always be there
        * Online Certificate Status Protocol (OCSP) meant to scale cert revocation
            * handles using a dict lookup but there is potentially a solution of offline server with OCSP-stapling
            * site's server to query the OCSP server to check if its own cert is valid and expires
            * experimental with `Must-Stable` flag to true on certs
        * Key rotation
    * > A CA's private key may not stay private
        * Root CAs have certificates hardcoded into browsers' trust stores
        * often use intermediate signed certs from the Root for day-to-day signing and lock down the Root CA in a hardware security module (HSM)
    * > The CAs that you trust to do the right thing will not always do so