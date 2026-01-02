const input = ``;

const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');
    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

const solve = () => {
    const movements = input.split('');
    let floor = 0;
    let i;
    for (i = 0; i < movements.length; i++) {
        floor += movements[i] === '(' ? 1 : -1;
        if (floor < 0) {
            break;
        }
    }

    console.log(i + 1);
};

solve();