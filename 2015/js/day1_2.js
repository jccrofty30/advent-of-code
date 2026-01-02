const input = ``;

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