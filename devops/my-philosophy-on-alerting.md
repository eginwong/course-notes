# My Philosophy on Alerting
[ref](https://docs.google.com/document/d/199PqyG3UsyXlwieHaqbGiWVa8eMWi8zzAn0YfcApr8Q/preview#heading=h.fs3knmjt7fjy)

## Summary
- pages should be urgent, important, actionable, and real
- represent ongoing or imminent problems with your service
- err on the side of removing noisy alerts
- problems should be classifiable under:
  - availability & basic functionality
  - latency
  - correctness (completeness, freshness, and durability of data)
  - feature-specific problems
- include cause-based information in symptom-based pages or on dashboards, but avoid alerting directly on causes
- make sure you can distinguish distinct problems in your alerts

## Introduction
- on pager behaviour
  - react with a sense of urgency (can only do a few times a day before fatigue)
  - actionable
  - require intelligence, no robotic scriptable responses
- do the rules/alerts
  - detect an otherwise undetected condition that is urgent, actionable, and actively or imminently user-visible?
  - can we ignore this rule as benign? Why and can we fix that?
  - can we wait to action on this item until the weekday or next quarter?

## Monitor for your users (symptom-based monitoring)
- users care about a small number of things:
  - basic availability and correctness
  - latency
  - completeness, freshness, durability
  - features

## Cause-based alerts are bad (but sometimes necessary)
- you need to catch the symptom anyway
- once you catch the symptom and the cause, you'll have redundant alerts; figure that out to tune
- some cause-based alerts are required because users won't know you're out of storage until things crash and that's preventable
- can look at using the load balancers but not as your only resource as they would get most of the traffic

## Tickets, Reports, and Email
- bug or ticket-tracking systems can be useful as long as they are maintained
- daily or frequent report works too
- every alert should be tracked through a workflow system 
  - don't only dump them in channels or email list as people will ignore
- alerts that are 50% accurate are broken; weekly review of all pages and quarterly statistics helps to trim down crap