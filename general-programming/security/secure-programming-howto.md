# Secure Programming HOWTO
[ref](https://dwheeler.com/secure-programs/Secure-Programs-HOWTO/index.html)

## Introduction
- compilation of lessons learned

## Background

### History of Unix, Linux, Open Source / Free Software
- unix split at one point between academics at Berkeley (BSD) and AT&T the original owners
- since then, Linux, with distributors (RH, SuSE, Debian, etc)

### Security Principles
- security objectives
  - confidentiality
  - integrity
  - availability
- defense in depth, have layers in place to stop attackers

### Why do Programmers Write Insecure Code?
- poor education
- do not think in multi-user
- most programmers are just not very good
- most programmers don't think like security people
- security costs extra dev time

### Is Open Source Good for Security?
- begins less secure but grows overtime due to code reviews; 
- can be fixed quickly, opposed to closed source

### Types of Secure Programs
- application programs used as viewers of remote data
- app programs used by administrator
- local servers
- network-accessible servers
- web-based apps
- applets

## Summary of Linux and Unix Security Features

### Processes
- user-level activities are implemented via running processes
- processes may be created using fork, vfork (not recommended), or clone (spec to Linux)

### Files
- Filesystem Object Attributes
  - owning UID and GID
  - permission bits (rwx) for owner, group, other
  - timestamps
- POSIX Access Control Lists (ACLs)
  - extra layer of ACL entries that determine permission to access the File system object
- change access control attributes via `chmod`, `fchmod`, `chown`, `chgrp`