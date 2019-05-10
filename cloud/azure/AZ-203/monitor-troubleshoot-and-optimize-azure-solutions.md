# Monitor, troubleshoot, and optimize Azure solutions

# Redis
- atomic operations
- kv can have max size of 512 mb
- usage
  - cache-aside, load data items and cache as required
  - content caching, store static data to decrease load times
  - use session caching, store cookie
  - job and message queuing, defer longer running jobs
  - distributed transactions, executes a batch of commands as a single operation in the form of Transactions
- know the tiers of Azure Redis
  - premium (cluster, persistence, enhanced security, import/export, geo-replication, schedule updates), standard (includes SLA), basic (security via firewall rules, reboot)

# CDN
- Content Delivery Network, distributed network of servers can efficiently deliver web content to users
- minimize latency, point-of-presence (POP)
- `using Microsoft.Azure.Management.Cdn`
- to connect to CDN, require the `TokenCredentials` from `Microsoft.Rest` to authenticate
- Caching Rules
  - global caching rules
  - custom caching rules
    - override the global caching rule, if set
- either create a storage account or let it be created for you
  - can define caching behaviour (bypass cache, override, set if missing, not set)
  - query string caching behaviour (cache every unique, etc.)

# Self Study

## Develop code to support scalability of apps and services
- implement autoscaling rules and patterns
  - resource can have only one autoscale setting with one or more profiles
  - checks the threshold associated metric (at an instance level) to determine whether to scale out or scale in
  - ensure max and min values are different and have adequate margin in between them
  - manual scaling is reset by autoscale
  - always use both scale out and in rule combinations
  - choose appropriate statistic for your diagnostics metric
  - order of profile precedence is
    - fixed date profile > recurring profile > default profile
  - create resource > virtual machine scale set > create
  - a lb is created and NAT rules are used to distribute traffic
    - rg > load balancer > inbound NAT rules
  - to create scale set in ps:
```s
New-AzVmss 
  -ResourceGroupName "myResourceGroupScaleSet" 
  -Location "EastUS" 
  -VMScaleSetName "myScaleSet" 
  -VirtualNetworkName "myVnet" 
  -SubnetName "mySubnet" 
  -PublicIpAddressName "myPublicIPAddress" 
  -LoadBalancerName "myLoadBalancer" 
  -UpgradePolicyMode "Automatic"
```
  - to allow access to webapp on vmss, create network security group, in ps:
```s
# Get information about the scale set
$vmss = Get-AzVmss `
  -ResourceGroupName "myResourceGroupScaleSet" `
  -VMScaleSetName "myScaleSet"

#Create a rule to allow traffic over port 80
$nsgFrontendRule = New-AzNetworkSecurityRuleConfig `
  -Name myFrontendNSGRule `
  -Protocol Tcp `
  -Direction Inbound `
  -Priority 200 `
  -SourceAddressPrefix * `
  -SourcePortRange * `
  -DestinationAddressPrefix * `
  -DestinationPortRange 80 `
  -Access Allow

#Create a network security group and associate it with the rule
$nsgFrontend = New-AzNetworkSecurityGroup `
  -ResourceGroupName  "myResourceGroupScaleSet" `
  -Location EastUS `
  -Name myFrontendNSG `
  -SecurityRules $nsgFrontendRule

$vnet = Get-AzVirtualNetwork `
  -ResourceGroupName  "myResourceGroupScaleSet" `
  -Name myVnet

$frontendSubnet = $vnet.Subnets[0]

$frontendSubnetConfig = Set-AzVirtualNetworkSubnetConfig `
  -VirtualNetwork $vnet `
  -Name mySubnet `
  -AddressPrefix $frontendSubnet.AddressPrefix `
  -NetworkSecurityGroup $nsgFrontend

Set-AzVirtualNetwork -VirtualNetwork $vnet

# Update the scale set and apply the Custom Script Extension to the VM instances
Update-AzVmss `
  -ResourceGroupName "myResourceGroupScaleSet" `
  -Name "myScaleSet" `
  -VirtualMachineScaleSet $vmss

# Set and update the capacity of your scale set
$vmss.sku.capacity = 3
Update-AzVmss -ResourceGroupName "myResourceGroupScaleSet" `
    -Name "myScaleSet" `
    -VirtualMachineScaleSet $vmss
```
  - to create scale rules, in ps:
```s
# Create a scale down rule to decrease the number of instances after 30% average CPU usage over a 5-minute period
$myRuleScaleDown = New-AzAutoscaleRule `
  -MetricName "Percentage CPU" `
  -MetricResourceId $myScaleSetId `
  -Operator LessThan `
  -MetricStatistic Average `
  -Threshold 30 `
  -TimeGrain 00:01:00 `
  -TimeWindow 00:05:00 `
  -ScaleActionCooldown 00:05:00 `
  -ScaleActionDirection Decrease `
  -ScaleActionValue 1

# Create a scale profile with your scale up and scale down rules
$myScaleProfile = New-AzAutoscaleProfile `
  -DefaultCapacity 2  `
  -MaximumCapacity 10 `
  -MinimumCapacity 2 `
  -Rule $myRuleScaleUp,$myRuleScaleDown `
  -Name "autoprofile"
```
  - scale sets support up to 1k VMs when using Azure platform image and up to 300 VMs when using a custom image
  - to create vmss in azcli:
```s
az vmss create \
  --resource-group myResourceGroupScaleSet \
  --name myScaleSet \
  --image UbuntuLTS \
  --upgrade-policy-mode automatic \
  --custom-data cloud-init.txt \
  --admin-username azureuser \
  --generate-ssh-keys

# allow traffic
az network lb rule create \
  --resource-group myResourceGroupScaleSet \
  --name myLoadBalancerRuleWeb \
  --lb-name myScaleSetLB \
  --backend-pool-name myScaleSetLBBEPool \
  --backend-port 80 \
  --frontend-ip-name loadBalancerFrontEnd \
  --frontend-port 80 \
  --protocol tcp

# to manually scale
az vmss scale \
    --resource-group myResourceGroupScaleSet \
    --name myScaleSet \
    --new-capacity 3

# add data disks
az vmss disk attach \
    --resource-group myResourceGroupScaleSet \
    --name myScaleSet \
    --size-gb 50 \
    --lun 2
```

- implement code that handles transient faults
  - momentary loss of network connectivity
  - in cloud, resources are shared, and throttling may occur; more potentially latency with moving parts; network conditions can be variable
  - app must be able to retry, detect faults as they occur, use an appropriate strategy for these mechanisms
  - determine if operation is suitable for trying, retry count and interval
  - log them, use circuit breaker pattern


## Integrate caching and content delivery within solutions
- store and retrieve data in Azure Redis cache
  - `StackExchange.Redis` client in C#
  - create cache with DNS name, sub, rg, location, pricing > Create
  - create CacheSecrets.config file with connection values
  - in app.config, add link to appSettings you created earlier for connection strings
  - connection to Azure Cache for Redis is managed by `ConnectionMultiplexer`, should be shared
  - to get a connection, `IDatabase cache = lazyConnection.Value.GetDatabase();` and to dispose, `lazyConnection.Value.Dispose();`
  - retrieve values with `StringSet` and `StringGet` methods
  - need to serialize values into JSON, use `Newtonsoft.Json` package
  - when deploying to azure, must create app and add appsetting with cacheconnection that was stored in the CacheSecrets.config
- Develop code to implement CDNs in solutions
  - use ARM template
  - input cdnProfileSku for type of provider and endpointOriginHostName
  - in azcli, to check cdn profile: `az cdn profile list --resource-group cdn -o table`
  - can optimize CDN for dynamic site acceleration (DSA)
  - go to App Service > Settings > Networking > Configure Azure CDN for your app
  - can go into portal and Purge content
  - options: ignore query strings, bypass caching for query strings, cache every unique URL
  - comparing products (Microsoft, Akamai, Verizon, Premium Verizon)
    - Akamai has a lot
    - Verizons have asset preloading, more compression encodings
    - premium Verizon: customizable rules, url redirect, mobile device rules, token authN, best logging
    - MSFT: bring your own certificate
- invalidate cache content (CDN or Redis)
  - most effective when content remains relatively static, cache is actually faster, high level of contention, network latency will be an issue
  - private caching is usually an in-memory store or can use shared cache service
  - manage data expiration
  - for concurrency, can have optimistic or pessimistic locking
  - can cluster, partition, or use batch operations for maintenance, HA, scalability
  - Redis does not handle rollback but does have transactions that guarantee that commands are run in sequence
  - LRU invalidation is default
  - has minimal security layer set up
  - `CreateTransaction()` method to create the sequence, and then `transaction.Execute()`; will stop if any txns fail
  - there is `CreateBatch()` which will not return status and other commands may still run even if one has failed
  - can add flag to action to `CommandFlags.FireAndForget` and include expiration time for the key as well, `TimeSpan.FromSeconds(20)`
  - common data patterns include Cache-aside pattern and Sharding

## Instrument solutions to support monitoring and logging
- configure instrumentation in an app or service by using App Insights
  - add App Insights SDK in VS17
  - confirm app in View > Other Windows > App Insights Search
  - can enable via SDK or agent-based app monitoring (ApplicationInsightsAgent)/runtime monitoring
    - enable agent-based through the portal and turn it on
    - can specify what level of detail
    - can change sampling % too
  - client-side monitoring is done through Settings > Application Settings
    - add new app setting: `APPINSIGHTS_JAVASCRIPT_ENABLED` to `true`; save and restart app
    - .NET Core has this enabled by default
  - can create ARM template with all default app insights settings configured
  - in powershell, `$app = Set-AzWebApp -AppSettings $newAppSettings -ResourceGroupName $app.ResourceGroup -Name $app.Name -ErrorAction Stop`
- analyze and troubleshoot solutions by using Azure Monitor
  - free but data may cost usage charges
  - All Services > Monitor > Insights > More
- implement app insights web test and alerts
  - open project in VS17
  - add App Insights SDK to app, register subscription 
