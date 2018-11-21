# Documentation

## What is an activity?
* doesn't start from `main()`
* one activity = one screen
* typically, one activity is specified as the main activity
* must be registered in app's manifest, manage lifecycles
* after publishing app, do not change activity names as it will break things
* Intent filters launch activities explicitly or implicitly
    * are for *implicit*
    * otherwise, explicit
* declare permissions
    * `<activity>` to control which apps can start a particular activity
    * declaring sets it in the `<activity>` tag, as `android:permission="..."`,
    * must have receiving `<uses-permission>`
* Activity Lifecycle
    * handles states through callbacks to 
    * `onCreate()`, create views, bind data, `setContentView`
    * `onStart()`, activity becomes visible
    * `onResume()`, right before interacting with user
    * `onPause()`, activity loses focus and enters Paused state
        * should not use for persisting, network calls
    * `onStop()`, no longer visible
    * `onRestart()`, restores state of activity from time it was stopped
    * `onDestroy()`, releasing resources
![lifecycle-architecture](https://developer.android.com/guide/components/images/activity_lifecycle.png)
* Activity state and ejection from memory
    * to free up RAM
    * (created, started, resumed) < paused < stopped < destroyed
* Saving and restoring transient UI state
    * when activity is destroyed due to system constraints, preserve transiet UI via `ViewModel`, `onSaveInstanceState()`
Q: where do we make promises, onCreate? or onStart?

TODO: best practices for activity lifecycle