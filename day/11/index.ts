import { readInput } from '../../utils.js';

//

type Monkey = {
	processed: number;
	items: number[];
	operation: (x: number) => number;
	next: (x: number) => number;
};

//

const inputMonkeys: Monkey[] = [
	{
		processed: 0,
		items: [63, 84, 80, 83, 84, 53, 88, 72],
		operation: (x) => x * 11,
		next: (x) => (x % 13 === 0 ? 4 : 7),
	},
	{
		processed: 0,
		items: [67, 56, 92, 88, 84],
		operation: (x) => x + 4,
		next: (x) => (x % 11 === 0 ? 5 : 3),
	},
	{
		processed: 0,
		items: [52],
		operation: (x) => x * x,
		next: (x) => (x % 2 === 0 ? 3 : 1),
	},
	{
		processed: 0,
		items: [59, 53, 60, 92, 69, 72],
		operation: (x) => x + 2,
		next: (x) => (x % 5 === 0 ? 5 : 6),
	},
	{
		processed: 0,
		items: [61, 52, 55, 61],
		operation: (x) => x + 3,
		next: (x) => (x % 7 === 0 ? 7 : 2),
	},
	{
		processed: 0,
		items: [79, 53],
		operation: (x) => x + 1,
		next: (x) => (x % 3 === 0 ? 0 : 6),
	},
	{
		processed: 0,
		items: [59, 86, 67, 95, 92, 77, 91],
		operation: (x) => x + 5,
		next: (x) => (x % 19 === 0 ? 4 : 0),
	},
	{
		processed: 0,
		items: [58, 83, 89],
		operation: (x) => x * 19,
		next: (x) => (x % 17 === 0 ? 2 : 1),
	},
];

//

function copyMonkeys(monkeys: Monkey[]): Monkey[] {
	const copiedMonkeys: Monkey[] = [];

	for (const monkey of monkeys) {
		const newMonkey: Monkey = {
			processed: monkey.processed,
			items: [...monkey.items],
			operation: monkey.operation,
			next: monkey.next,
		};

		copiedMonkeys.push(newMonkey);
	}

	return copiedMonkeys;
}

function processAllMonkeys(monkeys: Monkey[], getWorryLevel: (x: number) => number): void {
	monkeys.forEach((monkey) => processOneMonkey(monkey, monkeys, getWorryLevel));
}

function processOneMonkey(monkey: Monkey, monkeys: Monkey[], getWorryLevel: (x: number) => number) {
	monkey.items.forEach((item) => {
		const newItem = getWorryLevel(monkey.operation(item));
		const nextMonkey = monkeys[monkey.next(newItem)];

		nextMonkey.items.push(newItem);

		monkey.processed += 1;
	});

	monkey.items = [];
}

function multiply(a: number, b: number): number {
	return a * b;
}

function monkeyBusiness(monkeys: Monkey[]): number {
	return monkeys
		.map(({ processed }) => processed)
		.sort((a, b) => b - a)
		.slice(0, 2)
		.reduce(multiply, 1);
}

//

function part1(monkeys: Monkey[]) {
	for (let round = 1; round <= 20; round += 1) {
		processAllMonkeys(monkeys, (x) => Math.floor(x / 3));
	}

	console.log(monkeyBusiness(monkeys));
}

function part2(monkeys: Monkey[]) {
	const divider = [2, 3, 5, 7, 11, 13, 17, 19].reduce(multiply, 1); // values from the 'divisible by'

	for (let round = 1; round <= 10000; round += 1) {
		processAllMonkeys(monkeys, (x) => x % divider);
	}

	console.log(monkeyBusiness(monkeys));
}

//

// const input = readInput('11');

part1(copyMonkeys(inputMonkeys));
part2(copyMonkeys(inputMonkeys));
