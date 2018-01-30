const puzzle = ``; // Puzzle Input

const puzzleNums = puzzle.split(',').map(Number);

const circular = [...Array(256).keys()];
const l = circular.length;
let skip = 0;
let step = 0;
puzzleNums.forEach((c) => {
    [...Array(c).keys()]
        .map((o, k) => circular[(k + step) % l])
        .reverse()
        .forEach((val, k) => { circular[(k + step) % l] = val; });
    step += c + skip;
    skip++
});

console.log(circular[0] * circular[1]);