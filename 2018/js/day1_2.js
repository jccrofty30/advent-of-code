const input = ``;

const solve = () => {
    const frequencies = {};
    let frequency = 0;
    while (true) {
        for (const step of input.split(/\n/).map(Number)) {
            frequency += step;
            if (frequencies[frequency]) {
                console.log(frequency);
                return;
            }
            frequencies[frequency] = true;
        }
    }
};

solve();