const input = ``;

const safeChecks: boolean[] = input.split(`\n`).map(r => {
    let dampened = false;
    let increasing: boolean | null = null;
    return r.split(' ').map(i => parseInt(i, 10)).reduce((p, c, ix, arr) => {
        if (
            !p
            || ix === arr.length - 1
        ) {
            return p;
        }

        const diff = c - arr[ix + 1];

        const safeRange = /[1-3]/.test(Math.abs(diff).toString());

        if (!safeRange && !dampened) {
            dampened = true;
            return p;
        }

        const safeDiff = increasing === null || (diff < 0 && increasing) || (diff > 0 && !increasing);
        if (!safeDiff && !dampened) {
            dampened = true;
            return p;
        }

        if (increasing === null) {
            increasing = diff === 0 ? null : diff < 0;
        }

        return safeRange && safeDiff;
    }, true);
});

console.log(safeChecks.filter(c => c).length);