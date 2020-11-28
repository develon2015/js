import * as fs from 'fs';
import * as path from 'path';
import * as node from './node';

let buffer = fs.readFileSync(path.resolve(__dirname, 'utf-16be.txt'));

let s = node.decode.openUTF8(buffer, 'utf-16be');
console.log(s);
