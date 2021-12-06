//  https://adventofcode.com/2021/day/1
//  1825987-20211205-00bc6f93

const fs = require('fs');
const inputs = fs.readFileSync('input.txt', { encoding: 'utf8'}).split('\n').filter(Boolean).map(v => +v);

let count = 0;
let previous = inputs[0] + inputs[1] + inputs[2];
console.log(`${previous} (N/A - no previous sum)`);
for (let i = 1; i < inputs.length - 2; ++i) {
  const v = inputs[i] + inputs[i + 1] + inputs[i + 2];
  if (v > previous) {
    ++count;
    console.log(`${v} (increased)`);
  } else if (v < previous) {
    console.log(`${v} (decreased)`);
  } else {
    console.log(`${v} (no change)`);
  }
  previous = v;
}
console.log(`found ${count} increases`);
