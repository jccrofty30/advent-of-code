/**
 * Thanks to: https://www.geeksforgeeks.org/print-n-x-n-spiral-matrix-using-o1-extra-space/
 */

const puzzle = 0; // Puzzle Input
const coords = {
    1: { x: 0, y: 0 },
    [puzzle]: { x: 0, y: 0 },
};

function evalSpiral( n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let x = Math.min(Math.min(i, j), Math.min(n - 1 - i, n - 1 - j));

            if (i <= j) {
                if ([1, puzzle].includes(((n-(2*x))*(n-(2*x)))-(i-x)-(j-x))) {
                    coords[`${((n-(2*x))*(n-(2*x)))-(i-x)-(j-x)}`] = { x: i, y: j };
                }
                continue;
            }

            if ([1, puzzle].includes((((n-(2*x)-2))*(n-(2*x)-2))+(i-x)+(j-x))) {
                coords[`${(((n-(2*x)-2))*(n-(2*x)-2))+(i-x)+(j-x)}`] = { x: i, y: j };
            }
        }
    }
}

evalSpiral(Math.ceil(Math.sqrt(puzzle)));

console.log(Math.abs(coords[1].x - coords[puzzle].x) + Math.abs(coords[1].y - coords[puzzle].y));