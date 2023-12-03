// Extract V8 ByteCode from a `.jsc` file

import { readFileSync } from 'fs';
import { ByteCode } from './bytecode';

const file = process.argv[2];
const bytecode = readFileSync(file);
const bc = new ByteCode(bytecode);

console.log(bc.getHeader())
