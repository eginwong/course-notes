# npm playbook - Pluralsight

- can install gists, `npm i gist:hash_here`
- can also install from folders `npm i ./`, requires package.json 
- can run `npm prune` which removes extra packages installed not in package.json
    * can run `npm prune --production` which will remove all dev dependencies for production
- can run `npm repo <package_name>` and will go straight to their repository in a browser
- can run `npm version patch/minor/major` which will also include tags and commits
- can tag in publish `npm publish --tag beta`