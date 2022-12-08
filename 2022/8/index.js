const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const inputLines = input.split('\n').map((line) => line.trim());

const treeMap = [];
inputLines.forEach(line => {
    treeMap.push(line.split('').map(tree => {
        return {
            height: +tree,
            visible: false,
            edge: false
        }
    }));
});

// part 1
const processVisibleTrees = (treeMap) => {
    const treeMapCopy = JSON.parse(JSON.stringify(treeMap));

    // process visibility on edges
    treeMapCopy.forEach((row, treeMapIndex, treeMapArray) => {
        row.forEach((tree, rowMapIndex, rows) => {
            if (treeMapIndex === 0 || treeMapIndex === treeMapArray.length - 1 || rowMapIndex === 0 || rowMapIndex === rows.length - 1) {
                tree.visible = true;
                tree.edge = true;
            }
        });
    });

    // processs vibility from left to right and then right to left
    treeMapCopy.forEach((row) => {
        // process row left to right
        let visibleHeight = -1
        row.forEach((tree) => {
            if (tree.height > visibleHeight) {
                visibleHeight = tree.height;
                tree.visible = true;
            }
        });

        // reset and process row right to left
        visibleHeight = -1;
        row.reverse().forEach((tree) => {
            if (tree.height > visibleHeight) {
                visibleHeight = tree.height;
                tree.visible = true;
            }
        });

        row.reverse();
    });

    // process visibility from top to bottom
    const topDownMap = [...treeMapCopy[0].map(tree => tree.height)];
    treeMapCopy.forEach(row => {
        row.forEach((tree, index) => {
            if (topDownMap[index] < tree.height) {
                topDownMap[index] = tree.height;
                tree.visible = true;
            }
        });
    });

    // process visibility from bottom to top
    treeMapCopy.reverse();
    const bottomUpMap = [...treeMapCopy[0].map(tree => tree.height)];
    treeMapCopy.forEach(row => {
        row.forEach((tree, index) => {
            if (bottomUpMap[index] < tree.height) {

                bottomUpMap[index] = tree.height;
                tree.visible = true;
            }
        });
    })

    // reverse back to original
    treeMapCopy.reverse();

    return treeMapCopy;
}

const visibleTreeMap = processVisibleTrees(treeMap);
const visibleTreeCount = visibleTreeMap.reduce((visibleTreeCount, row) => {
    return row.reduce((visibleTreeCount, tree) => {
        return visibleTreeCount + (tree.visible ? 1 : 0);
    }, visibleTreeCount);
}, 0);

console.log(visibleTreeCount);

// part 2
const calculateScenicScoreAt = (treeMap, row, column) => {
    const treeMapCopy = JSON.parse(JSON.stringify(treeMap));
    const thisTree = treeMapCopy[row][column];
    const treesInRow = treeMap[row];
    const treesInColumn = treeMap.map(row => {
        return row[column];
    });

    // check for any break conditions, like edges
    if (thisTree.edge) {
        thisTree.scenicScore = 0;
        return thisTree;
    }

    // process score "up"
    let scoreUp = 0;
    treesInColumn.slice(0, row).reverse().every(tree => {
        scoreUp += 1;
        return tree.height < thisTree.height
    });

    // process score "down"
    let scoreDown = 0;
    treesInColumn.slice(row + 1).every(tree => {
        scoreDown += 1;
        return tree.height < thisTree.height
    });

    // process score "left"
    let scoreLeft = 0;
    treesInRow.slice(0, column).reverse().every(tree => {
        scoreLeft += 1;
        return tree.height < thisTree.height;
    });

    // process score "right"
    let scoreRight = 0;
    treesInRow.slice(column + 1).every(tree => {
        scoreRight += 1;
        return tree.height < thisTree.height
    });

    // process totalScore
    thisTree.scenicScore = scoreUp * scoreDown * scoreLeft * scoreRight;;

    return thisTree.scenicScore;
}

const highestScenicScore = treeMap.reduce((highestRowScore, row, rowIndex) => {
    const rowHighestScenicScore = row.reduce((highestScore, tree, columnIndex) => {
        const treeScenicScore = calculateScenicScoreAt(treeMap, rowIndex, columnIndex);
        return highestScore < treeScenicScore ? treeScenicScore : highestScore;
    }, highestRowScore);

    return highestRowScore < rowHighestScenicScore ? rowHighestScenicScore : highestRowScore;
}, 0);
console.log(highestScenicScore);