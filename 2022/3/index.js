const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const inputLines = input.split('\n');

const calcPrioritizationScore = (rucksackTypes) => {
    return rucksackTypes.reduce((previousValue, rucksackType) => {
        let typePriority = rucksackType.toLowerCase().charCodeAt(0) - 96;

        if (!!rucksackType.match(/[A-Z]/)) {
            typePriority += 26;
        }

        return previousValue + typePriority;
    }, 0);
};

// part 1: sum prioritizations
const rucksackTypes = inputLines.map((bag) => {
    const compartment1 = bag.slice(0, bag.length / 2);
    const compartment2 = bag.slice(bag.length / 2);

    return Array.from(
        new Set(
            [...compartment1].filter((value) =>
                [...compartment2].includes(value),
            ),
        ),
    )[0];
});

const prioritizedSum = calcPrioritizationScore(rucksackTypes);
console.log(prioritizedSum);

// part 2: group badging and sum prioritizations
const groupRucksackTypes = [];
for (let i = 0; i < inputLines.length / 3; i++) {
    const rucksack1 = inputLines[i * 3];
    const rucksack2 = inputLines[i * 3 + 1];
    const rucksack3 = inputLines[i * 3 + 2];

    groupRucksackTypes.push(
        Array.from(
            new Set(
                [...rucksack1]
                    .filter((value) => [...rucksack2].includes(value))
                    .filter((value) => [...rucksack3].includes(value)),
            ),
        )[0],
    );
}

const prioritizedGroupSum = calcPrioritizationScore(groupRucksackTypes);
console.log(prioritizedGroupSum);
