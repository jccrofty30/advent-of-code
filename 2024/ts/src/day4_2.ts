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
    DownLeft = '1,-1',
    DownRight = '1,1',
    UpLeft = '-1,-1',
    UpRight = '-1,1',
}

const determineDirection = (line: number, column: number, [testLine, testCol]: [number, number]): Direction => {
    if (line > testLine) {
        return column > testCol
            ? Direction.UpLeft
            : Direction.UpRight;
    }

    return column > testCol
        ? Direction.DownLeft
        : Direction.DownRight;
};

const hasOpposite = (direction: Direction, originLine: number, originCol: number, searchFor: string) => {
    const [oppositeLine, oppositeCol] = direction.split(',').map(i => parseInt(i, 10) * -1);
    return crossword[originLine + oppositeLine] && crossword[originLine + oppositeLine][originCol + oppositeCol] === searchFor;
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
            : [ column - 1, column + 1 ];

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
const count = crossword.reduce((p, currLine, lineA) => {
    let counter = p;

    counter += currLine.reduce((prevA, char, colA) => {
        if (lineA === 0 || lineA === crossword.length - 1 || char !== 'A') {
            return prevA;
        }

        const surroundingM = searchSurrounding(lineA, colA, 'M');
        return surroundingM.length != 2
            ? prevA
            : prevA + (surroundingM.every(({direction: directionM}) => hasOpposite(directionM, lineA, colA, 'S')) ? 1 : 0);
    }, 0);

    return counter;
}, 0);

console.log(count);