import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(
  path.resolve(process.cwd(), './day/01/input.txt'),
  'utf-8'
);

const findMostCalories = (bestOf = 1) => {
  const calories = input.split('\n');

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
    .slice(-1 * bestOf)
    .reduce((sum, cal) => (sum += cal), 0);

  console.log(mostCalories);
};

findMostCalories(1);
findMostCalories(3);
