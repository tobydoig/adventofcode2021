'use strict';
//  https://adventofcode.com/2021/day/11

const fs = require('fs');
const inputs = fs.readFileSync('./test.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).map(l => l.split('').map(v => +v));

//  add filler cells to make processing easier
inputs.unshift(inputs[0].map(c => 0));
inputs.push(inputs[0].map(c => 0));
inputs.forEach(r => {
  r.unshift(0);
  r.push(0);
});

console.log(inputs.map(r => r.join()).join('\n'));

function flash(arr, x, y) {
  //  no flashes for our filler cells
  if (y < 1 || y >= arr.length) return 0;
  if (x < 1 || x >= arr[0].length) return 0;

  let flashes = 0;
  //  note - must have ++arr[][] and not arr[][]++ so it returns the updated value (not previous)
  if (++arr[y][x] === 10) flashes++;
  if (++arr[y][++x] === 10) flashes += flash(arr, x, y);
  if (++arr[--y][x] === 10) flashes += flash(arr, x, y);
  if (++arr[y][--x] === 10) flashes += flash(arr, x, y);
  if (++arr[y][--x] === 10) flashes += flash(arr, x, y);
  if (++arr[++y][x] === 10) flashes += flash(arr, x, y);
  if (++arr[++y][x] === 10) flashes += flash(arr, x, y);
  if (++arr[y][++x] === 10) flashes += flash(arr, x, y);
  if (++arr[y][++x] === 10) flashes += flash(arr, x, y);
  return flashes;
}

for (let step = 1; step < 3; step++) {
  console.log(`step ${step}`);
  let flashes = 0;
  for (let y = 1; y < inputs.length - 1; y++) {
    let r = inputs[y];
    for (let x = 1; x < r.length - 1; x++) {
      flashes += flash(inputs, x, y);
    }
  }
  //  clear filler cells
  inputs[0].fill(0);
  inputs[inputs.length - 1].fill(0);
  for (let y = 1; y < inputs.length - 1; y++) {
    let r = inputs[y];
    r[0] = 0;
    r[r.length - 1] = 0;
  }

  for (let y = 1; y < inputs.length - 1; y++) {
    let r = inputs[y];
    for (let x = 1; x < r.length - 1; x++) {
      r[x] = r[x] % 10;
    }
  }
  
  console.log(inputs.map(r => r.join()).join('\n'));
  console.log(`${flashes} flashes`);
}
