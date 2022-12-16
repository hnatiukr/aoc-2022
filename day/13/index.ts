import { readInput } from '../../utils.js';

type Pocket = Array<number> | Array<number | Pocket>;

//

function check(a: Pocket, b: Pocket): number {
    for (let i = 0; i < a.length && i < b.length; i += 1) {
        if (typeof a[i] === 'number' && typeof b[i] === 'number') {
            if (a[i] !== b[i]) {
                return (a[i] as number) - (b[i] as number);
            }
        } else {
            const nextA = (typeof a[i] === 'number' ? [a[i]] : a[i]) as Pocket;
            const nextB = (typeof b[i] === 'number' ? [b[i]] : b[i]) as Pocket;

            const result = check(nextA, nextB);

            if (result !== 0) {
                return result;
            }
        }
    }

    return a.length - b.length;
}

//

function part1(input: string): void {
    const sumOfIndices = input
        .split('\n\n')
        .map((pair) => pair.split('\n').map((x) => JSON.parse(x) as Pocket) as [Pocket, Pocket])
        .map((pair, i) => (check(...pair) < 0 ? i + 1 : 0))
        .reduce((a, b) => a + b);

    console.log(sumOfIndices);
}

function part2(input: string): void {
    const dividers = [[[2]], [[6]]];

    const list = input
        .replaceAll('\n\n', '\n')
        .split('\n')
        .map((x) => JSON.parse(x) as Pocket)
        .concat(dividers)
        .sort((a, b) => check(a, b));

    const decoderKey = dividers.map((x) => list.indexOf(x) + 1).reduce((a, b) => a * b);

    console.log(decoderKey);
}

//

const input = readInput('13', 'plain');

part1(input);
part2(input);
