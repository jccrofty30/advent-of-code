const input = ``;

const ops = input.split(/\n/);
let point = 50;
let zeros = 0;
ops.forEach((op) => {
    const direction = op.replace(/\d/g, '') == 'L' ? -1 : 1;
    const change = Number(op.replace(/\D/g, ''));
    point += change * direction;
    if (point > 99) {
        while (point > 99) {
            point -= 100;
        }
    }
    else if (point < 0) {
        while (point < 0) {
            point += 100;
        }
    }

    zeros += point === 0 ? 1 : 0;
    console.log(op, point);
});

console.log(zeros);