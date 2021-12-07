'use strict';
//  https://adventofcode.com/2021/day/7

const fs = require('fs');
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split(',').filter(Boolean).map(x => +x);

const crabs = {};
let furthest = inputs[0];
let nearest = inputs[0];
inputs.forEach(p => {
  furthest = Math.max(p, furthest);
  nearest = Math.min(p, nearest);
  let c = crabs[p];
  if (!c) {
    c = 0;
  }
  crabs[p] = ++c;
});

console.log(`crab positions range from ${nearest} to ${furthest}`);

let bestFuel = Number.MAX_SAFE_INTEGER;
let bestPosition = furthest + 1;
for (let p = nearest; p <= furthest; p++) {
  let fuelForPosition = 0;
  Object.keys(crabs).forEach(p2 => {
    const dist = Math.abs(p2 - p);
    const count = crabs[p2];
    const fuel = dist * count;
    // console.log(`  ${p2}] dist=${dist}, count=${count}, fuel=${fuel}`);
    fuelForPosition += fuel;
  });
  console.log(`${p} uses ${fuelForPosition}`);
  if (fuelForPosition < bestFuel) {
    bestFuel = fuelForPosition;
    bestPosition = p;
  }
};

console.log(`Best position is ${bestPosition} using ${bestFuel} fuel`);
