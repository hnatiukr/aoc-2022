import { readInput } from '../../utils.js';

//

type Cave = string[][];

//

function makeCave(input: string, isFloor: boolean): Cave {
    let max = { x: 0, y: 0 };

    const rocks = input.split('\n').map((rock) => {
        return rock.split(' -> ').map((line) => {
            const [x, y] = line.split(',').map((n) => +n);

            if (x > max.x) {
                max.x = x;
            }

            if (y > max.y) {
                max.y = y;
            }

            return { x, y };
        });
    });

    const cave = new Array(max.y * 2).fill(null).map(() => new Array(max.x * 2).fill('.'));

    for (const rock of rocks) {
        for (let i = 0; i < rock.length - 1; i += 1) {
            if (rock[i].x === rock[i + 1].x) {
                const from = Math.min(rock[i].y, rock[i + 1].y);
                const to = Math.max(rock[i].y, rock[i + 1].y);

                for (let y = from; y <= to; y += 1) {
                    cave[y][rock[i].x] = '#';
                }
            } else {
                const from = Math.min(rock[i].x, rock[i + 1].x);
                const to = Math.max(rock[i].x, rock[i + 1].x);

                for (let x = from; x <= to; x += 1) {
                    cave[rock[i].y][x] = '#';
                }
            }
        }
    }
    if (isFloor) {
        cave[max.y + 2].fill('#');
    }

    return cave;
}

function drip(cave: Cave): number {
    let count = 0;
    let isResting = true;

    while (cave[0][500] === '.' && isResting) {
        let sand = { x: 500, y: 0 };

        isResting = false;

        while (cave[sand.y + 1] && !isResting) {
            if (cave[sand.y + 1][sand.x] === '.') {
                sand.y += 1;
            } else if (cave[sand.y + 1][sand.x - 1] === '.') {
                sand.y += 1;
                sand.x -= 1;
            } else if (cave[sand.y + 1][sand.x + 1] === '.') {
                sand.y += 1;
                sand.x += 1;
            } else {
                cave[sand.y][sand.x] = 'o';
                isResting = true;
                count += 1;
            }
        }
    }

    return count;
}

function part1(input: string): void {
    const cave = makeCave(input, false);
    const drippedCount = drip(cave);

    console.log(drippedCount);
}

function part2(input: string): void {
    const cave = makeCave(input, true);
    const drippedCount = drip(cave);

    console.log(drippedCount);
}

//

const input = readInput('14', 'plain');

part1(input);
part2(input);
