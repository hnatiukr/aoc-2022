import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

type Format = 'lines' | 'plain';

export function readInput(day: string): string[];
export function readInput(day: string, format: Format): string;
export function readInput(day: string, format?: Format): string[] | string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const dirPath = `${__dirname}/day/${day}`;
    const input = readFileSync(resolve(dirPath, 'input.txt'), 'utf-8').replace(/\r/g, '').trim();

    if (format === 'plain') {
        return input;
    }

    return input.split('\n');
}

export const match = (value: string): (<Value>(matchers: Record<string, () => Value>) => Value) => {
    return (matchers) => {
        const match = matchers[value];

        if (match === undefined) {
            throw ReferenceError(`Unknown matcher's value: ${value}`);
        }

        return match();
    };
};
