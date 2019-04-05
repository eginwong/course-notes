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
```sh
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

### for batch jobs, focus on knowing how to use the .NET SDK for creating jobs, setting them up, and executing
- `CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();`
- files in storage are defined as `ResourceFile` objects
- use the `BatchClient` object to create and manage pools, jobs, tasks in the Batch service
  - uses shared key authentication
- `BatchClient.PoolOperations.CreatePool` to set nmber of nodes, VM size, pool config
  - `VirtualMachineConfiguration` can be used to specify exact node agent, image reference, `targetDedicatedComputeNodes`
  - `CloudPool pool`, and must be `Commit()`
- `CloudJob job = batchClient.JobOperations.CreateJob()`
  - can set `PoolInformation` and `Id`, and then `Commit()`
- `CloudTask task = new CloudTask(taskId, taskCommandLine)`
  - `taskCommandLine` is the actual command from the image you wish to run
  - `task.ResourceFiles = new List<ResourceFile> { inputFiles[i]}` to add resource files
- `batchClient.JobOperations.AddTask(JobId, tasks)` wherein the `tasks` are a `List<CloudTask>`
- to wait for the tasks to finish, use 
- to check results, check the CloudTask `.ComputeNodeInformation` for details
- you will be charged for the pool while nodes are running






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
- ` TaskExecutionInformation.FailureInformation` to diagnose upload errors, `fileuploadout` and `fileuploaderr` files
- Batch File Conventions standards from .NET can help you view files in Azure Portal, plus sets standards

### Persist job and task data to Azure Storage with the Batch File Conventions library for .NET
[ref](https://docs.microsoft.com/en-us/azure/batch/batch-task-output-file-conventions)
- use if you want to stream data while task is running
- code is easy to modify to follow standards
- automatically name storage containers and task files
- requires linking Azure storage account with Batch account
  - all job and task outputs are st˝ored in the same storage container so *throttling* may occur
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
