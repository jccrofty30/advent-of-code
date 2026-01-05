const input = ``;

const test = `1969`;

const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');

    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

const solve = () => {
    const moduleMasses = (args.test ? test : input).split(/\n/).map(Number);
    const totalFuel = moduleMasses.reduce((acc, mass) => {
        let fuel = Math.floor(mass / 3) - 2;
        let additionalFuel = fuel;

        while (additionalFuel > 0) {
            additionalFuel = Math.floor(additionalFuel / 3) - 2;
            if (additionalFuel > 0) {
                fuel += additionalFuel;
            }
        }
        
        return acc + fuel;
    }, 0);

    console.log(totalFuel);
    if (args.expect) {
        console.log('Matches expected:', totalFuel === Number(args.expect));
    }
};

solve();