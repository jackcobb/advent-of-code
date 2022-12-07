const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const inputLines = input.split('\n');

const stackLineIndex = inputLines.findIndex((line) => line.match(/[0-9]/));
const stacks = [];
const stacksCopy = [];
inputLines[stackLineIndex].split('').filter((value) => value.trim() !== '').forEach(stack => {
    const stackArray = [];
    const stackIndexInLine = inputLines[stackLineIndex].indexOf(stack);

    for (let i = stackLineIndex - 1; i >= 0; i--) {
        const box = inputLines[i][stackIndexInLine].trim();

        if (box !== '') {
            stackArray.push(box);
        }
    }

    stacks.push(stackArray);
    stacksCopy.push([...stackArray]);
});

const moveIndex = stackLineIndex + 2;

// part 1
for (let i = moveIndex; i < inputLines.length; i++) {
    const moveLine = inputLines[i].split(' ').map(line => line.trim());

    for (let j = moveLine[1]; j > 0; j--) {
        stacks[+moveLine[5] - 1].push(stacks[+moveLine[3] - 1].pop());
    }
}

console.log(stacks.reduce(((previousValue, stackArray) => { return previousValue + stackArray[stackArray.length - 1] }), ''));

// part 2
for (let i = moveIndex; i < inputLines.length; i++) {
    const moveLine = inputLines[i].split(' ').map(line => line.trim());
    const boxHolder = [];

    for (let j = moveLine[1]; j > 0; j--) {
        if (stacksCopy[+moveLine[3] - 1].length > 0) {
            boxHolder.push(stacksCopy[+moveLine[3] - 1].pop());
        }
    }

    boxHolder.reverse().forEach(box => stacksCopy[+moveLine[5] - 1].push(box));
}

console.log(stacksCopy.reduce(((previousValue, stackArray) => { return previousValue + stackArray[stackArray.length - 1] }), ''));