import { readInput } from '../../utils.js';

type Calories = string[];

function part1(calories: Calories): void {
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
}

function part2(calories: Calories): void {
  let count = 0;

  const top: Array<number> = [];

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
}

const input = readInput('01');
const calories: Calories = input.split('\n');

part1(calories);
part2(calories);
