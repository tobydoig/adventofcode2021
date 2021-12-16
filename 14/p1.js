'use strict';
//  https://adventofcode.com/2021/day/14

const fs = require('fs');

const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);

let polymerTemplate = inputs.shift();
const rules = inputs.reduce((acc, r) => {
  let m = r.split(' -> ');
  acc[m[0]] = m[1];
  return acc;
}, {});

function calcMostLeast(s) {
  let counts = {};
  s.split('').forEach(c => {
    let v = counts[c] || 0;
    counts[c] = ++v;
  });
  let minv = Number.MAX_SAFE_INTEGER;
  let minc = '';
  let maxv = -1;
  let maxc = '';
  Object.keys(counts).forEach(c => {
    let v = counts[c];
    if (v < minv) {
      minv = v;
      minc = c;
    }
    if (v > maxv) {
      maxv = v;
      maxc = c;
    }
  });
  return {minv, minc, maxv, maxc};
}

for (let epoch = 1; epoch <= 10; epoch++) {
  for (let i = 0; i < polymerTemplate.length - 1; i+=2) {
    let pair = polymerTemplate.substring(i, i + 2);
    let r = rules[pair];
    if (r) {
      polymerTemplate = polymerTemplate.substring(0, i + 1) + r + polymerTemplate.substring(i + 1);
    }
  }
  // console.log(`After step ${epoch}: template (${polymerTemplate.length}) = ${polymerTemplate}`);
  console.log(`After step ${epoch}: template = ${polymerTemplate.length}`);
}
let {minv, minc, maxv, maxc} = calcMostLeast(polymerTemplate);
console.log(`Least = (${minc}, ${minv}), most = (${maxc}, ${maxv}), difference = ${maxv - minv}`);
