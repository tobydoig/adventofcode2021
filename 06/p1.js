'use strict';
//  https://adventofcode.com/2021/day/5

const fs = require('fs');
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split(',').filter(Boolean).map(x => +x);

const buckets = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
inputs.forEach(i => {
  if (buckets[i] < 0) buckets[i] = 1;
  else buckets[i] += 1;
});

for (let day = 0; day < 80; day++) {
  // console.log(`${day} ${buckets.join(' ')}`);
  let x = buckets.shift();
  buckets.push(x);
  if (x > 0) {
    if (buckets[6] < 0) buckets[6] = x;
    else buckets[6] += x;
  }
  // console.log(buckets);
}

let sum = buckets.reduce((acc, b) => acc + b, 0);
console.log(`${sum} fish`);
