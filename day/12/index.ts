import { readInput } from '../../utils.js';

//

type Coordinate = number;

type StringifyCoordinates = `${Coordinate}-${Coordinate}`;

type Point = {
    x: Coordinate;
    y: Coordinate;
    e: Coordinate;
    steps: number;
};

enum Bullet {
    Start = 'S',
    End = 'E',
}

//

function makePoint(x = 0, y = 0, e = 0): Point {
    return { x, y, e, steps: 0 };
}

function stringifyCoordinates(point: Point): StringifyCoordinates {
    return `${point.x}-${point.y}`;
}

function charCodeFrom(letter: string): number {
    return letter.charCodeAt(0);
}

//

function part1(input: string): number {
    let start = makePoint();
    let end = makePoint();

    const maze: Point[][] = input.split('\n').map((line, y) => {
        return line.split('').map((cell, x) => {
            if (cell === Bullet.Start) {
                start = makePoint(x, y, charCodeFrom('a'));

                return start;
            }

            if (cell === Bullet.End) {
                end = makePoint(x, y, charCodeFrom('z'));

                return end;
            }

            return makePoint(x, y, charCodeFrom(cell));
        });
    });

    const queue: Point[] = [{ ...start, steps: 0 }];
    const visited = new Set<StringifyCoordinates>();

    visited.add(stringifyCoordinates(start));

    while (queue.length > 0) {
        const current = queue.shift()!;

        if (current.x === end.x && current.y === end.y) {
            return current.steps;
        }

        const neighbors = [
            maze[current.y - 1] && maze[current.y - 1][current.x],
            maze[current.y + 1] && maze[current.y + 1][current.x],
            maze[current.y][current.x - 1],
            maze[current.y][current.x + 1],
        ]
            .filter((cell) => cell && !visited.has(stringifyCoordinates(cell)))
            .filter((cell) => cell.e - current.e <= 1)
            .map((cell) => ({ ...cell, steps: current.steps + 1 }));

        neighbors.forEach((cell) => visited.add(stringifyCoordinates(cell)));

        queue.push(...neighbors);
    }

    return Infinity;
}

function part2(input: string) {
    const stringifyInput = input.replace(Bullet.Start, 'a');

    let min = Infinity;

    const matchedStarts = stringifyInput.matchAll(/a/g);

    for (const { index } of matchedStarts) {
        if (index) {
            const first = stringifyInput.slice(0, index);
            const second = stringifyInput.slice(index + 1);
            const insertStartBullet = `${first}${Bullet.Start}${second}`;

            const result = part1(insertStartBullet);

            min = Math.min(result, min);
        }
    }

    return min;
}

//

const input = readInput('12', 'plain') as string;

console.log(part1(input));
console.log(part2(input));
