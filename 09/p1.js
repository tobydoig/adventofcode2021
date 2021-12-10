'use strict';
//  https://adventofcode.com/2021/day/9

const fs = require('fs');
const tmpInputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);
//  to make processing easier add first/last lines of 9's and then pre/postfix all lines with 9's
tmpInputs.unshift('9'.repeat(tmpInputs[0].length));
tmpInputs.push('9'.repeat(tmpInputs[0].length));
const inputs = tmpInputs.map(s => '9' + s + '9').map(l => l.split('').map(v => +v));

//  sweep inputs using a 3x3 kernel
const lowPoints = [];
for (let y = 1; y < inputs.length - 1; y++) {
  const l = inputs[y];
  for (let x = 1; x < l.length; x++) {
    let v = inputs [y][x];
    if (
//      (inputs[y - 1][x - 1] > v) &&
      (inputs[y - 1][x    ] > v) &&
//      (inputs[y - 1][x + 1] > v) &&
      (inputs[y    ][x - 1] > v) &&
      (inputs[y    ][x + 1] > v) &&
//      (inputs[y + 1][x - 1] > v) &&
      (inputs[y + 1][x    ] > v) 
//      (inputs[y + 1][x + 1] > v)
    ) {
      lowPoints.push([x, y]);
    }
  } 
}

let sum = 0;
lowPoints.forEach(p => {
  let v = inputs[p[1]][p[0]];
  console.log(v);
  sum += (v + 1);
});
console.log(`sum = ${sum}`);
