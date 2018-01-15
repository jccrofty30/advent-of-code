const puzzle = ``; // Puzzle Input

const phrases = puzzle.split(/\n/);

const valid = phrases.reduce((p, c) => {
    const parts = c.split(' ');
    if (parts.length === 1 || new Set(parts).size !== parts.length) {
        return p;
    }
    return ++p;
}, 0);

console.log(valid);