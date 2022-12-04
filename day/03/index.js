import { resolve } from 'path';
import { readFileSync } from 'fs';

const input = readFileSync(
  resolve(process.cwd(), './day/03/input.txt'),
  'utf-8'
);

const a_ZPriority = (character = 'a') => {
  const a_Z = [];

  for (let index = 'a'.charCodeAt(); index <= 'z'.charCodeAt(); index += 1) {
    a_Z.push(String.fromCharCode(index));
  }

  for (let index = 'A'.charCodeAt(); index <= 'Z'.charCodeAt(); index += 1) {
    a_Z.push(String.fromCharCode(index));
  }

  return a_Z.indexOf(character) + 1;
};

const findCommonCharacter = (...parts) => {
  const sortedByLength = parts.sort((a, b) => b.length - a.length);

  const longerPart = sortedByLength[0];
  const restParts = sortedByLength.slice(1);

  let commonCharacter;

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
      commonCharacter = item;
    }
  }

  return commonCharacter;
};

const part1 = (values = input) => {
  const rucksack = values.split('\n');

  let sumOfPriorities = 0;

  for (let index = 0; index < rucksack.length; index += 1) {
    const supply = rucksack[index];
    const first = supply.slice(0, supply.length / 2);
    const second = supply.slice(supply.length / 2);
    const commonChar = findCommonCharacter(first, second);

    sumOfPriorities += a_ZPriority(commonChar);
  }

  console.log(sumOfPriorities);
};

const part2 = (values = '') => {
  const rucksack = values.split('\n');

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
    const commonCharacter = findCommonCharacter(...groups[index]);

    sumOfPriorities += a_ZPriority(commonCharacter);
  }

  console.log(sumOfPriorities);
};

part1(input);
part2(input);
