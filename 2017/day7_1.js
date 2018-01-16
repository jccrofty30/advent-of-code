const puzzle = ``; // Puzzle Input

let childPrograms = [];
const parentNames = [];

const parentPrograms = puzzle.split(/\n/).filter((curr) => {
    return curr.split('->').length > 1;
});

parentPrograms.forEach((curr) => {
    const programParts = curr.split('->');
    parentNames.push(programParts[0].split(' ')[0]);
    childPrograms = childPrograms.concat(programParts[1].split(',').map((c) => c.trim()));
});

const base = parentNames.filter((parent) => !childPrograms.includes(parent));

console.log(base[0]);