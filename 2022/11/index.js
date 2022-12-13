const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const inputLines = input.split('\n').map((line) => line.trim());

const numberMonkeys = Math.ceil(inputLines.length / 7);
const monkeyMap = [];

for (let i = 0; i < numberMonkeys; i++) {
    const monkey = {
        id: i,
        startingItems: [],
        items: [],
        history: [],
        operation: null,
        test: null
    };

    // starting items
    inputLines[(i * 7) + 1].split(':')[1].trim().split(',').forEach(item => monkey.startingItems.push(+item.trim()));
    monkey.items = [...monkey.startingItems];

    // operation
    const codeString = inputLines[(i * 7) + 2].split(': ')[1].replace('new', 'newVariable');
    const operationFunction = new Function('old', `
        let newVariable;
        ${codeString};
        return newVariable;
    `);
    monkey.operation = operationFunction;

    // test
    const testDenominator = inputLines[(i * 7) + 3].split(' ')[3];
    const trueMonkey = inputLines[(i * 7) + 4].split(' ')[5];
    const falseMonkey = inputLines[(i * 7) + 5].split(' ')[5];

    const testFunction = new Function('score', `
        return score % ${testDenominator} === 0 ? ${trueMonkey} : ${falseMonkey};
    `);
    monkey.test = testFunction;
    monkey.divisor = testDenominator;

    monkeyMap.push(monkey);
}


const processRounds = (rounds = 0, worryLevel = 0, worryFunction = (monkey, score, divisor) => {
    return Math.floor(score / divisor);
}) => {
    for (let round = 0; round < rounds; round++) {
        for (let i = 0; i < monkeyMap.length; i++) {
            const monkey = monkeyMap[i];

            monkey.items.reverse().forEach(item => {
                monkey.history.push(item);

                const operationScore = monkey.operation(item);
                const worryLevelScore = worryFunction(monkey, operationScore, worryLevel);
                const throwToMonkey = monkey.test(worryLevelScore);
                monkeyMap[throwToMonkey].items.push(worryLevelScore);
            });

            monkey.items = [];
        }
    }

}


// part 1
processRounds(20, 3);

console.log(monkeyMap.map(monkey => monkey.history.length).sort((a, b) => a - b).reverse().splice(0, 2).reduce((prev, curr) => prev * curr));

// part 2
// reset monkey map by clearing history, and resetting items
monkeyMap.forEach(monkey => {
    monkey.history = [];
    monkey.items = [...monkey.startingItems];
});

const divisor = monkeyMap.reduce((previousValue, monkey) => previousValue * monkey.divisor, 1);

processRounds(10000, 3, (monkey, score) => {
    return Math.floor(score % divisor);
});

console.log(monkeyMap.map(monkey => monkey.history.length).sort((a, b) => a - b).reverse().splice(0, 2).reduce((prev, curr) => prev * curr));