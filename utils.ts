import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

export const readInput = (day: string): string[] => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const dirPath = `${__dirname}/day/${day}`;
    const input = readFileSync(resolve(dirPath, 'input.txt'), 'utf-8');

    return input.replace(/\r/g, '').trim().split('\n');
};

export const match = (value: string): (<Value>(matchers: Record<string, () => Value>) => Value) => {
    return (matchers) => {
        const match = matchers[value];

        if (match === undefined) {
            throw ReferenceError(`Unknown matcher's value: ${value}`);
        }

        return match();
    };
};
