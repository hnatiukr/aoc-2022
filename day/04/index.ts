import { readInput } from '../../utils.js';

type AssignmentPairs = string[];

type RangeTuple = [number, number];

function makeRangeTuple(pair: string): RangeTuple {
  return pair.split('-').map((x) => Number.parseInt(x, 10)) as RangeTuple;
}

function isPairWithin([a1, a2]: RangeTuple, [b1, b2]: RangeTuple): boolean {
  return (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2);
}

function isPairOverlapped([a1, a2]: RangeTuple, [b1, b2]: RangeTuple): boolean {
  return a2 < b1 || b2 < a1 ? false : true;
}

//

function part1(assignmentPairs: AssignmentPairs): void {
  let count = 0;

  for (let index = 0; index < assignmentPairs.length; index += 1) {
    const pairs = assignmentPairs[index];
    const [tupleA, tupleB] = pairs.split(',').map(makeRangeTuple);

    if (isPairWithin(tupleA, tupleB)) {
      count += 1;
    }
  }

  console.log(count);
}

function part2(assignmentPairs: AssignmentPairs): void {
  let count = 0;

  for (let index = 0; index < assignmentPairs.length; index += 1) {
    const pairs = assignmentPairs[index];
    const [tupleA, tupleB] = pairs.split(',').map(makeRangeTuple);

    if (isPairOverlapped(tupleA, tupleB)) {
      count += 1;
    }
  }

  console.log(count);
}

//

const input = readInput('04');
const assignmentPairs = input.split('\n');

part1(assignmentPairs);
part2(assignmentPairs);
