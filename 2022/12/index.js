const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const inputLines = input.split('\n').map((line) => line.trim());

const HEAD = 0,
    TAIL = 9;

const planckLengthsMap = {
    start: {
        x: 0,
        y: 0
    }
};

for (let i = HEAD; i <= TAIL; i++) {
    planckLengthsMap[i] = {
        x: 0,
        y: 0,
        history: ['0-0']
    };
}

const moveHeadDirection = (direction, moves) => {
    const checkAndMoveNextKnot = (knot) => {
        const nextKnotKey = knot + 1,
            knotObject = planckLengthsMap[knot],
            nextKnotObject = planckLengthsMap[nextKnotKey];

        const xOffset = knotObject.x - nextKnotObject.x,
            yOffset = knotObject.y - nextKnotObject.y;

        // check for base condition of touching
        if (Math.abs(xOffset) <= 1 && Math.abs(yOffset) <= 1) {
            return;
        }
        // check for condition to move left or right
        else if (Math.abs(xOffset) == 2 && Math.abs(yOffset) < 1) {
            move(nextKnotKey, (xOffset / 2), 0);
        }
        // check for condition to move up or down
        else if (Math.abs(xOffset) < 1 && Math.abs(yOffset) == 2) {
            move(nextKnotKey, 0, (yOffset / 2));
        }
        // only option is to move diagonally then
        else {
            move(nextKnotKey, (xOffset / Math.abs(xOffset)), (yOffset / Math.abs(yOffset)));
        }
    };

    const move = (knot, x, y) => {
        planckLengthsMap[knot].x += x;
        planckLengthsMap[knot].y += y;
        planckLengthsMap[knot].history.push(`${planckLengthsMap[knot].x}-${planckLengthsMap[knot].y}`);

        if (knot !== TAIL) {
            checkAndMoveNextKnot(knot);
        }
    };

    for (let i = 0; i < moves; i++) {
        switch (direction) {
            case 'R':
                move(HEAD, 1, 0);
                break;
            case 'L':
                move(HEAD, -1, 0);
                break;
            case 'U':
                move(HEAD, 0, 1);
                break;
            case 'D':
                move(HEAD, 0, -1);
                break;
            default:
                console.log(`unknown direction ${direction}`);
        }
    }
};

inputLines.forEach(line => {
    const [direction, moves = +moves] = line.split(' ');
    moveHeadDirection(direction, moves);
});

// part 1
const oneKnotHistorySet = new Set();
planckLengthsMap['1'].history.forEach(history => oneKnotHistorySet.add(history));
console.log(oneKnotHistorySet.size);

// part 2
const tailHistorySet = new Set();
planckLengthsMap[TAIL].history.forEach(history => tailHistorySet.add(history));
console.log(tailHistorySet.size);