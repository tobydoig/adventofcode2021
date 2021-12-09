'use strict';
//  https://adventofcode.com/2021/day/8

const fs = require('fs');

function charToDecimal(c) {
  //  a = 0, b = 1, c = 2...etc
  //  97 = 'a'.codePointAt(0);
  return c.codePointAt(0) - 97;
};

function segmentToDecimal(s) {
  return s.split('').map(charToDecimal);
}

const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split(/\n/).filter(Boolean).map(l => {
  let v = l.split('|');
  //  note - we sort the segments because it makes comparisons later easier
  //  and doesn't impact our results
  let segments = v[0].trim().split(' ').map(s => segmentToDecimal(s).sort());
  let digits = v[1].trim().split(' ').map(s => segmentToDecimal(s).sort());
  return {segments, digits};
});

//  digit = number of wires used in a segment
//  1 = 2
//  7 = 3
//  4 = 4
//  2, 3, 5 = 5
//  0, 6, 9 = 6
//  8 = 7
//  so find a segment with 2 wires and that must be 1, with 3 it's a 7, 4 is a 4 and with 7 it must be an 8

//  segments and total count across all digits
//  0 = abc-efg
//  1 = --c--f-
//  2 = a-cde-g
//  3 = a-cd-fg
//  4 = -bcd-f-
//  5 = ab-d-fg
//  6 = ab-defg
//  7 = a-c--f-
//  8 = abcdefg
//  9 = abcd-fg
//      8687497 - 4, 6 and 9 are unique
const NUMBERS_AS_SEGMENTS = [
  segmentToDecimal('abcefg'),
  segmentToDecimal('cf'),
  segmentToDecimal('acdeg'),
  segmentToDecimal('acdfg'),
  segmentToDecimal('bcdf'),
  segmentToDecimal('abdfg'),
  segmentToDecimal('abdefg'),
  segmentToDecimal('acf'),
  segmentToDecimal('abcdefg'),
  segmentToDecimal('abcdfg')  
]

let count = 0;

inputs.forEach(v => {
  let {segments, digits} = v;
  //  segments is an array of segments (representing numbers 0-9), where each segment is an
  //  array of wires used to draw that segment.
  let wireFreq = [0, 0, 0, 0, 0, 0, 0];
  segments.forEach(segment => {
    segment.forEach(wire => wireFreq[wire] += 1);
  });

  let b = wireFreq.indexOf(6);  //  wire b is the only one used 6 times
  let e = wireFreq.indexOf(4);  //  e is used 4 times
  let f = wireFreq.indexOf(9);  //  f is used 9 times
  //  find the segment with length 2, exclude the f wire and the one remaining wire should be c
  let c = segments.find(s => s.length === 2).filter(s => s !== f)[0];
  //  find the segment with length 3, exclude wires [c, f], and the one remaining wire should be a
  let a = segments.find(s => s.length === 3).filter(s => ![c, f].includes(s))[0];
  //  find the segment with length 4, exclude wires [b, c, f], and the one remaining wire should be d
  let d = segments.find(s => s.length === 4).filter(s => ![b, c, f].includes(s))[0];
  //  find the segment with length 7, exclude wires [a, b, c, d, e, f], and the one remaining wire should be g
  let g = segments.find(s => s.length === 7).filter(s => ![a, b, c, d, e, f].includes(s))[0];
  //  and now remap our segments from their jumbled wires to the correct ones, so for each wire in each
  //  segment, the table below tells us where that wire should point to
  let wireMapping = [a, b, c, d, e, f, g];
  let segmentsFixed = segments.map(segment => segment.map(wire => wireMapping.indexOf(wire)));
  let segmentsAsNumbers = segmentsFixed.map(s => s.sort()).map(segment => NUMBERS_AS_SEGMENTS.findIndex(s => s.length === segment.length && s.every(v => segment.includes(v))));

  //  and now we can convert the digits. since segments and digits were sorted
  //  all we have to do is for each digit find a match segment, then use the fixed version
  let digitsAsNumbers = digits.map(digit => {
    let segmentIndex = segments.findIndex(segment => segment.length === digit.length && segment.every(s => digit.includes(s)));
    return segmentsAsNumbers[segmentIndex];
  });

  // console.log(digitsAsNumbers);
  count += digitsAsNumbers[0] * 1000 + digitsAsNumbers[1] * 100 + digitsAsNumbers[2] * 10 + digitsAsNumbers[3];
});

console.log(`sum is ${count}`);
