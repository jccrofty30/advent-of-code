const input = ``;

const {list1, list2} = input.split(`\n`).reduce((p, c) => {
    const [sheet1, sheet2] = c.split(/\s+/);
    p.list1.push(parseInt(sheet1, 10));
    p.list2.push(parseInt(sheet2, 10));
    return p;
}, { list1: [], list2: [], } as { list1: number[]; list2: number[]; });

list1.sort();
list2.sort();

const diff = list1.reduce((p, c, ix) => {
    return p + Math.abs(c - list2[ix]);
}, 0);

console.log(diff);