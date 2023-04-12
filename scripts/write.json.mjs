import * as tms from '../build/src/index.js';
import { writeFileSync } from 'fs';

writeFileSync('./raw/NZTM2000.json', JSON.stringify(tms.Nztm2000, null, 2));
writeFileSync('./raw/NZTM2000Quad.json', JSON.stringify(tms.Nztm2000Quad, null, 2));
