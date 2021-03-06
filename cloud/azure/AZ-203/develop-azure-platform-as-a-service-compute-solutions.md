# Develop Azure Platform as a Service Compute Solutions

# Azure App Service Web Apps

- covers web apps, mobile apps, API apps, logic apps
  - push notification
  - auto scaling
  - limited OS interaction
  - includes deployment slots for reliable testing and version promotion
- App Service Plans
  - app runs in it
  - defines a set of compute resources for a web app to run
  - can host multiple apps on the same computing resources
  - defines region, number of VM instances, size, pricing tier
- Pricing Tiers
  - shared compute (free, shared), not dedicated server
  - dedicated compute Azure VMs (basic, standard, premium, premium v2), better scaling
  - isolated, compute isolation + network isolation, run on dedicated Azure Virtual Networks, provides network isolation, max scale-out capabilities
  - consumption, tier only available to function apps
- Azure Web Apps
  - 99.5% SLA
  - custom domains
  - auth
  - continuous deployment
  - traffic mgmt
- Application Settings
  - Managed Pipeline Settings is more for old vs new versions of C#, Integrated for new
  - ARR (session affinity cookie) is for cookies, turn it off if unnecessary for load balancing
  - Always On is for cold vs hot starts
  - Traffic mgmt through deployment slots
- WebJobs
  - lightweight background tasks
  - different file types of scripts, like js, jar, bash, exe, ps
  - no extra cost
  - built-in logging and mgmt with Azure Portal
  - triggered vs. continuous
    - cts runs on all instances or you can restrict it if continuous; triggered will be on a single instance chosen for load balancing
  - App Service > Settings > Webjobs > Add WebJob
- Diagnostics Logging
  - both web server and the web app
  - Web Server Diagnostics
    - Detailed Error Logging
    - Failed Request Tracing
    - Web Server Logging
  - Application Diagnostics
    - can specify level of log from C#
    - Error, Critical, Warning, Info, Trace, Debug
  - Settings > Diagnostics logs

# Self Study

## Create Azure App Service Web Apps
- create an azure app service web app
  - in VS2017 > Solution Explorer > right-click project > Publish
  - define App Service Plan, Location, Size
  - in azcli: `az webapp up --location westeurope --name <app_name>`
    - creates default rg, app service plan, app with specified name, zip files to deploy to web app
- WebJobs, feature of Azure App Service, enables you to run program/script in same context as a web app, API app, or mobile app; no additional cost
  - continuous (runs on all instances but can be restricted) vs triggered (single instance execution, no remote debugging)
  - App Service > WebJobs > Add > settings (Scale determines if continuous on all instances or restricted)
  - can provide cron for scheduled
- enable diagnostic logging
  - web server diagnostics (detailed error, failed request, web server logging) and application diagnostics (output from the app)
    - `System.Diagnostics.Trace.TraceError`
  - Settings > Diagnostics; set levels (disabled, error, warning, info, verbose)
  - turns off after 12 hours and can store files
  - blob storage logs more
  - download logs with azcli: `az webapp log download --resource-group resourcegroupname --name appname`
  - can also add logging via App Insights with the SDK in VS, and adding `Microsoft.ApplicationInsights.TraceListener` NuGet package
  - can stream logs on portal or azcli: `az webapp log tail --name appname --resource-group myResourceGroup`, with `--filter` or `--path` parameters

## Create Azure App Service mobile apps
- about mobile apps in azure app service
  - paas offering
  - build native and cross-platform apps; connect to enterprise systems; offline-ready apps with data sync; push notifications to millions in seconds
  - authN and authZ; data access to db solutions; offline sync; push notifications; client SDKs
  - auto-scaling, staging environments, continuous deployment, virtual networking, isolated environments
- push notifications for Android/iOS
  - firebase integration
  - App Services > Settings > Push
  - in .NET: `Microsoft.Azure.NotificationHubs` and `Microsoft.Azure.Mobile.Server.Config`
- enable offline sync for mobile app
  - changes are stored in a local db that are then synced with remote backend
  - read/write from sync table `IMobileServiceSyncTable`, part of the SQLite db on your device
  - use synchronization context `MobileServiceClient.SyncContext` which interfaces with local db
  - for iOS, the local store is `MSCoreDataStore` or the `MSSyncContextDataSource`
  - to synchronize with the server: `MSSyncTable.pullWithQuery`
- implement a remote instrumentation strategy for mobile devices
  - enable diagnostic logging for apps in Azure App Service (same as before)
  - troubleshoot an app in Azure App Service using VS
    - in VS, can modify files "Remotely" which speeds up the redeploy process
    - can do some remote debugging by going Settings > Configuration to Debug > Save > Publish; right-click app and Attach Debugger
    - same applies to WebJobs SDK
    - 48 hours and then the remote debugging option is turned off for security purposes
    - it's possible to see application tracing logs through a combination of setting and code changes
    - web server logs, detailed error message logs, file system logs, failed request tracing logs

## Create Azure App Service API apps
- create an azure app service API app
  - include name, subscription, rg, location, org name, admin email, pricing tier
  - import API into API Mgmt instance
  - API MGMT > API > OpenAPI Specification (where requests are forwarded)
    - API URL suffix must be unique for every API for a given publisher
    - products are a grouping of API that you want to offer as subscription to end users
    - can test APIs directly from the portal or through developer portal
- create documentation for the API by using open source and other tools
  - developer portal based on CMS
  - can update widgets, publish changes to the theming

## Implement Azure Functions
- an introduction to Azure Functions
  - C#, F#, js
  - pay-per-use, bring your own dependencies, integrated securtiy, flexible development, opensource
  - built-in triggers for http, timer, cosmosdb, blob, queue, eventgrid, eventhub, servicebusqueue, servicebustopic
  - cost is with consumption plan, or app service plan (no extra cost)
- implement input and output bindings for a function
  - triggers have associated data, payload of the function
  - binding to a fcn is declaratively connecting resource to fcn; input/output bindings or both
  - triggers + bindings are done with decorators in C# and `function.json` in others
  - sample JSON for input
```json
{
    "dataType": "binary", // or stream, or string
    "type": "httpTrigger",
    "name": "req",
    "direction": "in" // trigger always in, bindings in/out
}
```
  - event grid no I/O, hubs, webhooks only O
  - register azure functions binding extensions
    - HTTP/Timer are out of box
    - other binding extensions provided via Azure Core Tools or NuGet packages
    - use `func extensions install` on your `function.json` file to include all bindings that the function needs as part of Azure Functions Core Tools
    - in powershell, `Install-Package Microsoft.Azure.WebJobs.Extensions.ServiceBus -Version <target_version>`
    - in dotnetcore, `dotnet add package Microsoft.Azure.WebJobs.Extensions.ServiceBus --version <target_version>`
    - use of decorators in C#
```C#
[FunctionName("QueueTriggerTableOutput")]
    [return: Table("outTable", Connection = "MY_TABLE_STORAGE_ACCT_APP_SETTING")]
```
- implement function triggers by using data operations, timers, and webhooks
  - function triggered by CosmosDB
- implement Azure Durable Functions
  - stateful functions in serverless env: state, checkpoints, restarts
  - define stateful workflows using an orchestrator function
    - no JSON schema or designers required
    - can be called with async/sync functions
    - progress is automatically checkpointed through restarts
    - used for chaining, fan-out/fan-in, async http apis, monitoring, human interaction
    - C#, F#, js
    - same billing
  - patterns
    - function chaining, like typical functional chaining concept
    - fan out/fan in, execute multiple fcns in parallel and then wait for them all to finish
      - `context.CallActivityAsync`, `Task.WhenAll(parallelTasks)`
    - async HTTP APIs, for long running functions so kick off, then separate call for status
      - `DurableOrchestrationClient.CreateCheckStatusResponse`
    - monitor
    - human interaction
      - orchestrator function can wait for an event with `Task<bool> approvalEvent = context.WaitForExternalEvent<bool>("ApprovalEvent");`
      - external client can deliver event notification via `DurableOrchestrationClient.RaiseEventAsync` 
  - must use `DurableOrchestrationContext` or `context.df` objects to invoke other fcns by name, params, retrieve fcn output
  - orchestrator must be deterministic as it will be replayed multiple times
  - storage and scalability is achieved via use of queues, tables, and blobs in Azure Storage to persist state 
  - to sync with queue, create azure storage and sync up with Az Functions
- Create Azure Function apps by using Visual Studio
