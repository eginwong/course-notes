# Connect to and Consume Azure Services and Third-party Services (20-25%)

# Develop an App Service Logic App

- Azure logic apps is a cloud service to help orchestrate and automate tasks
- every logic app starts with a trigger, creates new instance
- write once, reuse often
- pay fr what you use
- templates
- visually build workflows
- logic connectors proxy/wrap an API
  - talks to Ms Flow, powerapps, logic apps
- actions are changes directed by a user
- triggers are polling or pushing
- meant for automating workflows
- everything is GUI-based

# Azure Event Hubs
- push notifications delivered through platform-specific infra called Platform Notification Systems (PNSes)
  - benefits:
    - cross platforms/backends
    - telemetry
    - scalability
    - security
    - delivery patterns
  - challenges:
    - platform dependency
    - scale, lots of calls because of refreshing tokens
    - routing
- how do you choose a messaging service?
  - event grid, reactive programming, event distribution (discrete), react to status changes
  - event hubs, big data pipeline, event streaming (series), telemetry and distributed data streaming
  - notification hubs, multi-platform push notifications, push notification service (PNS), sending mass event notifications to multiple platforms
  - service bus, high value enterprise messaging, message, order processing and financial txns

# Azure Search
- search as a service cloud solution, provides APIs for easy search
- create and load data to azure search index
- `Indexes.Create()` and `Indexes.Delete()`
- We need a `ISearchIndexClient indexClient` to make use of your index
- Construct IndexBatch
- Call `Documents.Index(batch)` to upload the batch to the search service
- `search` will look in searchable fields, indices
- `filter` will apply a boolean predicate
- some questions related to API; note patterns in the API instead

# Self-research

## Develop an App Service Logic App
- create a logic app
  - Azure portal > Create a resource > Logic App > New (Name, sub, rg, location, analytics) > build with gui
- create and manage automated logic app flows
  - download vscode extension
  - update json, save, upload
- custom connectors in logic apps (it's possible)
- create ARM templates for deploying logic apps
  - logic app resource
  - workflow definition
  - connections
  - download tool for powershell: `Install-Module -Name LogicAppTemplate`
  - generate with powershell: `armclient token $SubscriptionId | Get-LogicAppTemplate -LogicApp MyApp -ResourceGroup MyRG -SubscriptionId $SubscriptionId -Verbose | Out-File C:\template.json`
  - parameters are with RM and for app workflow; use **allowedValues** and **defaultValue**

## Integrate Azure Search within solutions
- create an Azure Search index
  - plug-in search experience in custom apps
  - name service and URL endpoint: `https://my-app-name-01.search.windows.net`
    - lowercase letters, digits, dashes (no consecutive)
    - 2 and 60 chars in length
    - unique in namespace
  - auto detects data or file storage services within same subscription
  - select subscription, rg, hosting location, pricing tier
  - can modify partitions and replicas for scaling
  - use two services in case you want DR, but not required for HA (replicas handle that)
  - tiers (free, basic, S1, S2, S3, storage optimized L1/2) change depending on storage, max indexes, scale out limits
  - for .NET, get key and URL
  - create an instance of the `SearchServiceClient` with parameter of `SearchCredentials`
  - thread-safe
  - has an `Indexes` property: `serviceClient.Indexes.Create(definition);`
    - with `Name` and `Fields`, which is `Field[]`
      - use the `FieldBuilder`
    - some attributes might be `System.ComponentModel.DataAnnotations.Key`, `IsFilterable`
- import searchable data
  - data wizard invokes data source, index, and indexer
  - Azure Search > Import Data > (can add cognitive search for OCR) > customize target index > create an indexer
  - can create Azure SQL/Cosmos DB/Blob Storage/Table Storage
    - a flattened dataset is a required input
  - must generate index (key, can set retrievable/filterable/searchable/sortable)
    - facetable and filterable go together
  - analyzer for language
  - suggester
  - data import overview
    - for low latency, push model to index is the only option
    - `IndexBatch` encapsulates a collection of `IndexAction` objects, which contains document and what action to perform: `upload`, `merge`, `mergeOrUpload`, `delete`
    - to know what the indexes are: `https://[service name].search.windows.net/indexes/[index name]/docs?[query string]&api-version=2017-11-11`
    - pull model will crawl data source and upload data into your index
      - will generate an index for you that you can modify as necessary
  - the indexer is the schedule on which it runs, the index is what it runs on
- query the Azure Search index
  - query is a full specification of a round-trip operation
    - provides match criteria in an index, execution instructions for the engine, and directives for shaping the response
```json
{
    "queryType": "simple",
    "search": "seattle townhouse* +\"lake\"",
    "searchFields": "description, city",
    "count": "true",
    "select": "listingId, street, status, daysOnMarket, description",
    "top": "10",
    "orderby": "daysOnMarket"
}
```
  - `queryType` sets the parser, or Lucene query as `simple` or `full`
  - query execution always against one index
  - for lucene, there are unsafe and reserved characters in URLs, can use grouping with `()`
  - to handle ORs and ANDs, you may need to use `searchMode=all` or `any` depending
  - at most 1024 clauses and 32KB on size of any individual term in a query
  - field-scoped queries (addresses: "Hungry"), fuzzy search can be on indivdual words only, and a number between 0 and 2 with the `~`, ("blue~1")
  - proximity search is done with `"hotel airport"~5` to find terms hotel and airport within 5 words of each other
  - term boosting with `^` with boost factor
  - regex and wildcard

## Establish API Gateways
- create an APIM instance
  - portal > Create a resource > Integration > API Mgmt
  - in powershell: `New-AzApiManagement -ResourceGroupName "myResourceGroup" -Location "West US" -Name "apim-name" -Organization "myOrganization" -AdminEmail "myEmail" -Sku "Developer"`
- configure authN for APIs
  - use of TLS/SSL certificates, TLS mutual authN or client cert authN
  - to enable client certs, in azcli: `az webapp update --set clientCertEnabled=true --name <app_name> --resource-group <group_name>`
  - the cert is forwarded by front-end lb, and is retrievable through `HttpRequest.ClientCertificate`
  - use app code to verify authenticity of certificate
  - under APIM > Client certificates > + Add / - Delete
  - in order to configure APIM to use client cert for gateway authN, go to APIM > APIs > Design > Backend > Gateway credentials to Client cert
    - for self-signed certs, must use `-SkipCertificateChainValidation` in powershell to update the `AzApiManagementBackend`; otherwise, 500 errors
  - authorize developer accounts by using AAD in Azure API Mgmt
    - API Mgmt > Security > Identities > Add Identity Provider > Provider type is AAD > keep track of redirect URL
    - THEN: go to AAD > Manage > App Registrations > New App REgistration  Create name for Web App / API. Sign-in URL is sign-in URL of the developer portal > Create
    - Make sure the Reply URL == the Redirect URL
    - If multiple AAD instances will be used, set Multi-tenanted to Yes
    - Set app permissions by selecting Required permissions, select your app, select read directory data + Sign in and read user profile check boxes > grant permissions
    - Then, copy App ID, switch back to APIM, in add identity provider, paste app id value in the client-id box
    - switch back to AAD > Keys > create new key and save
    - switch back to APIM > paste key in client secret text box
    - may have to get global administrator to accept consent, from `/aadadminconsent`, prefixe by the azure portal url
    - in APIM, can associate AAD groups with permissions
- define policies for APIs
  - can change behaviour through config
  - policies are collection of statements executed sequentially on request/response of an API
  - defined in XML, for sections with `inbound`, `backend`, `outbound`, `on-error`
  - any errors in the other rules will automatically put the request into the `on-error` track
  - sample policies:
    - forwarded header to inbound requests
    - add header containing a correlation ID for inbound request
    - add capabilities to a backend service, cache response
    - authorize access based on JWT
    - authorize access using Google OAuth or other authorizer
    - generate SAS and forward request to Azure Storage
    - route request based on size of body
    - send request context info to backend service
    - filter response content on outbound
    - log errors to stackify on-error

## Develop event-based solutions
- event grid / event hubs / service bus
  - event, fire and forget
  - message, the publisher has an expectation of how the consumer handles the message
  - event grid, reactive; discrete events; react to status changes
    - pub/sub, simplifies event consumption and lowers costs by reducing need for constantly polling
    - supports dead-lettering
    - low cost, serverless, at least once delivery, dynamically scalable
  - event hubs, big data pipeline; series; telemetry and distributed data streaming
    - can source from many different places
    - rapid data retrieval for real-time processing
    - millions of events / s
  - service bus, enterprise messaging, message, order processing and financial txns
    - duplicate detection, instantaneous consistency, ordering
    - brokered message system
    - requires polling
- implement solutions using Azure Event Grid
  - route blob storage events to web endpoint
    - create storage account
    - deploy pre-built app, enable Event Grid resource provider by registering it
      - in powershell: `Register-AzResourceProvider -ProviderNamespace Microsoft.EventGrid`
      - in azcli: `az provider register --namespace Microsoft.EventGrid`
    - select the blob storage > Events > More Options > Web Hook
    - to subscribe in powershell: `New-AzEventGridSubscription -EventSubscriptionName gridBlobQuickStart -Endpoint $endpoint -ResourceId $storageId`
    - to subscribe in azcli: `az eventgrid event-subscription create --resource-id $storageid --name <event_subscription_name> --endpoint $endpoint`
- implement solutions using Azure Notification Hubs
  - get Access Policies (not DefaultFullSharedAccessSignature as it is for backend only)
  - use PNSes, for authentication mode, select either cert or token
  - pricing tiers: free, basic, standard
    - standard has unlimited namespaces, 10M active devices per namespace, rich telemtry, scheduled push, bulk import, multi-tenancy, SLA
  - hub is smallest resource/entity; namespace is a collection of hubs
  - can write custom code to send cross-platform notifications
  - `Notifications.Instance.Hub.Send_INSERT_HERE_NativeNotifications`
  - secure notification with: sending id of notification to device, get app on device to contact backend to request secure payload
- implement solutions using Azure Event Hubs
  - create namespace in azcli: `az eventhubs namespace create --name <Event Hubs namespace> --resource-group <resource group name> -l <region, for example: East US>`
    - in ps: `New-AzEventHubNamespace -ResourceGroupName myResourceGroup -NamespaceName namespace_name -Location eastus`
  - create event hub in azcli: `az eventhubs eventhub create --name <event hub name> --resource-group <resource group name> --namespace-name <Event Hubs namespace>`
    - in ps: `New-AzEventHub -ResourceGroupName myResourceGroup -NamespaceName namespace_name -EventHubName eventhub_name -MessageRetentionInDays 3`
  - or ARM template
- how-to guides
  - diagnostic logs
  - enable with Kafka
  - use firewall rules
  - enable auto-inflate rule for scaling

## Develop message-based solutions
- implement solutions that use Azure Service Bus
  - multi-tenant cloud messaging service to send info between apps and services
  - FIFO, pubsub, brokered messaging
  - message sender > service bus namespace > message receiver
  - create servicebus namespace with azcli: `az servicebus namespace create --resource-group $resourceGroupName --name $namespaceName --location eastus`
  - create queue namespace with azcli: `az servicebus queue create --resource-group $resourceGroupName --namespace-name $namespaceName --name BasicQueue`
  - get connection string with azcli: `connectionString=$(az servicebus namespace authorization-rule keys list --resource-group $resourceGroupName --namespace-name $namespaceName --name RootManageSharedAccessKey --query primaryConnectionString --output tsv)`
  - `QueueClient`, use `registerMessageHandler` to receive messages and `sendMessagesAsync` to send messages
    - use `MessageHandlerOptions` for any necessary customizations
  - package `using Microsoft.Azure.ServiceBus;`
  - `ReceiveMode.PeekLock` is the default mode for queue client
  - when using topics, use `TopicClient`, with `sendAsync`
  - uses `SubscriptionClient` as well, to complete calls
  - creating topic in azcli: `az servicebus topic create --resource-group myResourceGroup --namespace-name $namespaceName --name myTopic`
  - creating subscription in azcli: `az servicebus subscription create --resource-group myResourceGroup --namespace-name $namespaceName --topic-name myTopic --name S1`
  - message expiration; all messages have sequencing and timestamps
  - subscribers can add filters to define which messages they want to receive
  - message sessions, can demultiplex by appending an id and creating a session object used in the constructor, then  receive method as normal
- implement solutions that use Azure Queue Storage queues
  - provides cloud messaging between app components; for scale
  - access via HTTP/HTTPS; up to 64 KB in size, with q containing up to millions of messages limited by storage account
  - sample URL: `http://myaccount.queue.core.windows.net/images-to-download`
  - max time message can stay in queue is 7 days
  - create queues: `CloudQueueClient queueClient = storageAccount.CreateCloudQueueClient();`
  - to retrieve a queue: `CloudQueue queue = queueClient.GetQueueReference("myqueue");`
  - create message and send: `CloudQueueMessage message = new CloudQueueMessage("Hello, World"); queue.AddMessage(message);`
  - queue also includes metadata: `queue.ApproximateMessageCount`