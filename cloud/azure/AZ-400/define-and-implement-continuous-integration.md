# Define and implement continuous integration (20-25%)

## Design build automation
- integrate the build pipeline with external tools (e.g., Dependency and security scanning, Code coverage)
- implement quality gates (e.g. code coverage, internationalization, peer review)
- design a testing strategy (e.g. integration, load, fuzz, API, chaos)
- integrate multiple tools (e.g. GitHub Actions, Azure Pipeline, Jenkins)

## Design a package management strategy
- recommend package management tools (e.g. GitHub Packages, Azure Artifacts, Azure Automation Runbooks Gallery, Nuget, Jfrog, Artifactory)
- design an Azure Artifacts implementation including linked feeds
- design versioning strategy for code assets (e.g. SemVer, date based)
- plan for assessing and updating and reporting package dependencies (GitHub Automated Security Updates, NuKeeper, GreenKeeper)
- design a versioning strategy for packages (e.g. SemVer, date based)
- design a versioning strategy for deployment artifacts

## Design an application infrastructure management strategy
- assess a configuration management mechanism for application infrastructure
- define and enforce desired state configuration for environments

## Implement a build strategy
- design and implement build agent infrastructure (include cost, tool selection, licenses, maintainability)
- develop and implement build trigger rules
- develop build pipelines
- design build orchestration (products that are composed of multiple builds)
- integrate configuration into build process
- develop complex build scenarios (e.g. containerized agents, hybrid, GPU)

## Maintain build strategy
- monitor pipeline health (failure rate, duration, flaky tests)
- optimize build (cost, time, performance, reliability)
- analyze CI load to determine build agent configuration and capacity
- manage pipeline health
- identify the number of agents and jobs to run in parallel
- investigate test failures

## Design a process for standardizing builds across organization
- manage self-hosted build agents (VM templates, containerization, etc.)
- create reuseable build subsystems (YAML templates, Task Groups, Variable Groups, etc.)

- build agents
  - Microsoft-hosted or self-hosted
    - limitation of microsoft
      - build duration < 6 hours
      - disk space
      - CPU/memory/network
      - interactivity
      - file shares
  - can configure one pipeline to build on multiple platforms
  - ssh to custom build agent and sign in with Personal Access Token
    - download agent installation from Azure
- continuous delivery
  - specific target env
  - auth to env
  - use Azure Pipelines to deploy build artifact to env
    - `buildType`
  - jobs are a series of steps
  - strategy is how app is rolled out
  - add a new service connection to deploy to Azure App Service
- multi-stage pipelines
  - `condition` can determine when job or task is run
  - Azure Stack Hub is for hybrid build processes
  - can create task groups and variable groups
- Testing
  - `IWebDriver` is interface for testing different browsers
- Configure infrastructure in Azure Pipelines
  - idempotency
  - for Ansible control machine, set up service principal and then create control machine
  - run from Azure Pipeline with built-in task
- Azure Automation State Configuration
  - ensure cluster are in a consistent state
  - uses PowerShell DSC
  - local configuration manager (LCM): Get, Test, Set
  - Push/Pull Modes for DSC
  - Mainly Windows OS and some Linux
  - DSC needs 443 and azure-autmomation.net + agent service
    - Configuration block
    - Node block
    - Resource block
    - MyDscConfiguration block, which runs it
  - pull mode is better for scale
  - requires Azure Automation Account
  - add required modules as necessary