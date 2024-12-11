const input = ``;

const realInstructions = [ ...input.matchAll(/mul\(\d{1,3},\d{1,3}\)/g) ].map(m => m[0]).reduce((p, c) => {
    return p + c.replace(/mul\(|\)/g, '').split(',').map(i => parseInt(i, 10)).reduce((prev, curr) => prev * curr, 1);
}, 0);

console.log(realInstructions);