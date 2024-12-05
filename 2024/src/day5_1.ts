const input = ``;

interface IParsed {
    orderingRules: {
        [key: string]: string[];
    };
    pageLists: string[];
}

const {orderingRules = {}, pageLists = []}: IParsed = input.split(`\n\n`).reduce((prev, part, ix) => {
    if (ix === 0) {
        return {
            ...prev,
            orderingRules: part.split(`\n`).reduce((p, c) => {
                const [rule, condition] = c.split('|');
                return {
                    ...p,
                    [rule]: [
                        ...(p[rule] || []),
                        condition,
                    ],
                };
            }, {} as IParsed["orderingRules"]),
        };
    }

    return {
        ...prev,
        pageLists: part.split(`\n`),
    };
}, {} as IParsed);

const validPageLists = pageLists.filter(list => {
    const pagesReversed = list.split(',').reverse();
    return !pagesReversed.some((page, ix, arr) => {
        return arr.reduce((prev, check, checkIx) => {
            if (checkIx <= ix) {
                return prev;
            }

            return prev || (orderingRules[page] || []).indexOf(check) > -1;
        }, false);
    });
});

const sum = validPageLists.reduce((prev, list) => {
    const pages = list.split(',');
    return prev + parseInt(pages[Math.ceil(pages.length / 2) - 1], 10);
}, 0);

console.log(sum);