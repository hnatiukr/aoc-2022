import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(
  path.resolve(process.cwd(), './day/01/input.txt'),
  'utf-8'
);

const part1 = (values = '') => {
  const calories = values.split('\n');

  let count = 0;
  let sum = 0;

  calories.forEach((cal) => {
    if (cal) {
      count += Number.parseInt(cal);
    } else {
      if (count > sum) {
        sum = count;
      }

      count = 0;
    }
  });

  console.log(sum);
};

const part2 = (values = '') => {
  const calories = values.split('\n');

  let count = 0;
  const top = [];

  calories.forEach((cal) => {
    if (cal) {
      count += Number.parseInt(cal);
    } else {
      top.push(count);

      count = 0;
    }
  });

  const mostCalories = top
    .sort()
    .slice(-1 * 3)
    .reduce((sum, cal) => (sum += cal), 0);

  console.log(mostCalories);
};

part1(input);
part2(input);
