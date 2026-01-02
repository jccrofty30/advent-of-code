const input = ``;

const test = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

// @ts-ignore
const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');
    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

class Manifold {
    public levels: Level[];

    public constructor(public readonly rawInput: string) {
        this.levels = rawInput.split(/\n/).map((line, rIx) => new Level(rIx, line));
    }

    public emitBeam() {
        return this.levels[1].channels[this.levels[0].rawString.indexOf('S')].setIsBeam();
    }
}

class Level {
    public channels: Channel[];

    public constructor(public row: number, public rawString: string) {
        this.channels = rawString.split('').map((char, cIx) => new Channel(cIx, row, char));
    }

    public getChannel(col: number) {
        return this.channels[col];
    }

    public isBeam(col: number) {
        return this.channels[col].isBeam;
    }

    public splitAt(col: number): void {
        this.channels[col-1].setIsBeam();
        this.channels[col+1].setIsBeam();
    }

    public toString() {
        return this.channels.map(channel => channel.char).join('');
    }
}

class Channel {
    public isBeam: boolean;
    public isEmpty: boolean;
    public isSplitter: boolean;

    public constructor(public readonly column: number, public readonly row: number, public char: string) {
        this.isBeam = char === '|';
        this.isEmpty = char === '.';
        this.isSplitter = char === '^';
    }

    public setIsBeam() {
        this.char = '|';
        this.isBeam = true;
    }
}

const solve = () => {
    const manifold = new Manifold(args.test ? test : input);
    manifold.emitBeam();
    const splits = manifold.levels.reduce((p, level, rIx, levels) => {
        if (rIx === 0 || rIx === manifold.levels.length - 1) {
            if (args.verbose) {
                console.log(level.toString());
            }
            return p;
        }

        for (var channel of level.channels) {
            if (channel.isSplitter && levels[rIx - 1].isBeam(channel.column)) {
                level.splitAt(channel.column);
                p += 1;
            }

            if (channel.isEmpty && levels[rIx - 1].isBeam(channel.column)) {
                channel.setIsBeam();
            }
        }

        if (args.verbose) {
            console.log(level.toString());
        }

        return p;
    }, 0);

    if (args.test) {
        const pass = splits === 21;
        console.log(pass ? 'PASS' : 'FAIL');
        if (!pass) {
            console.log(`${splits} != 21`);
        }
    }
    else {
        console.log(splits);
    }
};

solve();
