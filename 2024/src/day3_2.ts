const input = ``;

let enabled = true;
const realInstructions = [ ...input.matchAll(/do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g) ].map(m => m[0]).reduce((p, c) => {
    if (/do(?:n't)?\(\)/.test(c)) {
        enabled = /do\(\)/.test(c);
        return p;
    }

    return !enabled ? p : p + c.replace(/mul\(|\)/g, '').split(',').map(i => parseInt(i, 10)).reduce((prev, curr) => prev * curr, 1);
}, 0);

console.log(realInstructions);