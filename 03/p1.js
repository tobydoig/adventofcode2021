//  https://adventofcode.com/2021/day/3

const fs = require('fs');
const inputs = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);

const bits = new Array(inputs[0].length).fill(0);

inputs.forEach(v => {
  v.split('').forEach((c, i) => {
    bits[i] += +c;
  });
});
const half = Math.ceil(inputs.length / 2);
const gammas = bits.map(b => b > half ? '1' : '0');
const gamma = parseInt(gammas.join(''), 2);
const epsilons = bits.map(b => b > half ? '0' : '1');
const epsilon = parseInt(epsilons.join(''), 2);
console.log(`gamma = ${gamma}, epsilon = ${epsilon}, product = ${gamma * epsilon}`);
