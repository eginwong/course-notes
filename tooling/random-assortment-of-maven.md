# Random Assortment of Maven

## Transitive Dependencies
- if A -> B and B -> C, maven will install A, B, and then C, even if we only declare B in our A's project POM

## POM
- Project Object Model
- brains of component
- configuring JDK

## Proxy
- Need to enable proxy settings in `settings.xml` if behind some sort of firewall (will fail to resolve dependencies)
- 
```xml
<!-- proxies | This is a list of proxies which can be used on this machine to connect to the network. | Unless otherwise specified (by system property or command-line switch), the first proxy | specification in this list marked as active will be used. | -->
<proxies>
    <!-- proxy | Specification for one proxy, to be used in connecting to the network. |
    <proxy>
        <id>optional</id>
        <active>true</active>
        <protocol>http</protocol>
        <username>proxyuser</username>
        <password>proxypass</password>
        <host>proxy.host.net</host>
        <port>80</port>
        <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy> -->
</proxies>
```

## Scopes
- compile, provided, runtime, test, system, import
- used to limit transitivity dependencies and affect classpath
- compile is default scope, and will be available in all three classpaths (compile, test, runtime)
- provided is not available in runtime classpath, not transitive
- runtime is transitive and available during test and runtime classpaths
- system is similar to provided but will not look up in maven local repo for jar and expects from local machine
- test is only for test and not transitive

## Offline
- can run maven offline by passing `-o` parameter