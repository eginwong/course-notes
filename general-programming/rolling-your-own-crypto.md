# Rolling your own Crypto
[ref](http://loup-vaillant.fr/articles/rolling-your-own-crypto)

- be extremely careful, never do it alone
- crypto is one of the most critical pieces of infra out there, easy to pass all tests and still be broken

- security before crypto
  - avoid memory corrupting languages like C or C++
  - don't trust inputs
  - keep program simple and modular
  - write tests, code reviews, static analysis
  - make sure users can tell you about vulns before nefarious users do
  - have security experts audit your software

- using crypto
  - confidentiality
    - not that strong
    - can infer from metadata
  - integrity
    - not optional
    - can forge messages, ciphertext malleability
    - need to use message authentication codes (MAC) to ensure real user
    - that's why people use nonces to throw off people, but only once ever
  - authentication
  
- choosing crpyto
  - All-in-one: TweetNaCl or Libsodium
  - Encryption: Chacha20 with 256b keys; don't use AES
  - Integrity: Poly1305
  - Hash: Blake2b, faster than MD5