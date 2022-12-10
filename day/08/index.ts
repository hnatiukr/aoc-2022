import { readInput } from '../../utils.js';

type Height = number;

type Grid = Height[][];

type Coordinate = number;

type Point = {
    x: Coordinate;
    y: Coordinate;
};

type StringifyPoint = `${Coordinate}-${Coordinate}`;

//

function addVisibleToSet(point: Point, visibleSet: Set<StringifyPoint>) {
    visibleSet.add(`${point.y}-${point.x}`);
}

function checkLine(
    pointA: Point,
    pointB: Point,
    grid: Grid,
    visibleSet: Set<StringifyPoint>,
): void {
    addVisibleToSet(pointA, visibleSet);

    let maximum = grid[pointA.y][pointA.x];

    while (true) {
        pointA.y += pointB.y;
        pointA.x += pointB.x;

        if (
            pointA.y < 0 ||
            pointA.y >= grid.length ||
            pointA.x < 0 ||
            pointA.x >= grid[pointA.y].length
        ) {
            break;
        }

        if (grid[pointA.y][pointA.x] > maximum) {
            maximum = grid[pointA.y][pointA.x];

            addVisibleToSet(pointA, visibleSet);
        }
    }
}

function checkLine2(pointA: Point, pointB: Point, grid: Grid): number {
    let visibleCount = 0;
    let maximum = grid[pointA.y][pointA.x];

    while (true) {
        pointA.y += pointB.y;
        pointA.x += pointB.x;
        if (
            pointA.y < 0 ||
            pointA.y >= grid.length ||
            pointA.x < 0 ||
            pointA.x >= grid[pointA.y].length
        ) {
            break;
        }

        visibleCount += 1;

        if (grid[pointA.y][pointA.x] >= maximum) {
            break;
        }
    }

    return visibleCount;
}

function part1(grid: Grid) {
    const visibleSet = new Set<StringifyPoint>();

    for (let i = 0; i < grid[0].length; i += 1) {
        checkLine({ y: 0, x: i }, { y: 1, x: 0 }, grid, visibleSet);
        checkLine({ y: grid.length - 1, x: i }, { y: -1, x: 0 }, grid, visibleSet);
    }

    for (let i = 0; i < grid.length; i += 1) {
        checkLine({ y: i, x: 0 }, { y: 0, x: 1 }, grid, visibleSet);
        checkLine({ y: i, x: grid[0].length - 1 }, { y: 0, x: -1 }, grid, visibleSet);
    }

    console.log(visibleSet.size);
}

function part2(grid: Grid) {
    let max = 0;

    for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
            const score =
                checkLine2({ y, x }, { y: -1, x: 0 }, grid) *
                checkLine2({ y, x }, { y: 1, x: 0 }, grid) *
                checkLine2({ y, x }, { y: 0, x: 1 }, grid) *
                checkLine2({ y, x }, { y: 0, x: -1 }, grid);

            if (score > max) {
                max = score;
            }
        }
    }

    console.log(max);
}

const input = readInput('08');
const grid = input.map((line) => [...line].map(Number));

part1(grid);
part2(grid);
