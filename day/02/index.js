import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(
  path.resolve(process.cwd(), './day/02/input.txt'),
  'utf-8'
);

const match = (value) => (matcher) => matcher[value]();

const part1 = (values = '') => {
  const scores = values.split('\n');

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

const part2 = (values = '') => {
  const scores = values.split('\n');

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

part1(input);
part2(input);
