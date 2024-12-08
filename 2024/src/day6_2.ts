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
    private _mapString: string;
    private _obstacles: [number, number][] = [];
    private _parsedMap: Array<string[]>;
    private _spacesVisited: string[] = [];

    public constructor(init: string) {
        this._mapString = init;
        this._parsedMap = init.split(`\n`).map((line, ix) => {
            if (line.indexOf('^') > -1) {
                this._currentLine = ix;
                this._currentColumn = line.indexOf('^');
                this._spacesVisited.push(this.currentPosition.join(','));
            }

            return line.split('')
        });

        this._heading = new Heading(0, -1);
    }

    get currentPosition() {
        return [this._currentLine, this._currentColumn];
    }

    get guardInArea() {
        return this._currentLine >= 0 && this._currentLine < this._parsedMap.length - 1 && this._currentColumn >= 0 && this._currentColumn < this._parsedMap[0].length - 1;
    }

    private isSpaceOpen(checkLine: number, checkCol: number) {
        return this._parsedMap[checkLine][checkCol] !== '#';
    }

    public move() {
        if (this.isSpaceOpen(this._currentLine + this._heading.lineHeading, this._currentColumn + this._heading.columnHeading)) {
            if (this._spacesVisited.indexOf(this.currentPosition.join(',')) === -1) {
                this._spacesVisited.push(this.currentPosition.join(','));
            }

            this._currentColumn += this._heading.columnHeading;
            this._currentLine += this._heading.lineHeading;
            return;
        }
        else {
            this._obstacles.push([this._currentLine + this._heading.lineHeading, this._currentColumn + this._heading.columnHeading]);
        }

        this._heading.turn90();
        this.move();
    }

    get obstacles() {
        return this._obstacles;
    }

    get spacesVisited() {
        return this._spacesVisited;
    }
}

enum Direction {
    Down,
    Left,
    Up,
    Right,
}

const crawler = new MapCrawler(input);
while (crawler.guardInArea) {
    crawler.move();
}

console.log(crawler.obstacles);
console.log(crawler.spacesVisited.length);