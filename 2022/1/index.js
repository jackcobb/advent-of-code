const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const cleanInputLines = input.split('\n').map(line => line.trim());

let grouped = [];
let elf = [];

cleanInputLines.forEach(line => {
    if (line === '') {
        grouped.push(elf.reduce(((prev, curr) => prev + curr), 0));
        elf = [];
    } else {
        elf.push(+line);
    }
});


const most = grouped.sort((a, b) => a - b);

// part 1 answer
console.log(...most.slice(most.length - 1));

// part 2 answer
console.log(most.slice(most.length - 3).reduce(((prev, curr) => prev + curr), 0));