# Write your Own Virtual Machine

[ref](https://justinmeiners.github.io/lc3-vm/)

- vm is a program that acts like a computer
  - simulates a CPU
  - similar to a compiler which
    - creates one standard CPU architecture to be abstracted from underlying CPUs
    - has no runtime overhead
  - can also run code in secure/isolated way
    - C cannot see its own stack / variables
- begin with memory at 65536 locations
- registers
  - workbench of CPU to work with a piece of data
  - stores single value on CPU
  - in LC-3, 8 general purpose registers, 1 program counter, 1 condition flag
- instruction set
  - instruction is a command which tells CPU to do some fundamental task
    - composed of opcode and parameters
    - only 16 opcodes in LC-3
    - each instruction is 16 bits long, with left 4 bits storing opcode
      - rest are for params
  - small instruction set, RISC, vs large instruction set, CISC
- condition flags (R_COND register)
  - LC-3 only has 3 condition flags, POS, NEG, or ZRO (x > 0, < 0, == 0)
- assembler takes assembly language and converts from text into binary for the machine
- instruction
  - 4 bits are opcode
  - 3 bits are destination register
  - 3 bits are source register
  - 1 bit is to determine immediate mode or register mode
- any time code is written to a register, the R_COND flag must be updated to indicate its sign
- memory mapped registers
  - special registers that are hard-coded, usually for special hardware devices