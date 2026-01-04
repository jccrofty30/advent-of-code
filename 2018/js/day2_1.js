const input = ``;

const test = `abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`;

const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');

    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});


const solve = () => {
    const data = (args.test ? test : input).trim().split('\n');
    const [twos, threes] = data.reduce(([twosAcc, threesAcc], line) => {
        const counts = line.split('').reduce((countMap, char) => {
            countMap[char] = (countMap[char] || 0) + 1;
            return countMap;
        }, {});
        
        const hasTwo = Object.values(counts).some(count => count === 2) ? 1 : 0;
        const hasThree = Object.values(counts).some(count => count === 3) ? 1 : 0;
        return [twosAcc + hasTwo, threesAcc + hasThree];
    }, [0, 0]);

    const checksum = twos * threes;

    if (args.test) {
        console.log('Running test input:');
        const pass = checksum === 12;
        console.log(`Test ${pass ? 'passed' : 'failed'}`);
        if (!pass) {
            console.log(`Expected 12 but got ${checksum}`);
        }
    }
    else {
        console.log('Running real input:');
        console.log(checksum);
    }
};

solve();