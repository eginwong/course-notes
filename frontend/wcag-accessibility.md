# Web Content Accessibility Guidelines (WCAG) Overview
- [ref](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [demo 1](https://www.w3.org/WAI/demos/bad/before/annotated/home.html)
- [demo 2](https://www.washington.edu/accesscomputing/AU/before.html)

## WCAG 2.1 at a Glance
- Perceivable
  - text alternatives for non-text content
  - captions or other for multimedia
  - content that works with assistive technologies (see/hear)
- Operable
  - keyboard-available with functionality parity
  - provide enough time to read and use content
  - do not cause seizures
  - help users navigate and find content
  - provide other inputs than keyboard
- Understandable
  - text is understandable and readable
  - content must appear in predictable ways
  - help users avoid and correct mistakes
- Robust
  - compat with current and future tools

## Web Content Accessibility Guidelines (WCAG) Overview
- WCAG 2.0 published on Dec 11, 2008
- WCAG 2.1 published on June 5, 2018

## WAI-ARIA (Accessible Rich Internet Applications) intro
- addresses how to make things more accessible for those without mouse or keyboard functionality
- Making Ajax and Related Technologies Accessible
  - tricky features like: drag-and-drop, tree menus
- enables users to navigate better then pressing Tab many times
- WAI-ARIA provides roles to describe widgets
  - menu, treeitem, slider, progressmeter
  - describes structure of web page
  - state of widgets

## REFERENCE
### How to meet WCAG 2.0 
- Dec 2008
- even AAA is not bullet-proof for all disabilities
- 1.1 Text alternatives: provide text alternatives for any non-text content
  - use aria-label to provide labels for objects
  - use aria-labelledby for non-text content
  - alt attributes on img elements
  - text alternatives for ASCII art, emojis
  - use html longdesc
  - use html body of the object element
  - use link text that describes the purpose of a link for anchor elements
  - use label elements to associate text labels with form controls
  - using title attribute when label element cannot be used
  - provide text alternative for CAPTCHAs
  - if ignorable, use null alt text and no title attribute
- 1.2 Time-based Media
  - for audio content, include text transcript
  - for video content, include text transcript
  - provide always visible captions
  - provide closed captions
  - html has track tag for captions
  - AAA: sign language interpreter in the video stream
  - AAA: extended audio descriptions, that pause the video for content to play
- 1.3 Adaptable
  - info and relationships
    - aria landmarks to identify regions of a page
    - role=heading to identify headings
    - aria-labelledby for regions, landmarks, UI controls
    - grouping roles to identify related form controls
    - using semantic markup and elements
    - using text to convey info 
    - separating info and structure from presentations to enable different presentations
    - html table markup
      - summary attribute
      - id and headers attribute for header and data cells
    - captions
    - labels
    - titles
    - ol/ul/dl
    - optgroup to group option elements inside a select
    - h1-h6 for headings
    - group related links using the nav element
    - use standard text formatting conventions
  - order content in a meaningful sequence
  - use unicode RTL mark or LTR mark
  - add dir attribute on an inline element to resolve problems
  - css position content and letter-spacing to control spacing
  - make DOM order match visual order
- 1.4 Distinguishable
  - ensure information from color differences is available in text
  - include text cue for colored form control labels
  - ensure additional visual cues when text color differences are used to convey info
  - ensure contrast ratio is up
  - use color and patterns to convey info
  - make sure sound stops after 3s
  - create control to stop auto-playing sounds
  - play sounds only on user request
  - ensure contrast ratio of visuals is 4.5:1 between text+images and background
  - avoid messing with background/text colors to allow user agents to handle it
  - add control to increase contrast
  - use common tech to allow for zoom with user-agents
  - use em units for width/height or fonts
  - use liquid layouts
    - avoid horizontal scroll bars
  - ensure no loss of functionality even with zoom
  - separate info and structure from presentation to enable different presentations

- 2.1 Keyboard Accessible
  - ensure keyboard control for all functionality
  - html form controls/links
  - ensure all features can be accessed via keyboard (like drag and drop, reordering)
  - no keyboard traps
- 2.2 Enough Time
  - providing a checkbox on first page of multipart to provide longer session time limit
  - provide way to turn off time limit
  - allow content to be paused and restarted from where it was paused
  - stop content that blinks for more than 5s
  - turn off animated gif and blinking within 5s
  - add a control to turn off the blinking/gifs
  - provide a link to reload page without blinking content
- 2.3 Seizures and Physical Reactions
  - ensure nothing flashes more than three times in any 1-second period
  - keep flashing area small (for seizures)
- 2.4 Navigable
  - add link to top of each page that goes directly to main content area
  - add link to go to end of the block
  - using aria landmarks to identify regions of a page
  - provide heading elements at beginning of each section of content
  - use title attribute for frame and iframe elements
  - use frame elements to group blocks of repeated material
  - add descriptive title elements
  - correct focus order
  - logical tab order through links, form controls, and objects
  - provide link text that describes purpose of link and anchor elements
  - use css to hide a portion of the link text
  - aria-labelledby, and aria-label
  - provide table of contents
  - site map
  - search function
  - list of links to all other Web pages
  - provide descriptive headings and labels
  - highlight for focus visible
  - highly visible focus indicators
  - breadcrumb trail
  - organize a page using headings
- 2.5 Input Modalities
- 3.1 Readable
  - use language attribute on html element
  - special cases for unusual words
    - and abbreviations
    - and reading level for people of lower secondary education
    - and pronunciations
- 3.2 Predictable
  - on focus, make sure no changes of context occur that is not predictable
  - provide submit button to initiate change of context
  - consistent navigation through repeated components in same relative order
  - using labels names and text alternatives consistently for content that is the same
  - AAA: change on request, instead of push
- 3.3 Input Assistance
  - error identification
    - provide validation fields with text descriptions as to why
    - aria-invalid
    - providing descriptive labels
      - proper positioning
      - aria labels
      - text instructions
      - expected data format and example
      - using label or legend for html indication
    - provide ability for user to review and correct answers before submitting
    - provide user ability to recover deleted information
    - request confirmation to continue with selected action
    - checkbox + submit button
  - AAA: help links on every page or assistant
- 4.1 Compatible
  - validating web pages
  - fully conforming to specs
  - html according to specs
    - unique ids
    - well-formed pages
    - open and closing tags
  - aria-label, labelledby for invisible interfaces
  - use markup features to expose name and role, allow user-settable properties to be set and notification of changes

### WCAG 2.1 

### WAI-ARIA 1.1
- Dec 2017
- Roles Model
- Supported States and Properties
- 