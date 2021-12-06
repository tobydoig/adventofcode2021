//  https://adventofcode.com/2021/day/2#part2

const fs = require('fs');
const inputs = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);

let horiz = 0;
let depth = 0;
let aim = 0;

inputs.forEach(s => {
  let v = s.split(/\s+/);
  let action = v[0];
  let offset = +v[1];
  switch(action) {
    case 'forward':
      horiz += offset;
      depth += aim * offset;
      break;
    case 'up':
      aim -= offset;
      break;
    case 'down':
      aim += offset;
      break;
    default:
      throw `expected value: ${s}`;
      break;
  }
});

console.log(`(${horiz}, ${depth}) = ${horiz * depth}`);
