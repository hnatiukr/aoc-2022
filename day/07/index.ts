import { readInput } from '../../utils.js';

type FileNode = {
    name: string;
    size: number;
    type: 'file';
    parent: DirectoryNode;
};

type DirectoryNode = {
    name: string;
    type: 'directory';
    parent: DirectoryNode | null;
    children: Node[];
};

type Node = FileNode | DirectoryNode;

function createTree(lines: string[]) {
    const tree: DirectoryNode = {
        name: '/',
        type: 'directory',
        parent: null,
        children: [],
    };

    let currentNode = tree;
    let currentCommand = null;

    for (const line of lines) {
        if (line[0] === '$') {
            const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line);

            if (!match || !match.groups) {
                throw ReferenceError('Command match error');
            }

            currentCommand = match.groups.command;

            if (currentCommand === 'cd') {
                const target = match.groups.arg;

                switch (target) {
                    case '/':
                        currentNode = tree;

                        break;

                    case '..':
                        if (currentNode.parent) {
                            currentNode = currentNode.parent;
                        }

                        break;

                    default:
                        const findTarget = currentNode.children.find(
                            (folder) => folder.type === 'directory' && folder.name === target,
                        ) as DirectoryNode;

                        if (findTarget) {
                            currentNode = findTarget;
                        }
                }
            }
        } else {
            if (currentCommand === 'ls') {
                const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line);

                if (fileMatch) {
                    if (!fileMatch.groups) {
                        throw ReferenceError('File match error');
                    }

                    const node: FileNode = {
                        name: fileMatch.groups.name,
                        size: parseInt(fileMatch.groups.size),
                        type: 'file',
                        parent: currentNode,
                    };

                    currentNode.children.push(node);
                }
                const dirMatch = /^dir (?<name>.+)$/.exec(line);

                if (dirMatch) {
                    if (!dirMatch.groups) {
                        throw ReferenceError('Directory match error');
                    }

                    const node: DirectoryNode = {
                        name: dirMatch.groups.name,
                        type: 'directory',
                        parent: currentNode,
                        children: [],
                    };

                    currentNode.children.push(node);
                }
            } else {
                throw new Error('Unknown state');
            }
        }
    }

    return tree;
}

function getSize(node: Node, callback?: (directorySize: number) => void) {
    if (node.type === 'file') {
        return node.size;
    }

    const directorySize: number = node.children
        .map((child) => getSize(child, callback))
        .reduce((a, b) => a + b, 0);

    callback?.(directorySize);

    return directorySize;
}

//

function part1(tree: Node): void {
    const thresholdSize = 100000;

    let sumSmallFolder = 0;

    getSize(tree, (size) => {
        if (size < thresholdSize) {
            sumSmallFolder += size;
        }
    });

    console.log(sumSmallFolder);
}

function part2(tree: Node): void {
    const totalDiskSpace = 70000000;
    const requiredSpace = 30000000;

    const usedSpace = getSize(tree);
    const availableSpace = totalDiskSpace - usedSpace;
    let sizeToDelete = 0;

    if (availableSpace > requiredSpace) {
        console.log(sizeToDelete);

        return;
    }

    const minimumFolderSize = requiredSpace - availableSpace;
    const candidates: number[] = [];

    getSize(tree, (size) => {
        if (size >= minimumFolderSize) {
            candidates.push(size);

            return;
        }
    });

    sizeToDelete = candidates.sort((a, b) => a - b)[0];

    console.log(sizeToDelete);
}

//

const history = readInput('07');
const tree = createTree(history);

part1(tree);
part2(tree);
