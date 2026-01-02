const input = ``;

const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');
    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

const solve = () => {
    const downs = input.match(/\)/g);
    const ups = input.match(/\(/g);
    console.log(ups.length - downs.length);
};

solve();