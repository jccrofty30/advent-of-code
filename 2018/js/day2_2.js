const input = ``;

const test = `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`;

const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');

    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});


const solve = () => {
    const data = (args.test ? test : input).trim().split('\n');

    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            let diffs = 0;
            let diffIndex = -1;

            for (let k = 0; k < data[i].length; k++) {
                if (data[i][k] !== data[j][k]) {
                    diffs++;
                    diffIndex = k;

                    if (diffs > 1) {
                        break;
                    }
                }
            }

            if (diffs === 1) {
                console.log(data[i].slice(0, diffIndex) + data[i].slice(diffIndex + 1));
                return;
            }
        }
    }
};

solve();