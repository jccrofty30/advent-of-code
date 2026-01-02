const input = ``;

const solve = () => {
    const gifts = input.split(/\n/);
    const sqft = gifts.reduce((p, gift) => {
        const [l, w, h] = gift.split('x').map(Number);
        const totalSqFt = (2 * l * w) + (2 * l * h) + (2 * w * h);
        const extra = (l * w) < (l * h)
            ? ((l * w) < (w * h) ? (l * w) : (w * h))
            : ((l * h) < (w * h) ? (l * h) : (w * h));

        return p + totalSqFt + extra;
    }, 0);

    console.log(sqft);
};

solve();