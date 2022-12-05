import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readInput = (day: string): string => {
  const inputDirectory = `${__dirname}/day/${day}`;

  return readFileSync(resolve(inputDirectory, 'input.txt'), 'utf-8');
};
