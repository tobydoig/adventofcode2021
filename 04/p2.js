'use strict';
const { assert } = require('console');
//  https://adventofcode.com/2021/day/4

const fs = require('fs');
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').map(x => x.trim()).filter(Boolean);

function pad2(v) {
  if (v <10 ) v = ' ' + v;
  return v;
}

class Board {
  constructor(id, board) {
    this.id = id;
    this.board = board;
    this.marked = new Array(board.length);
    for (let i = 0; i < this.marked.length; i++) {
      this.marked[i] = new Array(board[0].length).fill(0);
    }
    this.values = new Set();
    board.forEach(b => b.forEach(v => this.values.add(v)));
    assert(this.values.size === 25);
    this.matched = new Set();
  }

  draw(v) {
    let match = false;
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      for (let j = 0; j < row.length; j++) {
        if (this.board[i][j] === v) {
          this.marked[i][j] = 1;
          match = true;
        }
      }
    }
    assert(this.values.delete(v) === match);
    if (match) this.matched.add(v);
    return match;
  }

  hasWon() {
    for (let i = 0; i < this.board.length; i++) {
      const row = this.marked[i];
      const marked = row.reduce((acc, v) => acc + v, 0);
      if (marked === row.length) return true;
      const cols = this.board[0];
      for (let j = 0; j < cols.length; j++) {
        let marked = 0;
        for (let i = 0; i < this.board.length; i++) {
          marked += this.marked[i][j];
        }
        if (marked === this.board.length) {
          return true;
        }
      }
    }
    return false;
  }

  unmarked() {
    let u = [];

    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      for (let j = 0; j < row.length; j++) {
        if (!this.marked[i][j]) {
          u.push(this.board[i][j]);
        }
      }
    }
    assert(u.sort().join(',') === Array.from(this.values.values()).sort().join(','));
    return u;
  }

  toString() {
    let s = '';
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      for (let j = 0; j < row.length; j++) {
        if (this.marked[i][j]) {
          s += ` \u001b[${93 + 'm'}${pad2(this.board[i][j])}\u001b[0m`;
        } else {
          s += ` ${pad2(this.board[i][j])}`;
        }
      }
      s += '\n';
    }

    return s;
  }
}

function repeat(x, fn) {
  while (x--) fn();
}

const draws = inputs.shift().split(',').filter(Boolean).map(x => +x);
let boards = [];
let boardId = 0;
while (inputs.length) {
  let b = [];
  repeat(5, () => b.push(inputs.shift().split(/\s+/).map(x => +x)));
  boards.push(new Board(boardId++, b));
}

console.log(`loaded ${boards.length} boards`);

while (draws.length) {
  const d = draws.shift();
  console.log(`draw ${d}`);
  const possibles = [];
  for (let i = 0; i < boards.length; i++) {
    const b = boards[i];
    if (b.draw(d)) {
      console.log(`${b.id}\n${b.toString()}`);
      if (b.hasWon()) {
        console.log(`WINNER ${b.id}`);
        boards.splice(boards.indexOf(b), 1);
        if (boards.length === 0) {
          const unmarked = b.unmarked().reduce((acc, val) => acc + val, 0);
          console.log(`unmarked = ${unmarked}, score = ${unmarked * d}`);
          //  10122 = too high
          return;
        }
        --i;
      }
    }
  }
}
