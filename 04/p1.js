'use strict';
//  https://adventofcode.com/2021/day/4

const fs = require('fs');
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8' }).split('\n').map(x => x.trim()).filter(Boolean);

class Board {
  constructor(id, board) {
    this.id = id;
    this.board = board;
    this.marked = new Array(board.length);
    for (let i = 0; i < this.marked.length; i++) {
      this.marked[i] = new Array(board[0].length).fill(0);
    }
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
    return u;
  }

  toString() {
    let s = '';
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      for (let j = 0; j < row.length; j++) {
        if (this.marked[i][j]) {
          s += ` \u001b[${92 + 'm'}${this.board[i][j]}\u001b[0m`;
        } else {
          s += ` ${this.board[i][j]}`;
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
const boards = [];
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
  boards.forEach(b => {
    if (b.draw(d)) {
      possibles.push(b);
    }
  });
  const winners = possibles.filter(b => b.hasWon());
  if (winners.length) {
    if (winners.length !== 1) throw `${winners.length} winners`;
    console.log('WINNER');
    console.log(winners[0].toString());
    const unmarked = winners[0].unmarked().reduce((acc, val) => acc + val, 0);
    console.log(`unmarked = ${unmarked}, score = ${unmarked * d}`);
    break;
  }
}
