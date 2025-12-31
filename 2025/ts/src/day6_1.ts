const input = ``;

const test = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

// @ts-ignore
const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');
    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

const Operations = {
    '+': (...args: number[]) => args.reduce((p, c) => p + c, 0),
    '*': (...args: number[]) => args.reduce((p, c) => p * c, 1),
};

class Problem {
    public args: number[] = [];
    public operation: '+' | '*' = '+';

    public constructor(first: number) {
        this.args.push(first);
    }

    public solve() {
        if (args.verbose) {
            console.log(...this.args, this.operation);
        }
        return Operations[this.operation](...this.args);
    }
}

const solve = () => {
    const lines = (args.test ? test : input).split(/\n/);
    const problems: Problem[] = [];
    let firstLine = true;
    for (const line of lines) {
        const parts = line.split(/\s+/).filter(part => part.trim() !== '');
        if (/^\d+$/.test(parts[0])) {
            const parsedParts = parts.map(Number);
            if (firstLine) {
                problems.push(...parsedParts.map(part => new Problem(part)));
                firstLine = false;
                continue;
            }
            
            for (let j = 0; j < problems.length; j++) {
                problems[j].args.push(parsedParts[j]);
            }
            continue;
        }

        for (let j = 0; j < problems.length; j++) {
            problems[j].operation = parts[j] as '+' | '*';
        }
    }

    const grandTotal = problems.reduce((p, problem) => {
        return p + problem.solve();
    }, 0);

    if (args.test) {
        const pass = grandTotal === 4277556;
        console.log(pass ? 'PASS' : 'FAIL');
        if (!pass) {
            console.log(`${grandTotal} !== 4277556`);
        }
    }
    else {
        console.log(grandTotal);
    }
};

solve();