//  https://adventofcode.com/2021/day/2

const fs = require('fs');
const inputs = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);

let horiz = 0;
let depth = 0;

inputs.forEach(s => {
  let v = s.split(/\s+/);
  switch(v[0]) {
    case 'forward':
      horiz += +v[1];
      break;
    case 'up':
      depth -= +v[1];
      break;
    case 'down':
      depth += +v[1];
      break;
    default:
      throw `expected value: ${s}`;
      break;
  }
});

console.log(`(${horiz}, ${depth}) = ${horiz * depth}`);
