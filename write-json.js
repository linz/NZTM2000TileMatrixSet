/* eslint-disable @typescript-eslint/no-var-requires */
const tms = require('./build/src/index');
const fs = require('fs');

fs.writeFileSync('./raw/NZTM2000.json', JSON.stringify(tms.Nztm2000, null, 2));
fs.writeFileSync('./raw/NZTM2000Quad.json', JSON.stringify(tms.Nztm2000Quad, null, 2));
