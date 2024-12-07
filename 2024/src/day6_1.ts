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

class MapCrawler {
    private _currentDirection: Direction = Direction.Up;
    private _currentLine: number;
    private _currentCol: number;
    private _mapString: string;
    private _parsedMap: Array<string[]>;
    private _spacesVisited: string[] = [];

    public constructor(init: string) {
        this._mapString = init;
        this._parsedMap = init.split(`\n`).map((line, ix) => {
            if (line.indexOf('^') > -1) {
                this._currentLine = ix;
                this._currentCol = line.indexOf('^');
                this._spacesVisited.push(this.currentPosition.join(','));
            }

            return line.split('')
        });
    }

    get currentPosition() {
        return [this._currentLine, this._currentCol];
    }

    get guardInArea() {
        return this._currentLine >= 0 && this._currentLine < this._parsedMap.length - 1 && this._currentCol >= 0 && this._currentCol < this._parsedMap[0].length - 1;
    }

    private isSpaceOpen(checkLine: number, checkCol: number) {
        return this._parsedMap[checkLine][checkCol] !== '#';
    }

    public move() {
        const [lineDir, colDir] = this.parseDirection();
        if (this.isSpaceOpen(this._currentLine + lineDir, this._currentCol + colDir)) {
            if (this._spacesVisited.indexOf(this.currentPosition.join(',')) === -1) {
                this._spacesVisited.push(this.currentPosition.join(','));
            }
            this._currentCol += colDir;
            this._currentLine += lineDir;
            return;
        }

        this._currentDirection = turn90(this._currentDirection);
        this.move();
    }

    private parseDirection() {
        return this._currentDirection.split(',').map(i => parseInt(i, 10));
    }

    get spacesVisited() {
        return this._spacesVisited;
    }
}

enum Direction {
    Down = '1,0',
    Left = '0,-1',
    Up = '-1,0',
    Right = '0,1',
}

const turn90 = (currDir: Direction): Direction => {
    switch (currDir) {
        case Direction.Down:
            return Direction.Left;
        case Direction.Left:
            return Direction.Up;
        case Direction.Up:
            return Direction.Right;
        case Direction.Right:
        default:
            return Direction.Down;
    }
};

const crawler = new MapCrawler(input);
while (crawler.guardInArea) {
    crawler.move();
}

console.log(crawler.spacesVisited.length);