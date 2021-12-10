'use strict';
//  https://adventofcode.com/2021/day/10

const fs = require('fs');
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);

const GOOD_OPEN  = ['(', '[', '{', '<'];
const GOOD_CLOSE = [')', ']', '}', '>'];
const BAD_CLOSE_POINTS = [3, 57, 1197, 25137];

function parse(line) {
  const chars = line.split('');
  let stack = [];
  for (let i = 0; i < chars.length; i++) {
    let c = chars[i];
    let ix = GOOD_OPEN.indexOf(c);
    if (ix >= 0) {
      stack.push(ix);
    } else {
      ix = GOOD_CLOSE.indexOf(c);
      if (ix >= 0) {
        let prev = stack.pop();
        if (prev === undefined) throw `  Found ${c} at ${i} but no previous ${GOOD_OPEN[ix]}`;
        if (prev !== ix) {
          console.log(`  Expected ${GOOD_CLOSE[prev]} at ${i}, but found ${c}`);
          return BAD_CLOSE_POINTS[ix];
        }
      } else {
        throw `  Unsupported char ${c} at ${i}`;
      }
    }
  }

  return 0;
}

let score = 0;
inputs.forEach((line, ix) => {
  console.log(`${ix} ${line}`);
  score += parse(line);
  console.log(`  Score = ${score}`);
});

console.log(`Score = ${score}`);
