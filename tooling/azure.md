# Azure

# Deploying your applications with VsTS
* must set up resource groups > service apps
* use `Web App` for templating as it is the most straightfoward
* Azure requires the artifacts to be in a `zip`ped format so there may be need to make use of special libraries, like `pack-zip` for npm to bundle
* for UI projects, may be best to bundle with node/express to serve up the application
* on the Azure Portal side, can get logs from the `Console` and piping output to files
* may need to set environment variables in the `Application Settings` tab
* under `SSL Settings` set the `HTTPS Only` flag to be `On`, for security

# For securing things behind Azure AD
* for the registered application go to App registrations > your_app_name > Authentication / Authorization
* turn on the authentication
* set "Action to take when request is not authenticated" to `Log in with Azure Active Directory`
* Under authentication providers, select Azure Active Directory > Express > create new > save
* Under Azure AD > App Registrations > make sure to get admin user to `Grant Permissions` to Windows Azure Active Directory for the linking to work
* If you secure both API and UI, there will be CORS issues if you do not specifically handle the UI getting access to the login token and then passing that in the header of the requests made to the API
    * there are libraries here, particularly `ADAL` for this purpose
    * make sure to have already enabled CORS either from Azure or your app (note Azure > app CORS settings)
    * in order to enable your api to be granted as access to the UI, go to the App Services > your_api_here > Managed service identity > On
    * set the `oauthAllowImplicitFlow` to `true`