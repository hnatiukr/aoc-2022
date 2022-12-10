import { readInput, match } from '../../utils.js';

type Scores = string[];

const part1 = (scores: Scores) => {
    let total = 0;

    for (let index = 0; index < scores.length; index += 1) {
        match(scores[index])({
            'A X': () => (total += 3),
            'A Y': () => (total += 6),
            'A Z': () => (total += 0),
            'B X': () => (total += 0),
            'B Y': () => (total += 3),
            'B Z': () => (total += 6),
            'C X': () => (total += 6),
            'C Y': () => (total += 0),
            'C Z': () => (total += 3),
        });

        match(scores[index][2])({
            X: () => (total += 1),
            Y: () => (total += 2),
            Z: () => (total += 3),
        });
    }

    console.log(total);
};

const part2 = (scores: Scores) => {
    let total = 0;

    for (let index = 0; index < scores.length; index += 1) {
        match(scores[index])({
            'A X': () => (total += 3),
            'A Y': () => (total += 1),
            'A Z': () => (total += 2),
            'B X': () => (total += 1),
            'B Y': () => (total += 2),
            'B Z': () => (total += 3),
            'C X': () => (total += 2),
            'C Y': () => (total += 3),
            'C Z': () => (total += 1),
        });

        match(scores[index][2])({
            X: () => (total += 0),
            Y: () => (total += 3),
            Z: () => (total += 6),
        });
    }

    console.log(total);
};

const scores = readInput('02');

part1(scores);
part2(scores);
