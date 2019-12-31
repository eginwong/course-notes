// source: https://github.com/jasnell/broken-promises/blob/master/Part1/Puzzle/puzzle.js

const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function bar(n, s, t) {
  setImmediate(() => process.stdout.write(s));
  await sleep(n);
  return t;
}

async function foo() {
  process.stdout.write('3L');
  for (const m of await Promise.all([bar(20, '9N', '11R'), bar(10, '10T', '12E')]))
    process.stdout.write(m)
}

sleep(50).then(() => process.stdout.write('13A'));

new Promise((res) => {
  process.stdout.write('1H');
  res('5O');
}).then((m) => process.stdout.write(m))
  .finally(() => process.stdout.write('7M'));

queueMicrotask(() => process.stdout.write('6 '));

process.nextTick(() => process.stdout.write('4L'));

setTimeout(() => process.stdout.write('14L'), 100);

setImmediate(() => process.stdout.write('8O'));

process.stdout.write('2E');

foo();