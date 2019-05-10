# Azure Batch Services

## Batch Workflow
- upload input files and app
- create pool, job, tasks
  - pool: collection of VMs
  - job: collection of tasks
  - tasks: singular node of work executed on nodes in the pool
- download input files and apps into Azure Batch
- monitor tasks on the Azure Batch pool
- upload task output to some storage
- download output files

## Resources
- Batch account
  - uniquely identified entity within the Batch service
  - two pool allocation modes
    - user subscription
    - Batch service (most cases)
- Azure storage
  - store resource and output files
  - supports general-purpose storage accounts as well as blob storage
- Compute nodes
  - cloud VM that processes a portion of the workload
  - number of CPU cores, memory, file system size determined by size of node
  - compute nodes are able to run most executables, sh, exe, bat, cmd, py
  - define environment vars
- Pools
  - collection of compute nodes
  - created manually or via Batch management
  - specify compute node type, dedicated or low-priority
  - specify scaling policy
  - specify image type
  - task scheduling policy
    - max tasks running in parallel per node
    - specify fill type (spread or pack 'em)
      - task concentration per node
- Jobs
  - collection of tasks, assigned to a pool
  - specify pools, job priority, constraints
  - recurring jobs, a job schedule and its associated specs
- Tasks
  - unit of computation
  - assigned to a node for execution
  - specify **command line**
    - resource files, environment variables, constraints, docker container image
- How to scale?
  - dynamically scale our pools
  - associate a pool with an *autoscaling formula*
  - limits
    - azure batch accounts per region per subscription
    - dedicated cores per Batch account
    - low-priority cores per Batch account
    - active jobs and job schedules per Batch account
    - pools per Batch account
- Azure Batch with High Availability
  - batch accounts are regional
  - regional outages should be a concern
    - split workload between both regions
    - design app to failover to another region
      - pre-create all required accounts (Batch, Storage, etc)
      - set quotas
      - automate deployments
      - switchover regions as part of normal operations
```s
az group create \
    --name myResourceGroup \
    --location eastus2
az batch account create \
    --name mybatchaccount \
    --storage-account mystorageaccount \
    --resource-group myResourceGroup \
    --location eastus2
az batch account login \
    --name mybatchaccount \
    --resource-group myResourceGroup \
    --shared-key-auth
az batch pool create \
    --id mypool --vm-size Standard_A1_v2 \
    --target-dedicated-nodes 2 \
    --image canonical:ubuntuserver:16.04-LTS \
    --node-agent-sku-id "batch.node.ubuntu 16.04" 
az batch job create \
    --id myjob \
    --pool-id mypool
for i in {1..4}
do
   az batch task create \
    --task-id mytask$i \
    --job-id myjob \
    --command-line "/bin/bash -c 'printenv | grep AZ_BATCH; sleep 90s'"
done
az batch task show \
    --job-id myjob \
    --task-id mytask1
az batch task file list \
    --job-id myjob \
    --task-id mytask1 \
    --output table
az batch task file download \
    --job-id myjob \
    --task-id mytask1 \
    --file-path stdout.txt \
    --destination ./stdout.txt
az batch pool delete --pool-id mypool
```

# Azure Blob & Table Storage

- CAP Theorem
  - Consistency
  - Availability
  - Partition Tolerance
- Azure storage
  - REST
  - Client
  - Pay as you go
- Storage accounts
  - unique namespace for your data
  - General V1 (legacy), General V2, Blob Storage
  - access tiers
    - hot: costs the most, cheapest to access
    - cold: infrequent, stores for around 30 days, mid-way
    - archived: rarely, stores for at least 100 days; have to be flexible with your latency requirements
  - replication models (redundancy)
    - LRS: locally redundant store, cheapest; SLA is 11 9's over a year, 3 replicas 1 region; write protected against disk, node, rack failure
    - GRS: geo-redundant storage; SLA is 16 9's, and 300 miles away data centre, replicates 2 regions, 6 data centers, asynchronous
    - RA-GRS: read-access geo-redundant storage; get read-access from your secondary region
  - access models
    - every request against your storage account must be authorized
    - use Azure AD
    - or shared key
    - shared access signature, delegation without giving up key
      - provide granular control for access
      - validity interval (start and expiry time)
      - permissions granted by SAS
      - IP address or range of addresses to accept
      - restrict protocols accepted by Azure Storage
- account > container > blob 
  - block blob
    - upload large blobs efficiently (docs, images, videos)
    - 50000 blocks, each block has 100MB
  - append blob
    - optimized for appending operations
    - can't update or delete blocks
    - block has 4MB
    - good for logging, data analytics
  - page blob
    - optimized for read and writes
    - 512kb page ???
- Azure Blob storage Lifecycles
  - can expire
  - can transition to different access tiers
  - run automated jobs
  - example:
    - { "version": "0.5", "rules": [{ "name": "ruleName", "type": "Lifecycle", "definition": { "filters": { "blobTypes": [ "blockBlob"]}, "prefixMatch": ["..."], "actions": { "baseBlob": { "tierToCool": {"daysAfterModificationGreater": ...}}}}}]}
    - can move blobs around access tiers
  - create lease on block to be an exclusive lock
  - WORM -> Write once read many
- Azure tables
  - used to store NoSQL data in the cloud
  - can store any number of tables up to max of the storage account
  - enforce strong consistency
  - partitioning strategy
    - primary key of an identity
    - collection of entities with the same PartitionKey

# Self-research

## Develop Solutions that use storage tables
- azure storage table design guide
  - must have partitionKey and rowKey to be a unique combination
  - account + table names + partitionkey identify the partition within the storage service
  - entity group txns (EGTs) are the only built-in mechanism for performing atomic updates across multiple entities
    - need to be in the same partition
    - limited to a max of 100 entities
    - max of 255 props, 1MB per individual entity; max azure storage is 500TB
    - size of partitionkey/rowkey is string up to 1KB
  - design guidelines:  
    - read-heavy: querying in read-heavy apps; specify both partition/row keys in queries; store duplicate copies of entities for efficiency; denormalizing data; compound key values; query projection
    - write-heavy: don't create hot partitions, avoid spikes in traffic, don't necessarily create a separatate table for each type of entity; consider max throughput required
  - ideal point query (row + partition keys) > range query (partition key on range of row keys) > partition scan (partition key + non-row key) > table scan (no partition key)
  - several optimal patterns for lookup, optimizing on CUD operations
  - design patterns:
    - intra-partition secondary index pattern: store multiple copies of each entity in same partition
    - inter-partition secondary index pattern: store multiple copies of each entity using different RowKey values in separate partitions/in separate tables
    - eventually consistent txns pattern: eventually consistent behaviour
    - index entities pattern: enable efficient searches that return lists of entities
    - dernomalization pattern: break data
    - compound key pattern: RowKey + PartitionKey
- query table storage by using code
  - ps: `Install-Module AzTable`
  - create table, in ps: `New-AzStorageTable –Name $tableName –Context $ctx`
  - add rows, in ps: `Add-AzTableRow -table $cloudTable -partitionKey $partitionKey1 -rowKey ("CA") -property @{"username"="Chris";"userid"=1}`
  - to retrieve rows, in ps: `Get-AzTableRow -table $cloudTable`
    - with customfilter, `-customFilter "(userid eq 1)"`
  - to update row, must retrieve, update, and then commit, in ps: `Update-AzTableRow`
  - to delete row, in ps: `Remove-AzTableRow`
  - to delete table, can pipe everything into individual deletes or batch, in ps: `Remove-AzStorageTable`
- implement partitioning schemes
  - horizontal / vertical / functional data partitioning
  - improves scalability, reduce contention, optimize performance, operational flexibility, availability
  - horizontal (sharding): duplicates of same schema but subsets of data only
    - more important to balance the requests
  - vertical: each partition holds a subset of the fields, divided by their column use
    - sensitive data can have extra security controls
    - reduce the amount of concurrent access required
    - operates at an entity level
  - functional: data is aggregated according to how it is used by each bounded context
    - maybe read data in one and read/write data in another
  - partition data that is causing slow performance
  - minimize cross-partition data access operations; embrace eventual consistency
  - may need to rebalance partitions at a later date; plan for how and when to do that

## Batch

### for batch jobs, focus on knowing how to use the .NET SDK for creating jobs, setting them up, and executing
- `CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();`
- files in storage are defined as `ResourceFile` objects
- use the `BatchClient` object to create and manage pools, jobs, tasks in the Batch service
  - uses shared key authentication
- `BatchClient.PoolOperations.CreatePool` to set number of nodes, VM size, pool config
  - `VirtualMachineConfiguration` can be used to specify exact node agent, image reference, `targetDedicatedComputeNodes`
  - `CloudPool pool`, and must be `Commit()`
- `CloudJob job = batchClient.JobOperations.CreateJob()`
  - can set `PoolInformation` and `Id`, and then `Commit()`
- `CloudTask task = new CloudTask(taskId, taskCommandLine)`
  - `taskCommandLine` is the actual command from the image you wish to run
  - `task.ResourceFiles = new List<ResourceFile> { inputFiles[i]}` to add resource files
- `batchClient.JobOperations.AddTask(JobId, tasks)` wherein the `tasks` are a `List<CloudTask>`
- to check results, check the CloudTask `.ComputeNodeInformation` for details
- you will be charged for the pool while nodes are running

### Getting started with Batch CLI
[ref](https://docs.microsoft.com/en-us/azure/batch/batch-cli-get-started)
```s
az batch pool list
az batch task list --job-id job001
# can use --select-clause, filter, or expand
```

### Persist task data to Azure Storage with the Batch service API
[ref](https://docs.microsoft.com/en-us/azure/batch/batch-task-output-files)
- with Batch service API, can persist without modifying the application that the task is running
- persist output created from virtualmachineconfiguration
- persist output to Azure storage container
- cannot stream directly from Task still running
- creating container `CloudBlobContainer container = storageAccount.CreateCloudBlobClient().GetContainerReference(containerName); await container.CreateIfNotExists();`
- retrieve write SAS token
```C#
string containerSasToken = container.GetSharedAccessSignature(new SharedAccessBlobPolicy()
{
    SharedAccessExpiryTime = DateTimeOffset.UtcNow.AddDays(1),
    Permissions = SharedAccessBlobPermissions.Write
});
string containerSasUrl = container.Uri.AbsoluteUri + containerSasToken;
```
- writing output to container, have to differentiate storage path because dupes
```C#
new CloudTask(taskId, "cmd /v:ON /c \"echo off && set && (FOR /L %i IN (1,1,100000) DO (ECHO !RANDOM!)) > output.txt\"")
{
    OutputFiles = new List<OutputFile>
    {
        new OutputFile(
            filePattern: @"..\std*.txt",
            destination: new OutputFileDestination(
         new OutputFileBlobContainerDestination(
                    containerUrl: containerSasUrl,
                    path: taskId)),
            uploadOptions: new OutputFileUploadOptions(
            uploadCondition: OutputFileUploadCondition.TaskCompletion)),
        new OutputFile(
            filePattern: @"output.txt",
            destination: 
         new OutputFileDestination(new OutputFileBlobContainerDestination(
                    containerUrl: containerSasUrl,
                    path: taskId + @"\output.txt")),
            uploadOptions: new OutputFileUploadOptions(
            uploadCondition: OutputFileUploadCondition.TaskCompletion)),
}
```
- `TaskExecutionInformation.FailureInformation` to diagnose upload errors, `fileuploadout` and `fileuploaderr` files
- Batch File Conventions standards from .NET can help you view files in Azure Portal, plus sets standards

### Persist job and task data to Azure Storage with the Batch File Conventions library for .NET
[ref](https://docs.microsoft.com/en-us/azure/batch/batch-task-output-file-conventions)
- use if you want to stream data while task is running
- code is easy to modify to follow standards
- automatically name storage containers and task files
- requires linking Azure storage account with Batch account
  - all job and task outputs are stored in the same storage container so *throttling* may occur
- link the accounts, typically in client code
```C#
CloudJob job = batchClient.JobOperations.CreateJob(
    "myJob",
    new PoolInformation { PoolId = "myPool" });

// Create reference to the linked Azure Storage account
CloudStorageAccount linkedStorageAccount =
    new CloudStorageAccount(myCredentials, true);

// Create the blob storage container for the outputs
await job.PrepareOutputStorageAsync(linkedStorageAccount);
```
- save documents with `SaveAsync`
```C#
CloudStorageAccount linkedStorageAccount = new CloudStorageAccount(myCredentials);
string jobId = Environment.GetEnvironmentVariable("AZ_BATCH_JOB_ID");
string taskId = Environment.GetEnvironmentVariable("AZ_BATCH_TASK_ID");

TaskOutputStorage taskOutputStorage = new TaskOutputStorage(
    linkedStorageAccount, jobId, taskId);

/* Code to process data and produce output file(s) */

await taskOutputStorage.SaveAsync(TaskOutputKind.TaskOutput, "frame_full_res.jpg");
await taskOutputStorage.SaveAsync(TaskOutputKind.TaskPreview, "frame_low_res.jpg");
```
- similar for `JobOutputStorage`, with `JobOutputKind.*`
- can stagger saves for long-running process with `SaveTrackedAsync`
```C#
TimeSpan stdoutFlushDelay = TimeSpan.FromSeconds(3);
string logFilePath = Path.Combine(
    Environment.GetEnvironmentVariable("AZ_BATCH_TASK_DIR"), "stdout.txt");

// The primary task logic is wrapped in a using statement that sends updates to
// the stdout.txt blob in Storage every 15 seconds while the task code runs.
using (ITrackedSaveOperation stdout =
        await taskStorage.SaveTrackedAsync(
        TaskOutputKind.TaskLog,
        logFilePath,
        "stdout.txt",
        TimeSpan.FromSeconds(15)))
{
    /* Code to process data and produce output file(s) */

    // We are tracking the disk file to save our standard output, but the
    // node agent may take up to 3 seconds to flush the stdout stream to
    // disk. So give the file a moment to catch up.
     await Task.Delay(stdoutFlushDelay);
}
```

### Use Azure Batch CLI templates and file transfer
- use batch templates
  - can define parameteres
  - job task factories, easily simplify process
- pool template, job template; similar to ARM templates
- includes parameters to be specified in the body section
  - variables
  - higher-level constructs (task factory for job)
- pool template
  - can create package references 

```json
{
    "parameters": {
        "nodeCount": {
            "type": "int",
            "metadata": {
                "description": "The number of pool nodes"
            }
        },
        "poolId": {
            "type": "string",
            "metadata": {
                "description": "The pool ID "
            }
        }
    },
    "pool": {
        "type": "Microsoft.Batch/batchAccounts/pools",
        "apiVersion": "2016-12-01",
        "properties": {
            "id": "[parameters('poolId')]",
            "virtualMachineConfiguration": {
                "imageReference": {
                    "publisher": "Canonical",
                    "offer": "UbuntuServer",
                    "sku": "16.04-LTS",
                    "version": "latest"
                },
                "nodeAgentSKUId": "batch.node.ubuntu 16.04"
            },
            "vmSize": "STANDARD_D3_V2",
            "targetDedicatedNodes": "[parameters('nodeCount')]",
            "enableAutoScale": false,
            "maxTasksPerNode": 1,
            "packageReferences": [
                {
                    "type": "aptPackage",
                    "id": "ffmpeg"
                }
            ]
        }
    }
}
// used through az batch pool create --template template.json --parameters ...
```
- job templates
  - task factory
```json
"taskFactory": {
    "type": "taskPerFile",
    "source": { 
        "fileGroup": "ffmpeg-input"
    },
    "repeatTask": {
        "commandLine": "ffmpeg -i {fileName} -y -s [parameters('resolution')] -strict -2 {fileNameWithoutExtension}_[parameters('resolution')].mp4",
        "resourceFiles": [
            {
                "blobSource": "{url}",
                "filePath": "{fileName}"
            }
        ],
        "outputFiles": [
            {
                "filePattern": "{fileNameWithoutExtension}_[parameters('resolution')].mp4",
                "destination": {
                    "autoStorage": {
                        "path": "{fileNameWithoutExtension}_[parameters('resolution')].mp4",
                        "fileGroup": "ffmpeg-output"
                    }
                },
                "uploadOptions": {
                    "uploadCondition": "TaskSuccess"
                }
            }
        ]
    }
},
```
- syntax for upload/download
```s
az batch file upload --local-path c:\source_videos\*.mp4 
    --file-group ffmpeg-input

az batch file download --file-group ffmpeg-output --local-path
    c:\output_lowres_videos
```

## Develop Solutions that use CosmosDB storage
- implement partitioning schemes
  - logical partitions to physical partitions (hash-based)
  - single key has 10GB of storage, min throughput of 400RU/s
  - spread data and request throughput for partition
- set appropriate consistency levels for operations
  - strong (exact)
  - bounded staleness (within k intervals)
  - session (reads guaranteed to honor consistent prefix, read your writes, scoped to client session)
  - consistent prefix (prefix of all updates, never see out-of-order writes)
  - eventual consistency (no ordering guarantee for reads)
  - can configure default consistency level
  - for HA and lowest latency, go with eventual consistency

## Develop solutions that use a relational db
- provision and configure relational databases
  - portal > SQL Database > db name, server with user/pwd
  - create firewall rule for single and pooled dbs using Azure portal
    - blocks traffic unless IP firewall rule is created
    - > Set server firewall > Add client IP
  - replication to SQL db single/pooled dbs
    - p2p txnal replication and merge replication not supported
    - snapshot + 1-way txnal replication are supported
    - can be running on-prem or in the cloud
    - 2012, 2014, 2016, 2017 versions are supported
    - must have primary keys, subscriber can be any region
    - limitations include permissions/spatial+filtered indexes/partitioning schemes
- configure elastic pools for Azure SQL database
  - cost-effective for scaling multiple dbs with unpredictable usage demands; share set number of resources at a set price
  - charged per hour a pool exists at the highest eDTU or vCores
  - basic, standard, premium; deltas in backup retention, CPU, IOPS, storage sizes, DTU
  - tradeoff is at 1.5x the resources of a standalone SQL server versus an elastic pool
  - choose pool size based on max resources utilized by all dbs in the pool or by max storage bytes utilized
    - estimate eDTUs or vCores first, then the storage space, then find the appropriate model, then determine min pool size, then compare to standalone single db costs
  - can use elastic jobs, and point-in-time/geo restores or active geo-replication
- CRUD data tables by using code

## Develop solutions that use blob storage
- implement blob leasing
  - establishes and manages a lock on a blob for write and delete operations for several seconds or infinite
    - `Acquire` (201), `Renew`, `Change`, `Release`, `Break` (202)
  - PUT: `https://myaccount.blob.core.windows.net/mycontainer/myblob?comp=lease`
    - Authorization, required
    - Date/x-ms-date, required
    - x-ms-lease-id, required to renew, change, or release the lease
    - x-ms-lease-action: acquire/renew/change/release/break
    - x-ms-lease-duration: -1 | N, for acquire operation, specifies duration of lease in seconds and between 15-60s
    - when lease is active, lease ID must be included for:
      - put blob, set blob metadata, properties, delete blob, put block, put block list, put page, append block, copy blob
        - would get a 412 - precondition failed otherwise
      - following operations work without including the lease id:
        - get blob, metadata, properties, get block list, get page ranges, list blobs, copy blob, lease blob
    - can delete container even if blobs have active leases
  - states of lease: available (acquire), expired (acquire, renew, release, break), leased (acquire, renew, change, release, break), breaking (release, break), broken (acquire, release, break)
- implement data archiving and retention
  - transition blobs to a cooler storage tier to optimize for performance cost
  - available for GPv2 accounts and blob storage accounts
  - free of charge
  - defined as a JSON with an array of rules
    - each rule has name, enabled, type, and definition
    - includes filter set (limits to objects within a container or object names) and action set
    - rule filters: blobTypes, prefixMatch
    - rule actions: tierToCool, tierToArchive, delete; `"tierToArchive": { "daysAfterModificationGreaterThan": 0 }`
  - can take up to 24 hours to run for the first time

```powershell
#Install the latest module
Install-Module -Name Az -Repository PSGallery 

#Create a new action object

$action = Add-AzStorageAccountManagementPolicyAction -BaseBlobAction Delete -daysAfterModificationGreaterThan 2555
$action = Add-AzStorageAccountManagementPolicyAction -InputObject $action -BaseBlobAction TierToArchive -daysAfterModificationGreaterThan 90
$action = Add-AzStorageAccountManagementPolicyAction -InputObject $action -BaseBlobAction TierToCool -daysAfterModificationGreaterThan 30
$action = Add-AzStorageAccountManagementPolicyAction -InputObject $action -SnapshotAction Delete -daysAfterCreationGreaterThan 90

# Create a new filter object
# PowerShell automatically sets BlobType as “blockblob” because it is the only available option currently
$filter = New-AzStorageAccountManagementPolicyFilter -PrefixMatch ab,cd 

#Create a new rule object
#PowerShell automatically sets Type as “Lifecycle” because it is the only available option currently
$rule1 = New-AzStorageAccountManagementPolicyRule -Name Test -Action $action -Filter $filter

#Set the policy 
$policy = Set-AzStorageAccountManagementPolicy -ResourceGroupName $rgname -StorageAccountName $accountName -Rule $rule1
```
