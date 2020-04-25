# Fast-Paced Multiplayer: Client-Server Game Architecture

- to address cheating
  - not accounting for multiplayer: authoritative servers and dumb clients
  - however that opens us up to network latency
  - can potentially use client-side prediction if world is accurately deterministic and wait for server to confirm
    - can run into synchronization issues given proper circumstance
      - solve with ACKs
- use server time step to do batching of inputs and update periodically
  - can use dead reckoning to assume similar movement patterns for opponents
  - you can show opponent data late for live replay
- lag compensation for shooting
  - use timestamp when shooting and the server can recreate the world up to that point to confirm whether shot occurred or not