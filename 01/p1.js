//  https://adventofcode.com/2021/day/1
//  1825987-20211205-00bc6f93

const fs = require('fs');
const inputs = fs.readFileSync('input.txt', { encoding: 'utf8'}).split('\n').filter(Boolean).map(v => +v);
let previous = inputs[0];
let count = 0;
console.log(`${previous} (N/A - no previous measurement)`);
for (let i = 1; i < inputs.length; ++i) {
  const v = inputs[i];
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
