const puzzle = ``; // Puzzle Input

const banks = puzzle.split(/\t/).map(Number);

let currBank = 0;
const history = [];
let runs = 0;

const nextBank = (currBank) => currBank + 1 === banks.length ? 0 : currBank + 1;

while (!history.includes(banks.join(' '))) {
    currBank = banks.indexOf(Math.max(...banks));
    history.push(banks.join(' '));
    let blocks = banks[currBank];
    banks[currBank] = 0;
    currBank = nextBank(currBank);
    while (blocks > 0) {
        banks[currBank]++;
        blocks--;
        currBank = nextBank(currBank);
    }
    runs++;
}

console.log(runs);