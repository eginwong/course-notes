# Openjs Node JSNSD certification prep
[ref](https://docs.linuxfoundation.org/tc-docs/certification/lf-candidate-handbook)

## Areas
- Servers and Services – 70%
  - Implementing public facing web servers
  - Creating RESTful HTTP services
  - Consuming other HTTP services
  - Knowledge of HTTP verbs and status codes
  - Processing user input
- Security – 30%
  - Protecting against malicious input
  - Attack mitigation

## TODO LIST
1. Express
   1. random port
   2. GET with query param
      1. buffering GET
   3. POST data
      1. Buffering data
      2. multi-part
   4. PUT: File Uploads
      1. multi-part form data
   5. WebSockets
   6. SMTP Server
2. View Layer
3. Logging
4. Authentication
   1. Session
5. Malicious Input
   1. Buffer safety
   2. JSON pollution
   3. XSS
   4. protocol XSS
   5. Param validation
7. Attack Mitigation
   1. helmet module
   2. dep vulnerabilities
   3. CSRF


## Reference Material
- [node.js 10.x documentation](https://nodejs.org/dist/latest-v10.x/docs/api/)
- Node Cookbook, ch 5,7,8,10

If you work with Node.js every day and you frequently use frameworks like Express, Koa, Restify, Hapi or Fastify then this certification will allow you to officially validate your skills.

- ch 5
  - host and port should be dynamic
  - listen binds
    - can also pass callback for when async process is complete
  - port 0 is a random port
  - `url` module can parse url, `qs` for query string
    - url parses into pathname and query
    - `qs.parse` retrieves the query params as a deconstructed object
    - `url.parse` with a third param can retrieve query params deconstructed as well
  - set a max payload size to protect against DoS attacks
  - check req headers
  - have event listeners for data/end and read chunk of data end
  - `qs.parse(buffer.toString())` can retrieve the data
  - res is a writestream
  - `fast-json-parse` library
  - TODO: multipart-read-stream (BUILD AN UPLOAD SERVER)
  - TODO: post with Buffer.byteLength
  - TODO: WebSockets
  - TODO: email client
- ch 7
  - only serve static assets in dev mode, not production mode
  - order of middleware matters, because of cascading downwards effect
  - can create middleware with `app.use()` to add wrappers around req/res/headers
  - Hapi tends to perform slower
    - creates multiple core http server instances, with multiple connections
    - `onPreResponse` hook for plugin
    - can use labels to handle conditional environment logic
    - labelling uses more ports than necessary in production
  - Koa
    - minimalist framework
  - logging 
    - can pipe `pino` from node index.js to handle logging outside of the web server
    - or `pino-colada`
    - can also log with `morgan`
      - custom messages are not included
    - another option is `winston`
  - implementing authentication
    - express-session
- ch 8
  - auditjs
  - snyk
    - test specific third-party library
  - helmet or lusca
    - provides good default middleware security
    - `X-Frame-Options: SAMEORIGIN` prevents iframe-based Click Jacking
    - `X-DNS-Prefetch-Control: off` to disallow for privacy issues
    - `X-Download-Options: noopen` to protect IE8
    - `X-Content-Type-Options: nosniff` disallows browser from guessing MIME types, stopping MIME attacks
    - `X-XSS-Protection` to filter malicious URL pieces, only protects against Reflected XSS
  - can harden koa/hapi depending on needs by auto-setting headers
  - sanitize and check input
  - buffer safety
    - use `Buffer.from()` instead because it expects strings instead of polymorphic
  - for json validation, best to do schema validation to ensure of any input received from an API Client
    - use ajv
  - XSS guarding
    - use `he` for input escape
    - there are reflected and persistent XSS vulnerabilities
    - html encoding converts certain chars to others, to avoid closing or opening tags
      - `encode` is for HTML attribute context
      - `escape` is for HTML context
    - can create validate function for params to ensure # of keys, types, and expected lengths
    - best practice
      - escape user input
      - escape external data
      - avoid user input from setting protocol handlers in URLS
        - running JS, need to escapeHtml
        - TODO: LEARN ESCAPE HTML
      - enforce param constraints
        - 422 for unprocessable entity
  - preventing CSRF
    - for session, add `cookie: { sameSite: true }`
    - for older browsers, install `csurf` library
      - allows to call `req.csrfToken()` and include as part of hidden input + update
- ch 10
  - Fuge toolkit
    - allows for orchestrating microservice environments
    - can also manage docker
    - `apply` to run shell commands for each individual service managed by fuge
  - set up environment
    - use process.env to retrieve values for port and ips
    - `ADDERSERVICE_SERVICE_HOST`, needs specific formatting to auto-fill values
      - `ADDERSERVICE_PORT_8080_TCP_PROTO`, `ADDERSERVICE_PORT_8080_TCP_ADDR`, `ADDERSERVICE_PORT`
  - `concordant` library has a `dns` object used to resolve values
  - `fuge` also handles service discovery with the proper flags
- hn-latest-stream for streaming data
- sending a js response back for error is sending a JSON object back with type, status, message, and stack
- in express, don't use async functions for the callbacks
  - due to the legacy nature of express, it does not handle rejected promises well and can cause memory leaks
  - add delete/put/post that maps to the internal libraries
  - use process.env to inject service ports as needed
  - beware, may need to add headers individually if trying to forward as "headers" doesn't always work. May need to "setHeader" explicitly
  - express-http-proxy for full proxy
  - sometimes input can be string or arrays, watch out because "split" or "toUpperCase" may not be on arrays
  - `Number.isSafeInteger(Number(n))`
  - to crash with parameter pollution, can pass multiple like `?un=a&un=b`
  - use JSON Schema to validate input or AJV
  - use `req.socket.remoteAddress` for block the ip

## Tips
- know how to write interceptors in your node web framework of choice
- blacklist/whitelist IPs and methods
- know how to call requests within a request
- know and understand how to display errors and status codes
- know how to validate input