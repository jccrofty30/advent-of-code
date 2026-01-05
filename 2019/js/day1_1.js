const input = ``;

const solve = () => {
    const moduleMasses = input.split(/\n/).map(Number);
    const totalFuel = moduleMasses.reduce((acc, mass) => {
        const fuel = Math.floor(mass / 3) - 2;
        return acc + fuel;
    }, 0);

    console.log(totalFuel);
};

solve();