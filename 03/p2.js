//  https://adventofcode.com/2021/day/3

const fs = require('fs');
const inputs = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);

function zeroOne(arr, i) {
  let zero = [], one = [];
  arr.forEach(elem => {
    if (elem.charAt(i) === '0') {
      zero.push(elem);
    } else {
      one.push(elem);
    }
  });
  return {zero, one};
}

const numBits = inputs[0].length;
let oxygenInputs = co2Inputs = inputs;
for (let i = 0; i < numBits; i++) {
  console.log(`Bit ${i}`);
  // console.log(`  oxygenInputs = ${oxygenInputs.length} = ${oxygenInputs.join(', ')}`);
  if (oxygenInputs.length > 1) {
    //  most common
    let {zero, one} = zeroOne(oxygenInputs, i);
    oxygenInputs = one.length >= zero.length ? one : zero;
    // console.log(`    zero = ${zero.length} = ${zero.join(', ')}`);
    // console.log(`    one = ${one.length} = ${one.join(', ')}`);
  }
  // console.log(`  co2Inputs = ${co2Inputs.length} = ${co2Inputs.join(', ')}`);
  if (co2Inputs.length > 1) {
    //  least common
    let {zero, one} = zeroOne(co2Inputs, i);
    co2Inputs = zero.length <= one.length ? zero : one;
    // console.log(`    zero = ${zero.length} = ${zero.join(', ')}`);
    // console.log(`    one = ${one.length} = ${one.join(', ')}`);
  }
  if (oxygenInputs.length <= 1 && co2Inputs.length <= 1) break;
}

console.log(`oxygenInputs.length = ${oxygenInputs.length}, co2Inputs.length = ${co2Inputs.length}`);
let oxygen = parseInt(oxygenInputs[0], 2);
let co2 = parseInt(co2Inputs[0], 2);
let rating = oxygen * co2;
console.log(`oxygen = ${oxygen}, co2 = ${co2}, rating = ${rating}`);
if (rating >= 2566863) console.log('TOO HIGH');
