# Spring Security OAuth

## OAuth 2.0 Provider
- Spring Security OAuth can split and have multiple Resource Services to share a single Authorization Service
- handled through Spring MVC controller endpoints + Spring Security request filters
- For a 2.0 Authorization Server
    * `AuthorizationEndpoint` to service requests for authorization
    * `TokenEndpoint` to service requests for access tokens
- For a 2.0 Resource Server
    * `OAuth2AUthenticationProcessingFilter`
- All other utilities are done through `@Configuration` adapters
- `@EnableAuthorizationServer`
    * `ClientDetailsServiceConfigurer` to store clientId, secret, scope, authorizedGrantTypes, authorities stored in a database
    * Managing tokens can be done via inmemory (dev), jdbctoken (shared), or jwt version alone, but can lead to expiry and difficult to revoke access tokens 
        * For JWT, `JwtTokenStore` need to have on both resource and authorization or public/private keys
- Enforce SSL

### Getting started with Authorization Server
1. Requires at least one set of metadata in the app.properties/yml
2. enable login and home page and block all other routes through spring mvc
3. can then generate tokens

### OAuth 2.0 Resource Server Configuration
- `@EnableResourceServer`, and configure via `ResourceServerConfigurer`
    * will automatically add a filter of type `OAuth2AuehtnicationProcessingFilter` to Spring Security Filter chain
    * `tokenServices` defines the token services
    * `resourceId` the id of the resource

## OAuth 2.0 Client
- make use of the `OAuth2ProtectedResourceDetails` for defining protected resources
- `@EnableOAuth2Client` annotation for creating a filter bean to store current request and context, `AccessTokenRequest` to avoid user state collisions
- Recommended to use `RestTemplate` for making calls, and includes an extension for OAuth + Spring Security
- Need to use the following if the backend server will do both
```java
@Bean
@ConfigurationProperties("github.client")
public AuthorizationCodeResourceDetails github() {
	return new AuthorizationCodeResourceDetails();
}

@Bean
@ConfigurationProperties("github.resource")
public ResourceServerProperties githubResource() {
	return new ResourceServerProperties();
}
```

### Setting up Client consumer
- need to add metadata on client-side application

Resources
- [docs](https://projects.spring.io/spring-security-oauth/docs/oauth2.html)
- [walkthrough](https://spring.io/guides/tutorials/spring-boot-oauth2/)
- [real-life example](https://github.com/erathorus/spring-kotlin-oauth2-jdbc/tree/3aa73c9c5f727e97e6dcb4ee4f32ff96f9de2d06)
- [real-life example 2](https://engineering.vena.io/2018/04/17/securing-your-web-application-with-spring-boot       -and-kotlin/)
- [real-life example 3](https://www.baeldung.com/sso-spring-security-oauth2)

QUESTIONS:
1. do we want both auth and resource on the same server
2. are we using JWT
3. how are we going to manage tokens
4. which database to use to store client details
5. 