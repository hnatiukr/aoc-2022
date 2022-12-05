import { readInput } from '../../utils.js';

type Rucksack = string[];

const a_ZPriority = (character: string): number => {
  const a_Z: string[] = [];

  for (let index = 'a'.charCodeAt(0); index <= 'z'.charCodeAt(0); index += 1) {
    a_Z.push(String.fromCharCode(index));
  }

  for (let index = 'A'.charCodeAt(0); index <= 'Z'.charCodeAt(0); index += 1) {
    a_Z.push(String.fromCharCode(index));
  }

  return a_Z.indexOf(character) + 1;
};

function findGenericSymbol(...parts: string[]): string {
  const sortedByLength = parts.sort((a, b) => b.length - a.length);

  const longerPart = sortedByLength[0];
  const restParts = sortedByLength.slice(1);

  let genericSymbol;

  for (let itemIndex = 0; itemIndex < longerPart.length; itemIndex += 1) {
    const item = longerPart[itemIndex];

    let expectedHits = restParts.length;

    for (let partIndex = 0; partIndex < restParts.length; partIndex += 1) {
      const part = restParts[partIndex];

      if (part.includes(item)) {
        expectedHits -= 1;
      }
    }

    if (expectedHits === 0) {
      genericSymbol = item;
    }
  }

  if (!genericSymbol) {
    throw ReferenceError('Generic symbol not defined');
  }

  return genericSymbol;
}

//

function part1(rucksack: Rucksack): void {
  let sumOfPriorities = 0;

  for (let index = 0; index < rucksack.length; index += 1) {
    const supply = rucksack[index];
    const first = supply.slice(0, supply.length / 2);
    const second = supply.slice(supply.length / 2);
    const commonChar = findGenericSymbol(first, second);

    sumOfPriorities += a_ZPriority(commonChar);
  }

  console.log(sumOfPriorities);
}

function part2(rucksack: Rucksack): void {
  const groups = [];
  let group = [];

  for (let index = 0; index < rucksack.length; index += 1) {
    const part = rucksack[index];

    if (group.length < 3) {
      group.push(part);
    }

    if (group.length === 3) {
      groups.push(group);

      group = [];
    }
  }

  let sumOfPriorities = 0;

  for (let index = 0; index < groups.length; index += 1) {
    const genericSymbol = findGenericSymbol(...groups[index]);

    sumOfPriorities += a_ZPriority(genericSymbol);
  }

  console.log(sumOfPriorities);
}

//

const input = readInput('03');
const rucksack: Rucksack = input.split('\n');

part1(rucksack);
part2(rucksack);
