'use strict';
//  https://adventofcode.com/2021/day/11

const fs = require('fs');
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).map(l => l.split('').map(v => +v));

function flash(arr, x, y) {
  let r = arr[y];
  if (y > 0) {
    if (++arr[y-1][x] === 10) flash(arr, x, y - 1);
    if (x > 0) if (++arr[y-1][x-1] === 10) flash(arr, x - 1, y - 1);
    if (x < r.length - 1) if (++arr[y-1][x+1] === 10) flash(arr, x + 1, y - 1);
  }
  if (x > 0) if (++arr[y][x-1] === 10) flash(arr, x - 1, y);
  if (x < r.length - 1) if (++arr[y][x+1] === 10) flash(arr, x + 1, y);
  if (y < arr.length - 1) {
    if (++arr[y+1][x] === 10) flash(arr, x, y + 1);
    if (x > 0) if (++arr[y+1][x-1] === 10) flash(arr, x - 1, y + 1);
    if (x < r.length - 1) if (++arr[y+1][x+1] === 10) flash(arr, x + 1, y + 1);
  }
}

console.log(inputs.map(r => r.join()).join('\n'));

let totalFlashes = 0;
const totalCells = inputs.length * inputs[0].length;
for (let step = 1; step <= 1000; step++) {
  console.log(`step ${step}`);
  for (let y = 0; y < inputs.length; y++) {
    let r = inputs[y];
    for (let x = 0; x < r.length; x++) {
      if (++r[x] === 10) {
        flash(inputs, x, y);
      }
    }
  }

  let flashes = 0;
  for (let y = 0; y < inputs.length; y++) {
    let r = inputs[y];
    for (let x = 0; x < r.length; x++) {
      if (r[x] > 9) {
        flashes++;
        r[x] = 0;
      }
    }
  }

  totalFlashes += flashes;

  if (flashes === totalCells) break;
}
console.log(inputs.map(r => r.join()).join('\n'));
console.log(`${totalFlashes} flashes`);
