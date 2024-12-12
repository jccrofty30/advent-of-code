const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

class Heading {
    private _columnDirection: Direction.Left | Direction.Right = Direction.Right;
    private _lineDirection: Direction.Down | Direction.Up = Direction.Up;

    public constructor(
        private _columnHeading: -1 | 0 | 1,
        private _lineHeading: -1 | 0 | 1,
    ) {
        
    }

    get columnHeading() {
        return this._columnHeading;
    }

    get delta() {
        return [this._lineHeading, this._columnHeading];
    }

    get lineHeading() {
        return this._lineHeading;
    }

    turn90() {
        switch (this._columnHeading) {
            case 0:
                this._columnHeading += this._columnDirection === Direction.Left ? -1 : 1;
                break;
            case -1:
            case 1:
                this._columnDirection = this._columnDirection === Direction.Left ? Direction.Right : Direction.Left;
                this._columnHeading = 0;
        }

        switch (this._lineHeading) {
            case 0:
                this._lineHeading += this._lineDirection === Direction.Up ? -1 : 1;
                break;
            case -1:
            case 1:
                this._lineDirection = this._lineDirection === Direction.Up ? Direction.Down : Direction.Up;
                this._lineHeading = 0;
        }
    }

    turn180() {
        this.turn90();
        this.turn90();
    }

    turn270() {
        this.turn180();
        this.turn90();
    }
}

class MapCrawler {
    private _currentColumn: number;
    private _currentLine: number;
    private _heading: Heading;
    private _loops: [number, number][] = []
    private _mapString: string;
    private _origin: [number, number];
    private _parsedMap: Array<string[]>;
    private _recursive: boolean = true;
    private _revisitLimit: number = 10;
    private _spacesVisited: { [key: string]: number; } = {};

    public constructor(map: string, init?: { column: number, heading: Heading, line: number, recursive?: boolean; revisitLimit?: number; }) {
        this._mapString = map;
        this._parsedMap = map.split(`\n`).map((line, ix) => {
            if (init === undefined && line.indexOf('^') > -1) {
                this._currentLine = ix;
                this._currentColumn = line.indexOf('^');
                this._origin = this.currentPosition;
                this._spacesVisited[this.currentPosition.join(',')] = 1;
            }

            return line.split('')
        });

        if (init === undefined) {
            this._heading = new Heading(0, -1);
            return;
        }

        this._currentColumn = init.column;
        this._currentLine = init.line;
        this._heading = init.heading;
        this._origin = this.currentPosition;
        this._recursive = init.recursive === undefined ? this._recursive : init.recursive;
        this._revisitLimit = init.revisitLimit === undefined ? this._revisitLimit : init.revisitLimit;
        this._spacesVisited[this.currentPosition.join(',')] = 1;
    }

    get currentPosition(): [number, number] {
        return [this._currentLine, this._currentColumn];
    }

    get guardInArea() {
        return this._currentLine >= 0 && this._currentLine < this._parsedMap.length - 1 && this._currentColumn >= 0 && this._currentColumn < this._parsedMap[0].length - 1;
    }

    private isSpaceOpen(checkLine: number, checkCol: number) {
        return this._parsedMap[checkLine][checkCol] !== '#';
    }

    get loops() {
        return this._loops;
    }

    public move() {
        if (this.isSpaceOpen(this._currentLine + this._heading.lineHeading, this._currentColumn + this._heading.columnHeading)) {
            if (Object.keys(this._spacesVisited).indexOf(this.currentPosition.join(',')) === -1) {
                this._spacesVisited[this.currentPosition.join(',')] = 1;
            }
            else {
                this._spacesVisited[this.currentPosition.join(',')]++;
            }

            this._currentColumn += this._heading.columnHeading;
            this._currentLine += this._heading.lineHeading;
            return;
        }

        this._heading.turn90();

        if (this._recursive) {
            this.testForLoop();
        }
        
        this.move();
    }

    get revisitLimitReached() {
        return Object.values(this._spacesVisited).some(c => c > this._revisitLimit);
    }

    get spacesVisited() {
        return this._spacesVisited;
    }

    public testForLoop() {
        this._heading.turn180();
        this.move();
        this._heading.turn180();
        
        const crawler = new MapCrawler(this._mapString, { column: this._currentColumn, heading: this._heading, line: this._currentLine, recursive: false });
        while (crawler.guardInArea && !crawler.revisitLimitReached) {
            crawler.move();
        }

        if (crawler.loops.length > 0) {
            this._loops.push([this._currentLine, this._currentColumn]);
        }
    }
}

enum Direction {
    Down,
    Left,
    Up,
    Right,
}

const crawler = new MapCrawler(input);
while (crawler.guardInArea && !crawler.revisitLimitReached) {
    crawler.move();
}

console.log('Spaces Visited:', Object.values(crawler.spacesVisited).reduce((p, c) => p + c, 0));
console.log('Loops Found:', crawler.loops.length);