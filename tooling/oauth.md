# OAuth

> authorization framework enables third-party applications to obtain *limited access* to a web service

### Before OAuth
- apps would store the user's password
- had complete access to the secondary app
- easy to be compromised

### What
- OAuth doesn't tell you ... who you are
- Only supports Authorization
- Uses an Access Token

### From POV of building an app
- Register an application, gives `client_id` and `client_secret`
- For public clients (js, native apps), we only use ID because they cannot keep confidential the secret
- FLOW:
    * User's computer -> Best App Ever
    * User's computer -> Authorization server (accounts.google.com)
    * after redirect, Best App Ever -> Authorization server for some identifier
    * Best App Ever -> Resource Server (protected resource, contacts.google.com)
- login link includes:
    * response_type=code (client expects to receive an auth code)
    * client_id=CLIENT_ID (which app is this)
    * redirect_uri=REDIRECT_URI (indicates url to return the user after auth is complete)
    * scope=photos (define what parts of the user's account you want to access)
    * state=123131 (random string generated by app for verification purposes)
- returns with `auth_code` and `state` for verification
- then exchange code for access token
    * grant_type=authorization_code (indicates request contains auth code)
    * code=CODE_FROM_PREVIOUS
    * redirect_uri=REDIRECT_URI (must match redirect_uri from original request)
    * client_id=CLIENT_ID
    * client_secret=CLIENT_SECRET

#### Mobile or Client-side app
- IMPLICIT FLOW (no client secret) - use sparingly:
    * response_type=token
    * client_id
    * redirect_uri
    * scope=photos
    * state=12312x
- get redirected with #token=access_token, which only the js app can access, nothing going back to the server
- for mobile apps, redirect URLs are not 100% sure
    * Proof Key for Code Exchange (PKCE): on-the-fly client secret
    * random string generation, hash SHA256, include code_challenge and code_challenge_method when exchanging auth code for access token

#### First party app
- exchange username and password for token

#### Client Credentials
- grant_type=client_credentials&
- client_id
- client_secret

#### Browserless Devices
- request a device code 

### Refresh Token
- can automatically request a new refresh token when expired
- usually requires scope offline_access
- `grant_type=refresh_token`, `refresh_token=REFRESH_TOKEN`

## OAuth Servers
- provide client registration (callback url, redirect_url, name, etc.)
- provide delete of registration (revoke all previous tokens)
- display client secret when required
- view/manage authorizations

## Thoughts
[ref](https://stackoverflow.com/questions/34784644/what-is-the-difference-between-oauth-based-and-token-based-authentication)
- API Keys vs OAuth Tokens vs JSON Web Tokens
    * API keys are simple and best for developers
        * more easily compromised
        * `Authorization: ApiKey ...`
    * OAuth
        * will send an access token to allow the application to access a user's data
        * `Authorization: Bearer ...`
    * JWT requires less db lookups and is good in conjunction with OAuth
        * no looking up access token so JWT cannot be revoked, only expired
        * `Authorization: Bearer ...`
        * 

Relevant resources:
- [Documentation](https://oauth.net/)