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
    * handles states through callbacks to, each fires ON_X events
    * `onCreate()`, create views, bind data, `setContentView`
        * logic that should only happen once for entire life of activity
    * `onStart()`, activity becomes visible
    * `onResume()`, right before interacting with user
    * `onPause()`, activity loses focus and enters Paused state
        * should not use for persisting, network calls
    * `onStop()`, no longer visible
    * `onRestart()`, restores state of activity from time it was stopped
    * `onDestroy()`, releasing resources
    * remember to release resources on the corresponding start/stop events
    * best practice to use lifecycle-aware components for re-useability as opposed to in the callbacks directly
![lifecycle-architecture](https://developer.android.com/guide/components/images/activity_lifecycle.png)
* Activity state and ejection from memory
    * to free up RAM
    * (created, started, resumed) < paused < stopped < destroyed
* Saving and restoring transient UI state
    * when activity is destroyed due to system constraints, preserve transient UI via `ViewModel`, `onSaveInstanceState()`
    * when a child activity exists, it can return an enum to its parent and even an `Intent` object
    * if Activity A launches B, A `onPause()` -> B `onCreate()`, `onStart()`, `onResume()` and if A is no longer on screen, A `onStop()`
  
#### Activity State Changes
* configuration changes (e.g., portrait, landscape orientations)
    * activity is destroyed and recreated
    * for multi-window, can handle configuration change or allow system to destroy and recreate with new dimensions
* user taps *Back* button
    * `onPause()`, `onStop()`, `onDestroy()`, activity is destroyed and removed from the back stack
    * `onSaveInstanceState()` callback, by default, does not fire in this case
* use `AndroidX Test` to simulate various states of the activity lifecycle

#### Tasks and Back Stack
> task is collection of activities that users interact with when performing a certain job
* activities in a task are arranged in a stack, *back stack*, in the order in which activity is opened
    * never re-arranged, only pushed/popped
    * LIFO
* task is cohesive unit that can move to "background"
* activities can be instantiated multiple times, even from other tasks
    * this can be configured 

// create anchor here
[APPENDIX: HOMEWORK#1]

## Application Fundamentals
* Android OS is multi-user Linux system in which each app is a different user
* each process has its own VM, for app code execution isolation
* multiple apps can share same Linux user ID, so they can share file access
    * can also run in same Linux process and VM to save resources
    * must be signed with same cert
* otherwise, app can request permissions to do anything

### App Components
* the four different types of app components:
    * activities
        * entry point for interacting with user, single screen with user interface
        * facilitates user interaction with UI thread
    * services
        * entry point for an app running in the background
        * no associated UI
        * *started services*: either known service (music playback) or unknown service (system operations)
        * *bound service*: which is an API of another process
    * broadcast receivers
        * global message delivery from the system to apps, outside of regular user flow
        * apps can also initiate broadcasts
        * *gateway* to other components 
        * e.g., battery is low, 
    * content providers
        * manages a shared set of app data for persistence
        * to the system, content provider is entry point into an app for managing data by URI scheme
        * not activated by intent
* apps cannot directly activate a component; must go through Android system
* in order to activate each type of component:
    * `startActivity()`, `startActivityForResult()` with an `Intent`
    * `JobScheduler` post Android 5.0
    * `sendBroadcast()`, `sendOrderedBroadcast()`, `sendStickyBroadcast()` with an `Intent`
    * call `query()` on `ContentResolver` for content provider

### The manifest file
* app must declare all components in `AndroidManifest.xml`
    * declares min API level
    * user permissions
    * hw/sw features required (e.g., bluetooth, camera)
    * required API libraries
* if resource is undeclared, system can never run it
    * broadcast receivers can be created dynamically in code as `BroadcastReceiver`
* Note: do not start a service via implicit intent, security hazard [KO question]

### App Resources
* application configuration properties
    * don't need to modify source code






# whee

QUAERITUR: where do we make promises, onCreate? or onStart?

TODO: best practices for activity lifecycle

QUAERITUR: task-ception?

## Appendix

### HOMEWORK#1: 
Assigned Reading:
1. [App Manifest Overview](https://developer.android.com/guide/topics/manifest/manifest-intro) 
2. E -> (1-14) K -> (15-27)
3. [app resources](https://developer.android.com/guide/topics/resources/providing-resources) 
Coursework:
1. [build your first app](https://developer.android.com/training/basics/firstapp/)
* take notes of mistake/error areas


Path: finish fundamentals > dummy app > testing

cover practical topics as we progress / build up
future HOMEWORK: split best practices
future EXERCISE:
    * trigger all the different lifecycles 
    * review [testing an activity doc](https://developer.android.com/guide/components/activities/testing)