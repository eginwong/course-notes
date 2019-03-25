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
\ create pool with nodes
\ create a job
\ create tasks
```

## Self-study
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
- 