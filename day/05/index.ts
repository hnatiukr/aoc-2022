import { readInput } from '../../utils.js';

type Stacks = Record<string, string[]>;

type Task = [count: string, from: string, to: string];

function makeStacks(matrix: string[]): Stacks {
  const vectors = [];

  for (let i = 0; i < matrix[0].length; i += 1) {
    const vector = [];

    for (let j = matrix.length - 2; j >= 0; j -= 1) {
      if (matrix[j][i].trim()) {
        vector.push(matrix[j][i]);
      }
    }

    if (/[A-Z]/.test(vector.join(''))) {
      vectors.push(vector);
    }
  }

  const stacks: Stacks = {};

  for (let i = 0; i < vectors.length; i += 1) {
    stacks[i + 1] = vectors[i];
  }

  return stacks;
}

function makeTask(procedure: string): Task {
  const matches = procedure.match(/\d+/g);

  if (!matches || matches.length !== 3) {
    throw new ReferenceError('Incorrect number of found values in matching');
  }

  return [...matches] as Task;
}

function findTop(stacks: Stacks): string {
  return Object.values(stacks).reduce(
    (acc, stack) => (acc += stack[stack.length - 1]),
    ''
  );
}

//

function part1(startingStacks: string[], procedures: string[]): void {
  const stacks = makeStacks(startingStacks);

  procedures.forEach((procedure) => {
    const [count, from, to] = makeTask(procedure);

    for (let index = 0; index < Number.parseInt(count); index += 1) {
      const crate = stacks[from].pop();

      if (crate) {
        stacks[to].push(crate);
      }
    }
  });

  const top = findTop(stacks);

  console.log(top);
}

function part2(startingStacks: string[], procedures: string[]): void {
  const stacks = makeStacks(startingStacks);

  procedures.forEach((procedure) => {
    const [count, from, to] = makeTask(procedure);

    const crates = [];

    for (let index = 0; index < Number.parseInt(count); index += 1) {
      const crate = stacks[from].pop();

      if (crate) {
        crates.unshift(crate);
      }
    }

    stacks[to] = stacks[to].concat(crates);
  });

  const top = findTop(stacks);

  console.log(top);
}

//

const input = readInput('05');

const [inputStacks, inputProcedures] = input
  .split('\n\n')
  .map((line) => line.split('\n'));

part1(inputStacks, inputProcedures);
part2(inputStacks, inputProcedures);
