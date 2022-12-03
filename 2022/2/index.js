const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const cleanInputLines = input.split('\n').map(line => line.trim());

const rounds = cleanInputLines.filter((value) => value !== '');

const calcTotalScore = (rounds, conditions) => {
    return rounds.reduce((prev, curr) =>
        prev + conditions[curr[2]].base + conditions[curr[2]][curr[0]]
        , 0);

}

// part 1
const conditionsPart1 = {
    X: {
        base: 1,
        A: 3,
        B: 0,
        C: 6,
    },
    Y: {
        base: 2,
        A: 6,
        B: 3,
        C: 0,
    },
    Z: {
        base: 3,
        A: 0,
        B: 6,
        C: 3,
    }
};

const totalScorePart1 = calcTotalScore(rounds, conditionsPart1)
console.log(totalScorePart1);

// part 2
const conditionsPart2 = {
    X: {
        base: 0,
        A: 3,
        B: 1,
        C: 2,
    },
    Y: {
        base: 3,
        A: 1,
        B: 2,
        C: 3,
    },
    Z: {
        base: 6,
        A: 2,
        B: 3,
        C: 1,
    }
};

const totalScorePart2 = calcTotalScore(rounds, conditionsPart2)
console.log(totalScorePart2);