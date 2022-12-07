const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const inputTrimmed = input.trim();
const buffer = inputTrimmed.split('');

const findDistinctMarkerInBuffer = (buffer, numberOfDistinctChars = 1, silent = true) => {
    const distinctIndexesHelper = numberOfDistinctChars - 1;
    let markerIndex = -1;
    const bufferMap = {}
    buffer.every((character, index, array) => {
        // add current to map
        bufferMap[character] = index;

        if (Object.keys(bufferMap).length === numberOfDistinctChars) {
            markerIndex = index + 1;
            return false;
        }
        // rolling delete of previous tracked characters
        else if (index >= distinctIndexesHelper && bufferMap[array[index - distinctIndexesHelper]] < index - numberOfDistinctChars + 2) {
            if (!silent) {
                console.log('deleting ', array[index - distinctIndexesHelper], 'at character', character, index, bufferMap);
            }

            delete bufferMap[array[index - distinctIndexesHelper]];
        }

        return true;
    });

    return markerIndex
}

// part 1
console.log(findDistinctMarkerInBuffer(buffer, 4, true));

// part 2 
console.log(findDistinctMarkerInBuffer(buffer, 14, true));