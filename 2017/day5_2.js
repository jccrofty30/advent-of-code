const puzzle = ``; // Puzzle Input

const offsets = puzzle.split(/\n/).map(Number);

let last = 0;
let place = 0;
let steps = 0;

while (place < offsets.length) {
    steps++;
    last = place;
    place += offsets[place];
    offsets[last] += offsets[last] >= 3 ? -1 : 1;
}

console.log(steps);