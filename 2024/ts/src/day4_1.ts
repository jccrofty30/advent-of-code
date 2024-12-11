// const input = ``;

// Example Input
const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const crossword = input.split(`\n`).map(l => l.split(''));

enum Direction {
    Down = '1,0',
    DownLeft = '1,-1',
    DownRight = '1,1',
    Up = '-1,0',
    UpLeft = '-1,-1',
    UpRight = '-1,1',
}

const determineDirection = (line: number, column: number, [testLine, testCol]: [number, number]): Direction => {
    if (line > testLine) {
        return column > testCol
            ? Direction.UpLeft
            : (column === testCol ? Direction.Up : Direction.UpRight);
    }

    return column > testCol
        ? Direction.DownLeft
        : (column === testCol ? Direction.Down : Direction.DownRight);
};

const searchSurrounding = (line: number, column: number, searchFor: string, direction?: Direction): { direction: Direction; location: [number, number] }[] => {
    const found: { direction: Direction; location: [number, number] }[] = [];
    const [ lineDir, colDir ] = direction ? direction.split(',').map(i => parseInt(i, 10)) : [0, 0];

    const lineSearch = direction
        ? [ lineDir + line ]
        : [ line - 1, line + 1 ];

    for (var tempLine of lineSearch) {
        if (!crossword[tempLine]) {
            continue;
        }

        const colSearch = direction
            ? [ colDir + column ]
            : [ column - 1, column, column + 1 ];

        for (var tempCol of colSearch) {
            if (!crossword[tempLine][tempCol]) {
                continue;
            }

            if (crossword[tempLine][tempCol] === searchFor) {
                found.push({
                    direction: direction ? direction : determineDirection(line, column, [tempLine, tempCol]),
                    location: [tempLine, tempCol],
                });
            }
        }
    }

    return found;
};

const visual: string[][] = [ ...crossword.map(l => [ ...l.map(c => '.' )])];
const count = crossword.reduce((p, currLine, lineX) => {
    let counter = p;

    counter += ['XMAS', 'SAMX'].reduce((p, c) => {
        const matches = [ ...currLine.join('').matchAll(new RegExp(c, 'g')) ]
        matches.forEach(m => {
            visual[lineX].splice(m.index!, c.length, ...c.split(''));
        })
        return p + matches.length;
    }, 0);

    counter += currLine.reduce((prevX, char, colX) => {
        if (char !== 'X') {
            return prevX;
        }

        const surroundingM = searchSurrounding(lineX, colX, 'M');

        return prevX + surroundingM.reduce((prevM, {direction: directionM, location: [lineM, colM]}) => {
            const surroundingA = searchSurrounding(lineM, colM, 'A', directionM);

            return prevM + surroundingA.reduce((prevA, {direction: directionA, location: [lineA, colA]}) => {
                const surroundingS = searchSurrounding(lineA, colA, 'S', directionA);

                surroundingS.forEach(({location: [lineS, colS]}) => {
                    visual[lineX][colX] = 'X';
                    visual[lineM][colM] = 'M';
                    visual[lineA][colA] = 'A';
                    visual[lineS][colS] = 'S';
                });

                return prevA + surroundingS.length;
            }, 0);
        }, 0);
    }, 0);

    return counter;
}, 0);

console.log(visual.map(line => line.join('')).join(`\n`));
console.log(count);