const input = ``;

const safeChecks: boolean[] = input.split(`\n`).map(r => {
    const parsedArray = r.split(' ').map(i => parseInt(i, 10));

    if (
        r !== parsedArray.sort((a, b) => a - b).join(' ')
        && r !== parsedArray.sort((a, b) => a - b).reverse().join(' ')
    ) {
        return false;
    }

    return parsedArray.reduce((p, c, ix, arr) => {
        if (
            !p
            || ix === arr.length - 1
        ) {
            return p;
        }

        return /[1-3]/.test(Math.abs(c - arr[ix + 1]).toString());
    }, true);
});

console.log(safeChecks.filter(c => c).length);