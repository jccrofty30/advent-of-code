const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const add = (...values: number[]): number => {
    return values.reduce((p, v) => p + v, 0);
}

const makePermutations = (data: Array<(...v: number[]) => number>, length: number) => {
    const current: Array<(...v: number[]) => number> = new Array(length);
    const result: Array<(...v: number[]) => number>[]  = [];
    const seen: { [key: string]: boolean; } = {};
    const used: boolean[] = new Array(length);

    const permute = (pos: number)=> {
        if (pos === length) {      // Do we have a complete combination?
            if (!seen[current.toString()]) {   // Check whether we've seen it before.
                seen[current.toString()] = true; // If not, save it.
                result.push(current.slice());
            }

            return;
        }

        for (var i = 0; i < data.length; ++i) {
            if (!used[i]) {         // Have we used this element before?
                used[i] = true;       // If not, insert it and recurse.
                current[pos] = data[i];
                permute(pos + 1);
                used[i] = false;      // Reset after the recursive call.
            }
        }
    };

    permute(0);
    return result;
};

const multiply = (...values: number[]): number => {
    return values.reduce((p, v) => p * v, 1);
}

const testMap = input.split(`\n`).reduce((p, c) => {
    const [test, parts] = c.split(': ');
    return {
        ...p,
        [test]: parts.split(' ').map(i => parseInt(i, 10)),
    };
}, {} as { [key: string]: number[] });

// console.log(testMap);

const operators = [ add, multiply ];
const validTests = Object.entries(testMap).reduce((p, [cKey, cVal]) => {
    const permutations = makePermutations(operators, cVal.length - 1);

    if (!permutations.some(p => p.reduce((prev, o, ix) => o(), 0))) {
        return p;
    }

    return [
        ...p,
        cKey,
    ];
}, [] as string[]);

console.log(validTests);

