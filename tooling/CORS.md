# Same-Origin Policy

- browsers automatically attach cookies bounded to a destination domain
- Without SOP, Cross-site Request Forgery (CSRF) attacks are simple
- HTML in browser can make cross-origin requests with `<img>` or `<script>`, and `<iframe>` tags
- origins are equal if protocol, host, and port are the same
- CORS actually relaxes security and has two sorts of requests
    * Simple requests: doesn't trigger pre-flight requests
        * GET, HEAD, POST methods
        * doesn't have headers other than in specification
        * only allowed values for Content-Type header are `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`
    * Preflight requests: sends an OPTIONS request to determine if safe to send
- For simple requests:
    1. initiate AJAX request
    2. browser notices request is cross-origin and adds Origin request header
    3. CORS-configured server checks Origin header and if allowed, sets Access-Control-Allow-Origin header
    4. When response reaches browser, will check Access-Control-Allow-Origin and original Origin of request
- For preflight requests:
    1. Initiate Ajax request
    2. notices that preflight is required
    3. sends preflight first, which includes Origin, Access-Control-Request-Method, Access-Control-Request-Headers
    4. Server responds with what is allowable
    5. If all is good, main request is sent
- can cache preflight request everytime for performance, can use Access-Control-Max-Age to have a longer timeout
- CORS does not send cookies, which reduces CSRF
    * can be configured to do so manually though

Resource:[http://performantcode.com/web/do-you-really-know-cors](http://performantcode.com/web/do-you-really-know-cors)