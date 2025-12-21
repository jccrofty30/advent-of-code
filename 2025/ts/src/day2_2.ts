const input = ``;

const test = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

// @ts-ignore
const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');
    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

const ranges = (args.test ? test : input).split(',');
const invalidTotal = ranges.reduce((p, range) => {
    if (args.verbose) {
        console.log(range);
    }
    const [min, max] = range.split('-').map(Number);
    for (let i = min; i <= max; i++) {
        if (/^(\d+)\1+$/.test(i.toString())) {
            if (args.verbose) {
                console.log(i);
            }
            p += i;
        }
    }

    return p;
}, 0);

if (args.test) {
    const pass = invalidTotal === 4174379265;
    console.log(pass ? 'PASS' : 'FAIL');
    if (!pass) {
        console.log(invalidTotal + ' != ' + 4174379265);
    }
}
else {
    console.log(invalidTotal);
}