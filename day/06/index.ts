import { readInput } from '../../utils.js';

function countCharsToFirstMatch(buffer: string, requiredLength: number) {
  for (let index = 0; index <= buffer.length - requiredLength; index += 1) {
    const candidate = [];

    for (let position = 0; position < requiredLength; position += 1) {
      candidate.push(buffer[index + position]);
    }

    if (new Set(candidate).size === candidate.length) {
      return index + requiredLength;
    }
  }
}

//

function part1(buffer: string, requiredLength: number) {
  const charactersCount = countCharsToFirstMatch(buffer, requiredLength);

  console.log(charactersCount);
}

function part2(buffer: string, requiredLength: number) {
  const charactersCount = countCharsToFirstMatch(buffer, requiredLength);

  console.log(charactersCount);
}

//

const input = readInput('06');

part1(input, 4);
part2(input, 14);
