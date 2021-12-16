'use strict';
//  https://adventofcode.com/2021/day/13

const fs = require('fs');

const points = [];
const folds = [];
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).forEach(l => {
  if (l.startsWith('fold along')) {
    let m = l.match(/\s([xy])\=(\d+)$/);
    folds.push([m[1], +m[2]]);
  } else {
    let p = l.split(',');
    points.push([+p[0], +p[1]]);
  }
});

let xmax = 0;
let ymax = 0;
points.forEach(p => {
  xmax = Math.max(xmax, p[0]);
  ymax = Math.max(ymax, p[1]);
});

let sheet = [];
for (let y = 0; y < ymax + 1; y++) sheet.push(new Array(xmax + 1).fill('.'));

points.forEach(p => {
  sheet[p[1]][p[0]] = '#';
});

function foldy(sheet, y) {
  for (let i = 0; i < y; i++) {
    for (let x = 0; x < sheet[0].length; x++) {
      let c = sheet[sheet.length - i - 1][x];
      if (c === '#') sheet[i][x] = c;
    };
  }
  sheet.length = y;
}

function foldx(sheet, x) {
  for (let y = 0; y < sheet.length; y++) {
    let r = sheet[y];
    for (let i = 0; i < r.length; i++) {
      let c = r[r.length - i - 1];
      if (c === '#') r[i] = c;
    }
    r.length = x;
  }
}

folds.forEach(f => {
  f[0] === 'y' ? foldy(sheet, f[1]) : foldx(sheet, f[1]);
  console.log(`fold ${f[0]} at ${f[1]} = ${sheet.reduce((acc, r) => r.reduce((acc, v) => v === '#' ? ++acc : acc, acc), 0)} dots`);
});

console.log(sheet.map(l => l.join('')).join('\n'));
