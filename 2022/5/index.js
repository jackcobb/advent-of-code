const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const inputLines = input.split('\n').map((line) => line.trim());

const stackLineIndex = inputLines.findIndex((line) => line.match(/[0-9]/));
const stacks = {};

console.log(stackLineIndex);
