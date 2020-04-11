# The Mythical Man Month

## The Tar Pit
- program is more expensive when it is a product or a system
  - product includes generalization, testing, documentation, maintenance
  - system includes interfaces, system integration
- joy is in creating; making something useful; puzzle-solving; learning
- woe is being perfect; dependent on others; could be obsolete before finishing; bugs

## The Mythical Man-Month
- estimation is hard
  - because of optimism
  - # of men vs # of months are not interchangeable
    - child bearing takes 9 months, even if you have 9 mothers
  - working with others introduces overhead of communication
  - 1/3 planning, 1/6 coding, 1/4 component + system test, 1/4 full test
  - adding manpower to a late project makes it later

## The Surgical Team
- stronger people are a magnitude better than others
- have a team of people but split functions so only one or two minds decide the product

## Aristocracy, Democracy, and System Design
- Conceptual integrity and self-abnegation over selfish pride
- if ease of use is purpose, function to conceptual complexity is a great test
- if we have conceptual integrity, there must be someone to control the concepts
- should have specs before implementation, to save time of implementers that would otherwise be waiting

## The Second-System Effect
- architect should suggest and not dictate to implementer
- architect should always be prepared to suggest a way of implementation of anything he specifies and accept alternatives
- the second system tends to be over-engineered because they have all the whistles that were held back from the first system

## Passing the Word
- architect defines contract of api
- emphasis on creativity rather than merely decision
- proposal should be distributed in writing before the meeting
- minutes are kept and disseminated
- each architect should keep a log of the questions they get and concatenate and share amongst others, to know what questions/information they are missing *WOW*

## Why Did the Tower of Babel Fail?
- because of communication and organization
- we address through a project workbook
  - objectives
  - external specs
  - interface specs
  - technical standards
  - internal specs
  - administrative memos
- technical prose is almost immortal
- there should be a change log that every developer reviews to catch up on changes

## Calling the Shot
- programming productivity is increased by as much as five times with a suitable high-level language

## Ten Pounds in a Five-Pound Sack
- be wary of the space used 
- representation is the essence of programming

## The Documentary Hypothesis
- Important documents
  - Objectives
  - Specifications
  - Schedule
  - Budget
  - Org Chart
  - Space Allocations
- Main Questions: what, when, how much, where, who
- Writing enables investigation of gaps and inconsistencies

## Plan to throw one away
- the first system will suck, but do you plan for it
- programmer is to deliver satisfaction, not a product
- what helps
  - careful modularization
  - extensive subroutining
  - precie and complete definition of interfaces
  - documentation of the previous
- **people avoid documenting design because they're afraid of committing** 
- program maintenance eventually leads to destruction of system into unfixable obsolescence

## Sharp Tools

## The Whole and the Parts
- defining will eliminate a large class of bugs, because the failures exist where those aspects are not defined

## Hatching a Catastrophe
- schedule slips occur from termites, not tornadoes
  - slow attacks on the schedule
- to remedy
  - a schedule
  - clearly defined milestones
  - critical path network
  - have a boss who will review status instead of problem-action meetings

## The Other Face
- On how to write good documentation
  - purpose
  - enviroment
  - domain and range
  - functions realized and algorithms used
  - I/O formats, precise and complete
  - operating instructions
  - options
  - running time
  - accuracy and checking
- one-page flow chart for a substantial program is useful
- minimize the burden of documentation
- write more paragraph explanations in code

## No Silver Bullet - Essence and Accident in SWE
- to avoid problems in SWE
  - re-use what's out there
  - rapid prototyping
  - building only what is used and add functions along the way
- SWE deal with complexity that is inherent to the problem space
- more prone to changes
- software is invisible
- write more prototypes
- grow, not build, software
- grow the best designers like you do the managers
  - systematically identify top designers as early as possible
    - not commensurate with experience
  - assign a career mentor + careful career file

## "No Silver Bullet" Refired
- productivity will follow quality
- no silver bullet, but there are solutions that are incremental and we drive towards them

## Propositions of the Mythical Man-Month: True or False?
- Reviewing the estimates