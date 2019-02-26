# Incident Response at Heroku
[ref](https://blog.heroku.com/incident-response-at-heroku)

- Creating an incident response framework
  * based on natural disaster Incident Command System
  * Crew Resource Management, from aviation

## Incident response framework
- Move to a central chat room
- Designate Incident Commander (IC): 
  * doesn't fix issues directly or communicate with customers
  * ensuring the right people are involved
  * information is shared
  * all issues covered
  * incident resolution proceeding
- Update public status site
  * IC to assign communications role to notify the public, even if preliminary
  * include understanding of incident, impact on customers
- Send out internal sitrep
  * situation report, what we know about the problem, who is working on it, roles, open issues
  * acts as a concise description of current state and response to it
  * provides good summary for new and existing responders
  * make sure to distribute
- Assess problem
  * gain better information for public status communication (workarounds, who's affected)
  * details to help fix the problem
  * placed in sitrep
- Mitigate problem
  * try to mitigate customer-facing problems as best as possible
- Coordinate response
  * IC to coordinate people involved and information required
  * IC to start video call or google doc to collect team notes
- Manage ongoing response
  * IC to keep track of what problems have been solved/remain open, resolution methods, last communication with customers
  * IC to update sitrep, no problems to fall through the cracks, decisions in timely manner
- Post-incident cleanup
  * IC calls team to unwind any temp changes made during response
- Post-incident follow-up
  * IC to organize follow-up, either through weekly discussion or internal/public post-mortems
  * items/changes to be tracked through engineering team