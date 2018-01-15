const puzzle = ``; // Puzzle Input

const phrases = puzzle.split(/\n/);

const valid = phrases.reduce((p, c) => {
    const parts = c.split(' ');

    const partSet = new Set(parts);
    const orderedSet = new Set(parts.map((curr) => curr.split('').sort().join('')));
    if (parts.length === 1 || partSet.size !== parts.length || orderedSet.size !== parts.length) {
        return p;
    }

    return ++p;
}, 0);

console.log(valid);