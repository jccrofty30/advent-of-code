const input = ``;

const solve = () => {
    const frequency = input.split(/\n/).map(Number).reduce((a,b) => a + b, 0);

    console.log(frequency);
};

solve();