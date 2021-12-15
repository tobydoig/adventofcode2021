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

function traverse(cave, route, visited, onlyonce, paths) {
  // console.log(`enter ${route}-${cave.name} with ${onlyonce}`);
  if (cave.name === 'end') {
    paths.push(`${route.substring(1)}-end`);
  } else {
    cave.exits.forEach(exit => {
      let localonlyonce = onlyonce;
      if (isSmall(exit.name)) {
        let count = visited[exit.name] || 0;
        if (localonlyonce && count > 0) return;
        count++;
        visited[exit.name] = count;
        if (count > 1)
        localonlyonce = true;
      }
      traverse(exit, `${route}-${cave.name}`, visited, localonlyonce, paths);
      // console.log(`exit  ${route}-${cave.name} with ${localonlyonce}`);
      if (visited.hasOwnProperty(exit.name))
        if (--visited[exit.name] < 1)
          delete visited[exit.name];
    });
  }

  return paths;
}

//  paths ends up being a tree of all possible routes (arrays of nested arrays)
let paths = traverse(caves['start'], '', {start: 1}, false, []).sort();

//  so now we need to traverse the paths tree to find routes that end at "end"
console.log(paths.join('\n'));
console.log(`${paths.length} paths`);
