const input = ``;

const solve = () => {
    const downs = input.match(/\)/g);
    const ups = input.match(/\(/g);
    console.log(ups.length - downs.length);
};

solve();