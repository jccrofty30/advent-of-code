const input = ``;

const test = `987654321111111
811111111111119
234234234234278
818181911112111`;

// @ts-ignore
const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');
    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

const banks = (args.test ? test : input).split(/\n/);
const joltage = banks.reduce((p, bank) => {
    const slots = bank.split('').map(Number);
    const max = Math.max(...slots.slice(0, -1));
    const next = Math.max(...slots.slice(slots.indexOf(max) + 1));
    p += Number(`${max}${next}`);
    return p;
}, 0);

if (args.test) {
    const pass = joltage === 357;
    console.log(pass ? 'PASS' : 'FAIL');
    if (!pass) {
        console.log(`${joltage} != 357`);
    }
}
else {
    console.log(joltage);
}