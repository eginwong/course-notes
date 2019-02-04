# Spring Security

## Notes
- OAuth2 support

- `@EnableWebSecurity` for determining how to authorize certain traffic
- old school way was very filter based, defined in the `web.xml`
- pass through several filters to go down to the code
- has the ability to filter http requests to either reject them or pass them through
- if all is well, the filters will create an Authentication object and pass that through lower levels of filters to fill the object with GrantedAuthorities that will correspond to roles assigned
    * user details will be retrieved either via memory, database, or webservice call
    * `@PreAuthorize("hasAuthority('ROLE_DOMAIN_USER')")`
    * `@EnableGlobalMethodSecurity ` seems to be required
    * [source](https://www.future-processing.pl/blog/exploring-spring-boot-and-spring-security-custom-token-based-authentication-of-rest-services-with-spring-security-and-pinch-of-spring-java-configuration-and-spring-integration-testing/)