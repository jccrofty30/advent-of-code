const puzzle = ``; // Puzzle Input

const markers = puzzle.split('');

const openers = [];

let groups = 0;

let inGarbage = false;
for (let i = 0; i < markers.length; i++) {
    const currMarker = markers[i];

    switch (currMarker) {
        case '!':
            i++;
            continue;
        case '<':
            inGarbage = true;
            break;
        case '{':
            if (inGarbage) {
                continue;
            }
            openers.push(currMarker);
            break;
        case '>':
            inGarbage = false;
            break;
        case '}':
            if (inGarbage || openers.length === 0) {
                continue;
            }
            openers.pop();
            groups += openers.length + 1;
            break;
    }
}

console.log(groups);