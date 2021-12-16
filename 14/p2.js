'use strict';
//  https://adventofcode.com/2021/day/14

const fs = require('fs');

//  try 1 - tried solution from p1, but too slow after 12/13 iterations
//  try 2 - tried linked list, but still too slow and too many nodes (outta memory)

const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);

//  switching to linked lists as 40 iterations is exponentially slower (much memory needed)
let polymerTemplate = inputs.shift().split('').map(p => {return {c:p};}).reduceRight((prev, v) => {
  v.next = prev;
  return v;
});

const rules = inputs.reduce((acc, r) => {
  let m = r.split(' -> ');
  acc[m[0]] = m[1];
  return acc;
}, {});

function calcMostLeast(node) {
  let counts = {};
  while (node) {
    let v = counts[node.c] || 0;
    counts[node.c] = ++v;
    node = node.next;
  }
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

function len(n) {
  let c = 0;
  while (n) {
    ++c;
    n = n.next;
  }
  return c;
}
let ptl = len(polymerTemplate);
for (let epoch = 1; epoch <= 30; epoch++) {
  let n = polymerTemplate;
  while (n.next) {
    let pair = n.c + n.next.c;
    let r = rules[pair];
    if (r) {
      let x = {c:r, next: n.next};
      n.next = x;
      ++ptl;  //  faster than to keep re-counting
      n = n.next;
    }
    n = n.next;
  }
  // console.log(`After step ${epoch}: template (${polymerTemplate.length}) = ${polymerTemplate}`);
  console.log(`After step ${epoch}: template = ${ptl}`);
}
let {minv, minc, maxv, maxc} = calcMostLeast(polymerTemplate);
console.log(`Least = (${minc}, ${minv}), most = (${maxc}, ${maxv}), difference = ${maxv - minv}`);
