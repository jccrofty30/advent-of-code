const input = ``;

const safeChecks: boolean[] = input.split(`\n`).map(r => {
    if (
        r !== r.split(' ').map(i => parseInt(i, 10)).sort((a, b) => a - b).join(' ')
        && r !== r.split(' ').map(i => parseInt(i, 10)).sort((a, b) => a - b).reverse().join(' ')
    ) {
        return false;
    }

    return r.split(' ').map(i => parseInt(i, 10)).reduce((p, c, ix, arr) => {
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