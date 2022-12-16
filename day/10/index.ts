import { readInput } from '../../utils.js';

type Register = number;

enum Pixel {
    Lit = '#',
    Dark = '.',
}

function makeCycles(instructions: string[]): Register[] {
    const cycles: Register[] = [];

    for (const instruction of instructions) {
        const [, register] = instruction.split(' ');

        cycles.push(0);

        if (register) {
            cycles.push(Number.parseInt(register));
        }
    }

    return cycles;
}

function isCircuit(cycles: number[], cycle: number): boolean {
    return cycles.includes(cycle);
}

namespace Row {
    export function makeDefault(length: number): Pixel[] {
        return [...Array(length).keys()].map((pixel, index) => {
            return index < 3 ? Pixel.Lit : Pixel.Dark;
        });
    }

    export function update(spriteRow: Pixel[], x: number): void {
        for (let index = 0; index < spriteRow.length; index += 1) {
            spriteRow[index] = Pixel.Dark;

            spriteRow[x - 1] = Pixel.Lit;
            spriteRow[x] = Pixel.Lit;
            spriteRow[x + 1] = Pixel.Lit;
        }
    }

    export function stringify(spriteRow: Pixel[]): string {
        return spriteRow.join('');
    }
}

//

function part1(registers: Register[]) {
    const signalStrengths: number[] = [];

    let X = 1;

    registers.forEach((register, tik) => {
        const cycle = tik + 1;

        if (isCircuit([20, 60, 100, 140, 180, 220], cycle)) {
            signalStrengths.push(X * cycle);
        }

        X += register;
    });

    const sumOfSignalStrenghs = signalStrengths.reduce((sum, strength) => (sum += strength), 0);

    console.log(sumOfSignalStrenghs);
}

function part2(registers: Register[]) {
    const rowLength = 40;

    let X = 1;
    let currentRow = 0;
    let CRTrow: Pixel[] = [];
    let CRTrows: string[] = [];
    const spriteRow = Row.makeDefault(rowLength);

    registers.forEach((register, tik) => {
        CRTrow.push(spriteRow[currentRow]);

        if (register) {
            X += register;

            Row.update(spriteRow, X);
        }

        currentRow += 1;

        if (currentRow === rowLength) {
            CRTrows.push(Row.stringify(CRTrow));

            CRTrow = [];
            currentRow = 0;
        }
    });

    CRTrows.forEach((row) => console.log(row));
}

//

const instructions = readInput('10');

part1(makeCycles(instructions));
part2(makeCycles(instructions));
