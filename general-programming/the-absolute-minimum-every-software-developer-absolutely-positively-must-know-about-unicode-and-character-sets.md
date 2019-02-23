# The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets 
[ref](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)

- ASCII represents every character using a number between 32 and 127, conveniently stored in 7 bits
- codes below 32 were control characters (controlling computer, printing)
- people started using the last bit for whatever which caused chaos
- ANSI standard, everyone agreed on what to do below 128 
  - each separate region had different systems called code pages
- Unicode, a letter maps to a *code point* which is still an abstraction
  - first U means Unicode
  - following numbers are hexadecimal
- Encodings
  - could store in high or low endian
  - UTF-8 was able to encode Unicode code points in memory using 8 bytes
    - every code point 0 - 127 is stored in a single byte
    - above that can go up to 6 bytes
    -  without the corresponding code point, will get question marks
    -  UTF 7,8,16,32 store any code point correctly
> It makes no sense to have a string without knowing what encoding it uses.
> There ain't no such thing as plain text.

- need info in the `Content-Type: text/plain; charset="UTF-8"` line
- need to put the `<meta>` tag first in the page because the browser will re-parse the document when it sees that piece
  - can get away with the first 32-127 characters which will be sufficient for lines up to the meta tag 