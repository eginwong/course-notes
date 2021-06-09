# Emojis Under the Hood
[ref](https://tonsky.me/blog/emoji/)

- everything you did and didn't want to know about emojis and more
- from his conclusion:

```
A single codepoint 🧛 U+1F9DB
Single codepoint + variation selector-16 ☹︎ U+2639 + U+FE0F = ☹️
Skin tone modifier 🤵 U+1F935 + U+1F3FD = 🤵🏽
Zero-width joiner sequence 👨 + ZWJ + 🏭 = 👨‍🏭
Flags 🇦 + 🇱 = 🇦🇱
Tag sequences 🏴 + gbsct + U+E007F = 🏴󠁧󠁢󠁳󠁣󠁴󠁿
Keycap sequences * + U+FE0F + U+20E3 = *️⃣
```