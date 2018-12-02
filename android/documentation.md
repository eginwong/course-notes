# Documentation

# App basics 

## Build your first app
* apps provide multiple entry points
* apps adapt to different devices
* UI built using hierarchy of layouts (`ViewGroup`) and widgets (`View`)
* chain is a bidirectional constraint between 2+ views that allow you to lay out chained views in unison
* `Intent` is an object that provides runtime binding between separate components
    * can pass messages via *extras*, kv-pairs
    * best to identify keys with package prefix to avoid collision with other apps
* for any screen that is not the home screen, need to add metadata in `AndroidManifest.xml` to include navigation back to home
    * `android:parentActivityName`

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
    * package name
        * important for resolving relative class name declarations
    * declares min API level
    * user permissions
    * hw/sw features required (e.g., bluetooth, camera)
    * components of the app (activities, services, broadcast receivers, and content providers)
    * required API libraries
    * intent filters
    * icons and labels
* if resource is undeclared, system can never run it
    * broadcast receivers can be created dynamically in code as `BroadcastReceiver`
* Note: do not start a service via implicit intent, security hazard [KO question]
* package name + application ID is global universal ID on the playstore to identify this app
    * generally applicationId (build.gradle) and package name (manifest) are the same but differences will need to be resolved
        * application ID must have two segments, starting with a letter, and alphanumeric or _
        * may want to split if you want to upload two distinct versions of one app, like "free" and "pro"  
            * via `productFlavors` with `applicationIdSuffix`
    * package name in `AndroidManifest.xml` must match your directory structure for building
* mandatory fields are `<manifest>` and `<application>`
* manifest elements reference

| tag          | description | miscellaneous |
|--------------|-------------|---------------|
| `<action>` | adds action to an intent filter |   |   
| `<activity>` | activity available for UI  | can rearrange tasks affinity, launchMode  |   
| `<activity-alias>` | alias for activity |   |   
| `<application>` | declaration of the application, for default values | backups, acceleration, booting, memory, network |   
| `<category>` | inside intent-fiter, for implicit intents |   |   
| `<compatible-screens>` | inside manifest, specifies screen configurations | informational only, for understanding application's compatibility |   
| `<data>` | inside intent-filter, data-type or URI or both | ? |   
| `<grant-uri-permission>` | specifies subset of data that parent content provider has permission to access |   |   
| `<instrumentation>` | enables monitoring an application's interaction within the system |   |   
| `<intent-filter>` | specifies types of intents that an app component can respond to |   |   
| `<manifest>` | bootstrapping | versioning, packaging |   
| `<meta-data>` | name-value pairs to load resources, additional arbitrary data |   |   
| `<path-permission>` | path and required (read,write) permissions for content provider |   |   
| `<permission>` | security permission to limit access to specific components or features  |   |   

### App Resources
* additional files and static content (e.g., bitmaps, layout definitions, UI strings, animations)
    * meant to avoid modifying source code unnecessarily
* resources placed under separate folders under `res/`
    * `animator`, property animations
    * `anim`, tween animations
        * [ref](https://developer.android.com/guide/topics/resources/animation-resource)
    * `color`, state list of colours
    * `drawable`, bitmap or XML files
    * `mipmap`, drawable files for launcher icon densities
    * `layout`, XML UI layout
    * `menu`, app menus
    * `raw`, abitrary files to open with `InputStream`
    * `values`, XML values for strings, ints, colors
    * `xml`, arbitrary XML files read at runtime
    * `font`, font files
* provide alternatives resources to support specific device configurations
    * Android detects current device configuration at runtime and loads the resource accordingly
    * must follow priority and incorrect sequences of resources are ignored
    * mobile country code (MCC) and mobile network code (MNC), e.g., mcc310-mnc004
    * language and region, e.g., en, fr, fr-rUS
    * layout direction, .e.g., ldrtl, ldltr
    * keyboard availability, touchscreen type, dpi, screen orientation, ui mode, night mode
    * there is a hierarchy that must be followed, if concatenated with dashes
        * [ref here](https://developer.android.com/guide/topics/resources/providing-resources)
* in order to create an alias to the resource, store the image under some default resource directory and use an XML with a reference to that location for other subset directories
* accessing app resources via resource ID, made from resource type (integer, string, etc.) and resource name
    * `@string/hello` in XML, and `R.string.hello` in code
    * can also reference style attributes from current theme, via `?[package_name][resource_type]resource_name`
    * if raw files are required, need to place them under `assets` and use the `AssetManager` to retrieve them
* when defining resources in folders, generally try to leave a default for compatibility reasons
* when Android matches the closest configuration, it follows priority list and takes the most suitable candidate in terms of available precedence
    * once a match, eliminate all other types that do not include that configuration
* in order to handle state changes, potentially storing values in the `ViewModel` object would be better than re-firing long processes
    * generally better to retain an object over handling configuration change yourself and not restarting due to hidden complexity
    * for manually handling config change, use `android:configChanges` in the `activity` element of the manifest to specify which change to handle
        * Activity will receive call to `onConfigurationChanged()`, `Resources` are updated with any new resources based on configuration
* Localization
    * must have defaults or else the app does not run
        * stored directly under `res/<resource-type>`
    * locale almost always takes precedence for Android's loading of resources (below MCC, MNC)
    * put all strings in `strings.xml`
    * provide context to strings for better translation
    * can add exclusions to translation via `<xliff:g>`, make sure to include reason why
        * `<xliff:g id="star">\u2605</xliff:g>`
        * `<xliff:g id="application_homepage">http://my/app/home.html</xliff:g>`
    * to assist in localization, design a flexible layout, limit number of exceptions
    * in order to test locales, can use emulator or run changes in adb directly
        * test in a locale you do not support to ensure default resources are available
        * pseudo-locales are made up but can help to test various locales locally before using a real translation
            * [ref for setup](https://developer.android.com/guide/topics/resources/pseudolocales)
        * frequent issues being string concatenation, hard-coded strings, bi-directional text, and RTL
    * unicode support varies across Android versions, using ICU, CLDR
    * better multi-lingual support in Android 7+, for resolving mismatched user settings > app resources
* inline complex XML resources are possible for resources that require multiple XML files, by combining into one file
* animation resources
    * Tween animation is rotating, fading, moving, stretching a graphic
        * Interpolator is an animation modifier that affects rage of change in animation
    * Property animation is background color, alpha value, over a set amount of time
    * Frame animation shows a sequence of images in order (like a film)
* color state list resource
    * provide color change on different state of `View` object to which it is applied
    * first match to be applied, not by best matching priority
* drawable resource
    * graphic that can be drawn to screen and retrievable via API or applicable to another XML resource
    * bitmap (png > jpg > gif), XML bitmap
    * nine-patch, stretchable regions to expand to accommodate content
    * layer list, manages an array of other drawables
    * state list, several different images to represent same graphic
    * level list, manages a number of alternate Drawables, each with max numerical value to be toggled
    * transition drawable, can cross-fade between two drawable resources
    * inset drawable, will inset another drawable by a specified distance to keep a background smaller than View's actual bounds
    * clip drawable, meant to clip another drawable based on this Drawable's current level, for progress bars
    * scale drawable, which changes size of another drawable based on its current level
    * shape drawable, generic shape
* layout resource
    * architecture for the UI in an Activity or component
    * can only contain one root element, be it ViewGroup, View, or merge
* menu resource
    * defines application menu to be inflated with `MenuInflater`
* string resource
    * string, string array, quantity strings (plurals)
    * can style with markup and format 
    * Spannables are a way to programmatically create styling for text
    * annotations are another way of styling complex text through XML + programmatically
* style resource
    * defines format and look for a UI, applicable to `View` or entire `Activity` or application
* font resource
    * defines custom font in your app either via bundle or download
* more resource types
    * bool, color, dimensions, id, integer, integer array, typed array
    * `@+id` means id needs to be created, while `@id` means it already exists


# Core Topics
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

[>>> HOMEWORK](#HOMEWORK#1)

[>>> HOMEWORK](#HOMEWORK#2)

#### Fragments
* represents a behavior or a portion of UI in a `FragmentActivity`
    * can be combined for modularity in a multi-pane UI
    * each with its own lifecylce and input events
    * always hosted in an activity and is directly affected by host lifecycle
    * actions on a `Fragment` will be placed on the back stack
    * inserted via `<fragment>` in XML layout or added to `ViewGroup`
* Design Philosophy was for dynamic and flexible UI
    * modularity
    * ![fragment_lifecycle](https://developer.android.com/images/fragment_lifecycle.png)
    * implementation requires `onCreate()`, `onCreateView()`, `onPause()`
    * could extend `DialogFragment`, `ListFragment`, `PreferenceFragmentCompat`
    * the way to add UI to a fragment is to inflate from a XML layout, with parameter for `container` being the parent `ViewGroup`
        * arguments are (ID of layout, `ViewGroup` to be parent of layout, boolean indicator of attaching to second parameter during inflation or not, but would be redundant)
* Managing Fragments with `FragmentManager` via `getSupportFragmentManager()`
    * modifying fragments in activity are considered `FragmentTransaction`s
        * explicit methods for `addToBackStack()` and `commit()` to propagate change
    * after `commit()`, transaction is executed based on UI thread scheduling
* to manage communication between fragments and activity, make use of event callbacks
    * listener is added `onAttach()` of Fragment to Activity
* main difference between Activity to Fragment is how one is placed in the back stack while the other is only explicitly placed there, respectively
* use `FragmentScenario` for testing

Aside: Lifecycle of a Fragment is overly complicated and happens to bind business and presentation logic together. Best use is to leave most of the work to `ViewModel` and use as little of a Fragment as generally required.


# whee

QUAERITUR: where do we make promises, onCreate? or onStart?

TODO: best practices for activity lifecycle

QUAERITUR: task-ception?
QUAERITUR: effect of gravity on elements

## Appendix

### HOMEWORK#1: 
Assigned Reading:
1. [App Manifest Overview](https://developer.android.com/guide/topics/manifest/manifest-intro) 
2. E -> (1-14) K -> (15-27)
3. [app resources](https://developer.android.com/guide/topics/resources/providing-resources) 
Coursework:
1. [build your first app](https://developer.android.com/training/basics/firstapp/)
* take notes of mistake/error areas
    * downloaded Pixel Pie for emulation 
    * error: requires x86 emulation currently requires hardware acceleration
        * restart Windows and open BIOS to enable virtualization
    * error: was crashing when adding second activity, put code outside of the `onCreate` hook
        * `Caused by: java.lang.NullPointerException: Attempt to invoke virtual method 'java.lang.String android.content.Intent.getStringExtra(java.lang.String)' on a null object reference`
 
### HOMEWORK#2: 
Assigned Reading:
1. [Fragment section](https://developer.android.com/guide/components/fragments)
2. [Square Engineering on Fragment use](https://medium.com/square-corner-blog/advocating-against-android-fragments-81fd0b462c97)
3. [Fragments in 2018](https://medium.com/inloopx/using-android-fragments-in-2018-b9cf0b05b718)
Coursework:
N/A


Path: finish fundamentals > dummy app > testing

cover practical topics as we progress / build up
future HOMEWORK: split best practices
future EXERCISE:
    * trigger all the different lifecycles 
    * review [testing an activity doc](https://developer.android.com/guide/components/activities/testing)
