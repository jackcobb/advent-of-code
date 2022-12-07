const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8' });
const inputLines = input.split('\n').map((line) => line.trim());

const filesystem = {
    cwd: [],
    structure: { size: 0, isDirectory: true },
};
inputLines.forEach((line) => {
    // check for user command
    if (line.startsWith('$')) {
        const [, command, directory] = line.split(' ');

        // change to directory
        if (command === 'cd') {
            switch (directory) {
                case '..':
                    filesystem.cwd = filesystem.cwd.slice(
                        0,
                        filesystem.cwd.length - 1,
                    );
                    break;
                case '/':
                    filesystem.cwd = [];
                    break;
                case null:
                case undefined:
                    break;
                default:
                    filesystem.cwd.push(directory);
            }
        }
    } else if (line.startsWith('dir')) {
        const [, dir] = line.split(' ');

        let cwd = filesystem.structure;
        filesystem.cwd.forEach((directory) => (cwd = cwd[directory]));

        cwd[dir] = { isDirectory: true, size: 0 };
    } else {
        const [size, filename] = line.split(' ');
        let cwd = filesystem.structure;
        filesystem.cwd.forEach((directory) => (cwd = cwd[directory]));

        cwd[filename] = { isDirectory: false, size: +size };
    }
});

const calculateFileSystemSize = (cwd) => {
    if (cwd.isDirectory) {
        let totalDirectorySize = 0;

        Object.keys(cwd)
            .filter((key) => !['size', 'isDirectory'].includes(key))
            .forEach((key) => {
                if (cwd[key].isDirectory) {
                    totalDirectorySize += calculateFileSystemSize(cwd[key]);
                } else {
                    totalDirectorySize += cwd[key].size;
                }
            });

        cwd.size = totalDirectorySize;

        return totalDirectorySize;
    } else {
        return cwd.size;
    }
};

const findDirectoriesWithDifference = (cwd, size = 0, smaller = true) => {
    let files = [];

    if (cwd.isDirectory) {
        Object.keys(cwd)
            .filter((key) => !['size', 'isDirectory'].includes(key))
            .forEach((key) => {
                if (cwd[key].isDirectory) {
                    if (
                        smaller ? cwd[key].size <= size : cwd[key].size >= size
                    ) {
                        files.push({ directory: key, size: cwd[key].size });
                    }

                    files = [
                        ...files,
                        ...findDirectoriesWithDifference(
                            cwd[key],
                            size,
                            smaller,
                        ),
                    ];
                }
            });
    }

    return files;
};

// part 1
calculateFileSystemSize(filesystem.structure);
console.log(
    findDirectoriesWithDifference(filesystem.structure, 100000).reduce(
        (previousValue, current) => previousValue + current.size,
        0,
    ),
);

// part 2
const neededSpace = 30000000 - (70000000 - filesystem.structure.size);
console.log(
    findDirectoriesWithDifference(
        filesystem.structure,
        neededSpace,
        false,
    ).sort((a, b) => a.size - b.size)[0].size,
);
