# What Every Computer Scientist Should Know About Floating-Point Arithmetic
[ref](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html#680)

@reread

## Rounding Error
- infinitely many real numbers into finite number of bits requires an approximate representation
  - hence why we have rounding errors
  - IEEE is a standard to be used across different systems, for consistency

### Floating-point Formats
- most widely used is the floating-point representation
  - base B (assumed even) and a precision p
- two reasons why a real number might not be exactly representable as a floating-point number (real number in that format)
  - 0.1, in binary has an infinite repeating representation
    - it lies in between two floating-point numbers and cannot be represented by either of them
  - or a real number is out of range
- for example, 0.1 can be represented as `0.01 x 10 ^ 1` or `1.00 x 10 ^ -1`
  - if leading digit is nonzero, the representation is *normalized*

### Relative Error and Ulps
- ulps = units in the last place
- could calculate relative error, which is the two numbers divided by the real number
- relative error is said to always be bounded by e, which is machine epsilon

### Guard Digits
- floating-point hardware normally operates on a fixed number of digits (to save on computation costs)
  - relative error of the result can be as large as B - 1


## IEEE floating-point standard

## Connections