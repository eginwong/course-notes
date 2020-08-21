# Manage source control (10-15%)

## Develop a modern source control strategy
- integrate/migrate disparate source control systems (e.g. GitHub, Azure Repos)
  - innersource is an internal repo for your organization
- design authentication strategies
- design approach for managing large binary files (e.g. Git LFS)
- design approach for cross repository sharing (e.g. Git sub-modules, packages)
- implement workflow hooks

- can define strategy matrix for GitHub actions testing
- can also upload artifacts
  - can specify that test job requires artifact and use `actions/download-artifact@master` to retrieve it
- GitHub Secrets to be stored manually through the portal
  - can use labels for conditional deployments
- release-based workflow on GitHub
- using Azure Pipeline Tasks, transform build process into code
- can publish artifacts to be retrieved in ADO
- can define templates in your project and use `parameters` instead of `variables
- `coverlet` is a code-coverage cross-platform tool for .net Core
- Azure Artifacts to store your own packages
  - for ADO agent, must turn off `Limit job authorization scope to current project` and organization-level

## Plan and implement branching strategies for the source code
- define Pull Requests (PR) guidelines to enforce work item correlation
- implement branch merging restrictions (e.g. branch policies, branch protections, manual, etc.)
- define branch strategy (e.g. trunk based, feature branch, release branch, GitHub flow)
- design and implement a PR workflow (code reviews, approvals)
- enforce static code analysis for code-quality consistency on PR

## Configure repositories
- configure permissions in the source control repository
- organize the repository with git-tags
- plan for handling oversized repositories
- plan for content recovery in all repository states
- purge data from source control

## Integrate source control with tools
- integrate GitHub with DevOps pipelines
- integrate GitHub with identity management solutions (Azure AD)
- design for GitOps
- design for ChatOps
- integrate source control artifacts for human consumption (e.g. Git changelog)
- GitHub apps are installed, while OAuth apps are authorized
  - use webhooks
  - Probot is an app framework for building GitHub apps
- GitHub script that enables automation of common GitHub processes using GitHub Actions workflows
  - runs in node.js through octokit client