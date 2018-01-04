const puzzle = ``; // Puzzle Input

const rows = puzzle.split(`\n`).map(row => row.split(`\t`).sort((a,b) => a - b).reverse().map(Number));

const sum = rows.reduce((p,c) => {
    let inc = 0;
    for ( const num of c ) {
        if (inc !== 0) {
            continue;
        }

        for ( const check of c ) {
            if (num === check || num % check !== 0) {
                continue;
            }

            inc = num / check;
        }
    }

    return p + inc;
}, 0);