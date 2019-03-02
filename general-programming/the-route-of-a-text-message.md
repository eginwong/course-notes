# The Route of a Text Message
[ref](https://scottbot.net/the-route-of-a-text-message/)

- tap of finger on phone, which registers a change in voltage through algorithm
- phone records coordinates of tap, to correspond to the intended character
- the phone must determine if finger tap was swipe based on voltage disruption greater than a certain number of pixels (*touch slop*)
- communication between cell towers is through 279B, which includes phone numbers, and type of message (call or SMS)
  - left with a remainder of 140 * 8 bits
  - chose to encode with 7-bit instead and remove some less often used characters to fit 160 chars
    - called GSM-7
- converts the 8b text into 7-bit hex codes, communicates with SIM card to towers
  - 140B + 36B of context
  - 10B are telephone number or service center address, SCA, of the SMS service center, SMSC, which receives, stores, forwards, and delivers text messages
  - 1B for PDU-type, status of message, whether single or chain of messages
  - 1B for message reference (MR), a short-term ID to let the phone and carrier know which text message its dealing with, between 1 and 255
  - ~12B reserved for recipient's phone number, called the destination address (DA)
    - encoded in reverse nibble notation, an awful encoding scheme
  - 1B for Protocol Identifier (PID), to indicate fax, voice line, SMS to phone, etc.
  - 1B for data coding scheme (DCS), which character encoding scheme was used
  - ~7B, validity period (VP) space, timestamp or duration, indicates how long to wait before cancelling the text (default is 7 days)
  - 1B, user data length, to indicate how long the message is supposed to be, in case of false positives for error
  - 140B, for the user data (UD)
- convert 176B -> 279B readable by SS7 protocol -> analog radio signal between 800-2000 megahertz
  - hits the base transceiver station (BTS), which can't handle more than 200 active users at a time
  - then routes to base station controller (BSC) which is routed to the SCA to get to the appropriate SMSC
![diagram](https://lh3.googleusercontent.com/5PSN844ciuDUjzZnVHDSooXHrkKhvX9rjG14k_oUUffT7Xm97KOlT0dIYKPje2wY0LEr6MlXCKDkU4OaHhQlieI52s6njAZDagiIodE3eElX-UcpDCRoBgyDIHh15KgnZBVBl34y)
- once received, the message is missing the VP, MR, DA
  - new pieces of info are originating address (OA), and service center time stamp (SCTS)