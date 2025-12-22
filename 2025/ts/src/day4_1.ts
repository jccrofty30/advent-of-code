const input = ``;

const test = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

// @ts-ignore
const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');
    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

class Grid {
    public columns: number;
    public rows: string[];
    public constructor(public readonly inventory: string) {
        this.rows = inventory.split(/\n/);
        this.columns = this.rows[0].split('').length;
    }

    public isClear(roll: Roll): boolean {
        let adjacent = 0;

        for (let row = -1; row <= 1; row++) {
            if (
                (roll.row === 0 && row === -1)
                || (roll.row === this.rows.length - 1 && row === 1)
            ) {
                continue;
            }

            for (let col = -1; col <= 1; col++) {
                if (
                    (roll.column === 0 && col === -1)
                    || (roll.column === this.columns - 1 && col === 1)
                    || (row === 0 && col === 0)
                ) {
                    continue;
                }

                // if (args.verbose) {
                //     console.log(`(${roll.row + row}, ${roll.column + col})`, this.rows[roll.row + row][roll.column + col]);
                // }
                adjacent += this.rows[roll.row + row][roll.column + col] === Roll.Char
                    ? 1
                    : 0;
            }
        }

        // if (args.verbose) {
        //     console.log(`(${roll.row}, ${roll.column})`, adjacent);
        // }
        return adjacent < 4;
    }
}

class Roll {
    public static Char = '@';

    public constructor(
        public readonly row: number,
        public readonly column: number,
    ) {}
}

const solve = () => {
    const grid = new Grid(args.test ? test : input);
    const rolls = grid.rows.reduce((p, row, rIx) => {
        // if (args.verbose) {
        //     console.log(rIx, row);
        // }
        const slots = row.split('');
        
        p += slots.reduce((prev, slot, cIx) => {
            if (slot === '.') {
                return prev;
            }

            return prev += grid.isClear(new Roll(rIx, cIx)) ? 1 : 0;
        }, 0);

        return p;
    }, 0);

    if (args.test) {
        const pass = rolls === 13;
        console.log(pass ? 'PASS' : 'FAIL');
        console.log(`${rolls} != 13`);
    }
    else {
        console.log(rolls);
    }
};

solve();