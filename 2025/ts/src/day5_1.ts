const input = ``;

const test = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

// @ts-ignore
const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');
    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

class CustomRange {
    public constructor(
        public readonly min: number,
        public readonly max: number,
    ) {}
}

const solve = () => {
    const [rangeStrings, ingredientStrings] = (args.test ? test : input).split(/\n\n/);
    const ingredients = ingredientStrings.split(/\n/).map(Number);
    const ranges = rangeStrings.split(/\n/).map(range => {
        const [min, max] = range.split('-').map(Number);
        return new CustomRange(min, max);
    });

    const fresh: number[] = [];
    for (const ingredient of ingredients) {
        const isFresh = ranges.reduce((p, range) => {
            if (p) {
                return p;
            }

            return range.min <= ingredient && range.max >= ingredient;
        }, false);

        if (isFresh) {
            fresh.push(ingredient);
        }
    }

    if (args.test) {
        const pass = fresh.length === 3;
        console.log(pass ? 'PASS' : 'FAIL');
        if (!pass) {
            console.log(`${fresh.length} != 3`);
        }
    }
    else {
        console.log(fresh.length);
    }
}

solve();
