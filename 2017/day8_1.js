const puzzle = ``; // Puzzle Input

const plainTextInstructions = puzzle.split(/\n/);

const registers = Array.from(new Set(plainTextInstructions.map((c) => c.split(' ')[0]))).reduce((p,c) => {
    p[c] = 0;
    return p;
}, {});

const instructions = plainTextInstructions.map((c) => {
    const parts = c.split(' ');
    return {
        additive: Number(parts[2]),
        check: parts[4],
        conditional: [parts[5], parts[6]].join(' '),
        multiplier: parts[1] === 'inc' ? 1 : -1,
        name: parts[0],
    }
});

instructions.forEach((c) => {
    if (eval(`${registers[c.check]} ${c.conditional}`)) {
        registers[c.name] += c.additive * c.multiplier;
    }
});

console.log(registers);
