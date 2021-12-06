'use strict';
const fs = require('fs');

//  https://adventofcode.com/2021/day/5

function repeat(x, fn) {
  for (let i = 0; i < x; i++) {
    fn(i);
  }
}

let xmax = -1, ymax = -1;
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).map(s => {
  const m = s.match(/^(\d+),(\d+) \-\> (\d+),(\d+)$/);
  let l = {x1: +m[1], y1: +m[2], x2: +m[3], y2: +m[4]};
  xmax = Math.max(l.x1, l.x2, xmax);
  ymax = Math.max(l.y1, l.y2, ymax);
  return l;
}).filter(l => l.x1 === l.x2 || l.y1 === l.y2);

console.log(`got ${inputs.length} lines`);
console.log(`xmax = ${xmax}, ymax = ${ymax}`);

const points = [];

repeat(ymax + 1, () => points.push(new Array(xmax + 1).fill(0)));

inputs.forEach(l => {
  let x1 = l.x1;
  let y1 = l.y1;
  let x2 = l.x2;
  let y2 = l.y2;
  if (x1 === x2) {
    //  vertical
    console.log(`vertical ${x1}, ${y1} -> ${x2}, ${y2}`);
    if (y2 < y1) {
      let t = y1;
      y1 = y2;
      y2 = t;
    }
    repeat(y2 - y1 + 1, i => ++points[y1 + i][x1]);
  } else {
    //  horizontal
    console.log(`horizontal ${x1}, ${y1} -> ${x2}, ${y2}`);
    if (x2 < x1) {
      let t = x1;
      x1 = x2;
      x2 = t;
    }
    repeat(x2 - x1 + 1, i => points[y1][x1 + i] += 1);
  }
});

// console.log(points.map(r => r.join(' ')).join('\n'));

let score = points.reduce((acc, row) => acc + row.reduce((acc, cell) => acc + (cell > 1) , 0), 0);
console.log(`score = ${score}`);
