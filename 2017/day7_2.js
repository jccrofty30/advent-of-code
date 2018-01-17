/*
 * Pretty much all props go to: Nitroustyman (https://www.youtube.com/watch?v=B0VQTl2ai4Y)
 * This is essentially a Python to ES6 porting
 */
const puzzle = ``; // Puzzle Input

class Node {
    constructor(name, weight) {
        this.children = [];
        this.name = name;
        this.weight = weight;
    }

    addChild(child) {
        this.children.push(child);
    }

    getWeight() {
        let sum = this.weight;

        for (const childWeight of this.getChildrenWeights()) {
            sum += childWeight;
        }

        return sum;
    }

    getChildrenWeights() {
        if (this.children.length === 0) {
            return [0];
        }

        const childrenWeights = [];
        for (const child of this.children) {
            childrenWeights.push(child.getWeight());
        }

        return childrenWeights;
    }

    toString() {
        return `Name: ${this.name} -- Weight ${this.getWeight()}`;
    }
}

const main = (puzzle) => {
    const hasChildren = {};
    const lines = puzzle.split(/\n/);
    const nodes = {};

    for (const line of lines) {
        const splitLine = line.split('->');
        const name = splitLine[0].split(' ')[0];
        const weight = Number(splitLine[0].replace(/\D/g, ''));
        nodes[name] = new Node(name, weight);
        if (splitLine.length === 2) {
            hasChildren[name] = splitLine[1].trim().split(',').map(c => c.trim());
        }
    }

    for (const parentName in hasChildren) {
        const parentNode = nodes[parentName];
        for (const childName of hasChildren[parentName]) {
            parentNode.addChild(nodes[childName]);
        }
    }

    for (const node of Object.values(nodes)) {
        const childrenWeights = node.getChildrenWeights();
        if (childrenWeights.length !== 1 && (Math.max(...childrenWeights) - Math.min(...childrenWeights) !== 0)) {
            console.log(
`${JSON.stringify(node.getChildrenWeights())}
Difference: ${Math.max(...childrenWeights) - Math.min(...childrenWeights)}
**********************
${node}
Children:
${node.children.map(c => `\t${c}`).join(`\n`)}

`
            );
        }
    }
};

main(puzzle);