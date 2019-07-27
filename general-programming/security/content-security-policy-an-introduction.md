# Content Security Policy - an introduction
[ref](https://scotthelme.co.uk/content-security-policy-an-introduction/)

- delivered via HTTP response header and can be an effective countermeasure to XSS
- CSP allows a whitelist of approved sources
  - specify the types of sources as well
  - `Content-Security-Policy: default-src https://scotthelme.co.uk:*` sample
- for testing, use `Content-Security-Policy-Report-Only` that would log out the sorts of scripts that would be returned otherwise
- handled on a **per-page basis**, not cached
- for reporting purposes, can also append `report-uri ...` to send a CSP report to determine the source of the violation
- want to avoid inline CSS/JS due to the fact that they would trigger false positives for potential XSS attacks
- IE uses `X-Content-Security-Policy` instead
