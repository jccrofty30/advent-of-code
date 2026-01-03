const input = ``;

const test = `ULL
RRDDD
LURDL
UUUUD`;

const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');

    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

class Keypad {
    posX;
    posY;

    constructor(layout, startX, startY) {
        this.layout = layout;
        this.posX = startX;
        this.posY = startY;
    }

    static U = [0, -1];
    static D = [0, 1];
    static L = [-1, 0];
    static R = [1, 0];

    move(direction) {
        const [dx, dy] = Keypad[direction];
        const newX = this.posX + dx === -1 ? 0 : this.posX + dx;
        const newY = this.posY + dy === -1 ? 0 : this.posY + dy;

        if (this.layout[newY] && this.layout[newY][newX] !== undefined) {
            this.posX = newX;
            this.posY = newY;
        }
    }

    get current() {
        return this.layout[this.posY][this.posX];
    }
}

const solve = () => {
    const keypad = new Keypad([[undefined,undefined,'1',undefined,undefined],[undefined,'2','3','4',undefined],['5','6','7','8','9'], [undefined,'A','B','C',undefined], [undefined,undefined,'D',undefined,undefined]], 0, 2);
    const lines = (args.test ? test : input).trim().split(/\n/);

    const code = lines.reduce((p, line) => {
        const moves = line.split('');
        moves.forEach(move => keypad.move(move));
        return p + keypad.current;
    }, '');

    if (args.test) {
        const pass = code === '5DB3';
        console.log(`Test: ${pass ? 'PASS' : 'FAIL'}`);
        if (!pass) {
            console.log(`Expected 5DB3 but got ${code}`);
        }
    }
    else {
        console.log(code);
    }
};

solve();