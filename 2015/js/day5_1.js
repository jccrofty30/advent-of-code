const input = ``;

const args = process.argv.slice(2).reduce((p,c) => {
    const [key, value] = c.split('=');

    return {
        ...p,
        [key.replace(/--/, '')]: value || true,
    }
}, {});

const solve = () => {
    const strings = input.split(/\n/);
    const nice = strings.reduce((p, str) => {
        if (
            (/(.)\1/g.test(str))
            && (/^(?=(?:.*[aeiou]){3,}).*$/i.test(str))
            && (/^(?!.*(?:ab|cd|pq|xy)).*$/.test(str))
        ) {
            if (args.verbose) {
                console.log(str);
            }
            
            return p + 1;
        }

        return p;
    }, 0);

    console.log(nice);
};

solve();