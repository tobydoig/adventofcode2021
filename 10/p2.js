'use strict';
//  https://adventofcode.com/2021/day/10

const fs = require('fs');
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);

const GOOD_OPEN  = ['(', '[', '{', '<'];
const GOOD_CLOSE = [')', ']', '}', '>'];
const BAD_CLOSE_POINTS = [3, 57, 1197, 25137];
const BAD_INCOMPLETE_POINTS = [1, 2, 3, 4];

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
          // console.log(`  Expected ${GOOD_CLOSE[prev]} at ${i}, but found ${c}`);
          // return BAD_CLOSE_POINTS[ix];
          return 0;
        }
      } else {
        throw `  Unsupported char ${c} at ${i}`;
      }
    }
  }

  if (stack.length) {
    stack.reverse();
    let score = stack.reduce((acc, ix) => acc * 5 + BAD_INCOMPLETE_POINTS[ix], 0);
    console.log(`  Incomplete: ${stack.map(i => GOOD_CLOSE[i]).join('')}, score=${score}`);
    return score;
  }

  return 0;
}

let scores = [];
inputs.forEach((line, ix) => {
  let score = parse(line);
  if (score > 0) scores.push(score);
});
scores.sort((a, b) => a - b);
console.log(scores.join(', '));
let midScore = scores[ Math.floor(scores.length / 2)];
console.log(`midScore = ${midScore}`);
