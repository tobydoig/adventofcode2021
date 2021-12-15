'use strict';
//  https://adventofcode.com/2021/day/12

const fs = require('fs');
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).map(s => s.split('-'));

function isSmall(cave) {
  return cave === cave.toLowerCase();
}

const caves = {}
inputs.forEach(v => {
  let start = v[0];
  let end = v[1];
  if (!caves[start]) caves[start] = {name: start, exits: new Set()};
  if (!caves[end]) caves[end] = {name: end, exits: new Set()};
});

inputs.forEach(v => {
  let start = v[0];
  let end = v[1];
  if (start !== 'end' && end !== 'start') caves[start].exits.add(caves[end]);
  if (end !== 'end' && start !== 'start') caves[end].exits.add(caves[start]);
});
caves['end'].exits.clear();

function traverse(cave, route, blocked, paths) {
  // console.log(`entering ${cave.name} from ${route}`);
  if (cave.name === 'end') {
    paths.push(`${route.substring(1)}-end`);
  } else {
    cave.exits.forEach(exit => {
      if (!blocked.has(exit)) {
        if (isSmall(exit.name)) blocked.add(exit);
        traverse(exit, `${route}-${cave.name}`, blocked, paths);
        blocked.delete(exit);
      }
    });
  }

  return paths;
}

//  paths ends up being a tree of all possible routes (arrays of nested arrays)
let paths = traverse(caves['start'], '', new Set(), []).sort();

//  so now we need to traverse the paths tree to find routes that end at "end"
console.log(paths.join('\n'));
console.log(`${paths.length} paths`);
