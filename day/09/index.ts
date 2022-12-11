import { readInput, match } from '../../utils.js';

//

enum Direction {
    'U' = 'U',
    'D' = 'D',
    'R' = 'R',
    'L' = 'L',
}

type Coordinate = number;

type Point = { x: Coordinate; y: Coordinate };

type StringifyPoint = `${Coordinate}-${Coordinate}`;

type Move = {
    direction: Direction;
    steps: number;
};

//

function makeMove(move: string): Move {
    const [direction, steps] = move.split(' ');

    return {
        direction,
        steps: Number(steps),
    } as Move;
}

function makeRope(length: number): Point[] {
    return [...Array(length).keys()].map(() => ({ x: 0, y: 0 }));
}

function stringifyPoint(point: Point): StringifyPoint {
    return `${point.x}-${point.y}`;
}

function moveHead(rope: Point[], direction: Direction): void {
    const head = rope[0];

    match(direction)({
        [Direction.U]: () => (head.y += 1),
        [Direction.D]: () => (head.y -= 1),
        [Direction.R]: () => (head.x += 1),
        [Direction.L]: () => (head.x -= 1),
    });

    rope[0] = head;
}

function moveTail(rope: Point[]): void {
    for (let i = 1; i < rope.length; i += 1) {
        const head = rope[i - 1];
        const tail = rope[i];

        const offset = Math.abs(head.x - tail.x) + Math.abs(head.y - tail.y);

        if (head.x === tail.x || head.y === tail.y) {
            if (offset < 2) {
                return;
            }

            if (head.x > tail.x) {
                tail.x += 1;
            }

            if (head.x < tail.x) {
                tail.x -= 1;
            }

            if (head.y > tail.y) {
                tail.y += 1;
            }

            if (head.y < tail.y) {
                tail.y -= 1;
            }
        } else {
            if (offset < 3) {
                return;
            }

            if (head.x > tail.x && head.y > tail.y) {
                tail.x += 1;
                tail.y += 1;
            } else if (head.x < tail.x && head.y < tail.y) {
                tail.x -= 1;
                tail.y -= 1;
            } else if (head.x > tail.x && head.y < tail.y) {
                tail.x += 1;
                tail.y -= 1;
            } else {
                tail.x -= 1;
                tail.y += 1;
            }
        }

        rope[i] = tail;
    }
}

function walkAlongRopeBridge(moves: Move[], rope: Point[]): void {
    const uniquePoints = new Set<StringifyPoint>();

    for (let { direction, steps } of moves) {
        while (steps > 0) {
            moveHead(rope, direction);
            moveTail(rope);

            uniquePoints.add(stringifyPoint(rope[rope.length - 1]));

            steps -= 1;
        }
    }

    console.log(uniquePoints.size);
}

//

const moves = readInput('09').map(makeMove);

const part1 = () => walkAlongRopeBridge(moves, makeRope(2));
const part2 = () => walkAlongRopeBridge(moves, makeRope(10));

part1();
part2();
