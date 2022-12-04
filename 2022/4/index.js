const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const inputLines = input.split('\n');

const mappedInput = inputLines.map((line) => {
    const [elf1, elf2] = line.split(',');
    const elf1Sections = elf1.split('-');
    const elf2Sections = elf2.split('-');

    const elf1AllSections = [];
    const elf2AllSections = [];

    for (let i = +elf1Sections[0]; i <= +elf1Sections[1]; i++) {
        elf1AllSections.push(i);
    }

    for (let i = +elf2Sections[0]; i <= +elf2Sections[1]; i++) {
        elf2AllSections.push(i);
    }

    return [elf1AllSections, elf2AllSections];
});

// part 1
const entireAssignmentOverlaps = mappedInput.filter((sections) => {
    const section1Low = sections[0][0];
    const section1High = sections[0][sections[0].length - 1];
    const section2Low = sections[1][0];
    const section2High = sections[1][sections[1].length - 1];

    return (
        (section1Low <= section2Low && section1High >= section2High) ||
        (section1Low >= section2Low && section1High <= section2High)
    );
});

console.log(entireAssignmentOverlaps.length);

// part 1
const assignmentOverlaps = mappedInput
    .map((sections) => {
        const set = new Set(sections[0]);

        return sections[1].filter((item) => set.has(item));
    })
    .filter((commonElements) => {
        return commonElements.length > 0;
    });

console.log(assignmentOverlaps.length);
