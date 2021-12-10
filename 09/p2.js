'use strict';
//  https://adventofcode.com/2021/day/9

const fs = require('fs');
const tmpInputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);
//  to make processing easier add first/last lines of 9's and then pre/postfix all lines with 9's
tmpInputs.unshift('9'.repeat(tmpInputs[0].length));
tmpInputs.push('9'.repeat(tmpInputs[0].length));
//  and basins will have value 0, walls 9 (so inputs contains only 0's and 1's)
const inputs = tmpInputs.map(s => '9' + s + '9').map(l => l.split('').map(v => +v).map(v => v === 9 ? 1 : 0));

//  so we're going to use a flood fill algorithm, like a paint package, filling each basin with a unique colour.
//  this will be stack-based, recursive. afterwards we count the number of cells for each colour.
function fill(arr, x, y, colour, count) {
  if (arr[y][x] !== 0) return count;
  arr[y][x] = colour;
  ++count;
  count = fill(arr, x, y - 1, colour, count);
  count = fill(arr, x - 1, y, colour, count);
  count = fill(arr, x + 1, y, colour, count);
  count = fill(arr, x, y + 1, colour, count);
  return count;
}

let colour = 'a';
const colourCounts = [];
for (let y = 1; y < inputs.length - 1; y++) {
  const l = inputs[y];
  for (let x = 1; x < l.length; x++) {
    let v = inputs [y][x];
    if (v === 0) {
      let count = fill(inputs, x, y, colour, 0);
      colourCounts.push([colour, count]);
      colour = String.fromCodePoint(colour.charCodeAt(0) + 1);
    }
  } 
}

//console.log(inputs.map(l => l.join('')).join('\n'));
console.log(colourCounts.map(cc => `${cc[0]} = ${cc[1]}`).join(', '));
let sortedCounts = colourCounts.map(cc => cc[1]).sort((a, b) => a - b).slice(-3);
let product = sortedCounts[0] * sortedCounts[1] * sortedCounts[2];
console.log(`product is ${product}`);
