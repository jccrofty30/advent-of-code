const input = ``;

const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');

    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

const solve = () => {
    const gifts = input.split(/\n/);
    const feet = gifts.reduce((p, gift) => {
        const sides = gift.split('x').map(Number).sort((a, b) => a - b);
        if (args.verbose) {
            console.log(sides);
        }
        const cubicFeet = sides.reduce((prev, side) => prev * side, 1);

        return p + cubicFeet + (2 * sides[0]) + (2 * sides[1]);
    }, 0);

    console.log(feet);
};

solve();

// 3829537 too high