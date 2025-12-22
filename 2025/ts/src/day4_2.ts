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
    public rows: Row[];
    public constructor(public readonly initialInventory: string) {
        this.rows = initialInventory.split(/\n/).map(row => new Row(row));
        this.columns = this.rows[0].columns;
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
                adjacent += this.rows[roll.row + row].row[roll.column + col].contents === Roll.Char
                    ? 1
                    : 0;
            }
        }

        // if (args.verbose) {
        //     console.log(`(${roll.row}, ${roll.column})`, adjacent);
        // }
        return adjacent < 4;
    }

    public removeRoll(roll: Roll) {
        this.rows[roll.row].row[roll.column].empty();
    }
}

class Roll {
    public static Char = '@';

    public constructor(
        public readonly row: number,
        public readonly column: number,
    ) {}
}

class Row {
    public columns: number;
    public row: Slot[];

    public constructor(public readonly initialRow: string) {
        this.columns = initialRow.split('').length;
        this.row = initialRow.split('').map(slot => new Slot(slot));
    }
}

class Slot {
    public constructor(public contents: string) {}

    public empty() {
        this.contents = '.';
    }
}

const solve = () => {
    const grid = new Grid(args.test ? test : input);
    let prevRolls = 0;
    let rolls = grid.rows.reduce((p, row, rIx) => {
        // if (args.verbose) {
        //     console.log(rIx, row);
        // }
        const slots = row.row;
        
        p += slots.reduce((prev, slot, cIx) => {
            if (slot.contents === '.') {
                return prev;
            }

            const roll = new Roll(rIx, cIx);
            if (grid.isClear(roll)) {
                grid.removeRoll(roll);
                prev += 1;
            }

            return prev;
        }, 0);

        return p;
    }, 0);

    while (prevRolls != rolls) {
        prevRolls = rolls;
        rolls = grid.rows.reduce((p, row, rIx) => {
            // if (args.verbose) {
            //     console.log(rIx, row);
            // }
            const slots = row.row;
            
            p += slots.reduce((prev, slot, cIx) => {
                if (slot.contents === '.') {
                    return prev;
                }

                const roll = new Roll(rIx, cIx);
                if (grid.isClear(roll)) {
                    grid.removeRoll(roll);
                    prev += 1;
                }

                return prev;
            }, 0);

            return p;
        }, prevRolls);
    }

    if (args.test) {
        const pass = rolls === 43;
        console.log(pass ? 'PASS' : 'FAIL');
        if (!pass) {
            console.log(`${rolls} != 43`);
        }
    }
    else {
        console.log(rolls);
    }
};

solve();