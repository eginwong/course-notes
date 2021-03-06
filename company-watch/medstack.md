# MedStack

## Background
- category: startup
- people:
  - Simon Woodside, Co-founder, CTO, CSPO
  - Balaji Gopalan, Co-founder
- size: 7-10
- KPI:
  - 1M ARR

## Value Prop
- provides 2/3 of health regulatory + compliance out of the box on their platform
- supports Docker containers
- scales
- encryption at rest, in flight
- Active Compliance to display all regulations followed in yml
  - can be generated on demand
- Control Backup System
  - hourly, daily, weekly, monthly
  - different cloud vendors require more adapters
    - can incur heavy penalty on performance
  - instead, use ZFS fs and do copy-on-write instead to allow snapshot backups
  - copies likely the binary instead of the specific content, avoiding adapters

## Security
- defence in depth
  - multi-layer defence
- e2e encryption
  - HTTPS, TLS
- encrypt data at rest

## Tech
- Docker Swarm
- tailwind UI recently
  - HTML only