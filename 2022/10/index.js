const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const inputLines = input.split('\n').map((line) => line.trim());

let cycleCount = 1;
let xRegister = 1;
const cycleStack = [];
const crtPixels = [];

const drawPixel = () => {
    const cycleCountMod = (cycleCount - 1) % 40;
    const xRegisterMod = xRegister;

    if (xRegisterMod - 1 <= cycleCountMod && cycleCountMod <= xRegisterMod + 1) {
        crtPixels.push('#')
    } else {
        crtPixels.push('.');
    }
}

inputLines.forEach(op => {
    const [instruction] = op.split(' ');

    switch (instruction) {
        case 'addx':
            // 1 cycle
            cycleStack.push({
                cycle: cycleCount,
                x: xRegister,
                instruction: op,
                signalStrength: cycleCount * xRegister
            });
            drawPixel();
            cycleCount++

            // 1 cycle
            cycleStack.push({
                cycle: cycleCount,
                x: xRegister,
                instruction: op,
                signalStrength: cycleCount * xRegister
            });
            drawPixel();
            cycleCount++

            // update register value
            xRegister += +op.split(' ')[1];

            break;
        case 'noop':
            // 1 cycle
            cycleStack.push({
                cycle: cycleCount,
                x: xRegister,
                instruction: op,
                signalStrength: cycleCount * xRegister
            });
            drawPixel();
            cycleCount++;

            break;
        default:
            console.log('unsupported instruction');
    }

});

// part 1
const signalStrength = cycleStack.filter(cycle => (cycle.cycle + 20) % 40 === 0).reduce((prev, cycle) => prev + cycle.signalStrength, 0);
console.log(signalStrength)

// part 2
let crtLine = '';
cycleStack.forEach(cycle => {
    crtLine += crtPixels[cycle.cycle - 1];

    if (cycle.cycle % 40 === 0) {
        console.log(crtLine);
        crtLine = '';
    }
});
