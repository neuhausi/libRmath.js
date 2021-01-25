import * as fs from 'fs';
import * as rtl from 'readline';

const matchNaN = /^(\-|\+)?NaN$/i;
const matchInf = /^(\-|\+)?Inf$/i;

export function loadData(fullPath: string, sep = /,/, ...columns: number[]) {
    let resolve: (d?: any) => void;

    const reader = rtl.createInterface({
        input: fs.createReadStream(fullPath, { encoding: 'utf8' }),
    });
    const lines: string[] = [];
    reader.on('line', (input: string) => {
        if (input[0] === '#') {
            return;
        }
        if ('\r\n\t'.includes(input)) {
            return false;
        }
        if (!input) {
            return false;
        }
        lines.push(input);
    });
    reader.on('close', () => {
        const result = Array.from({ length: columns.length }).map(() => new Float64Array(lines.length));
        // create xy array of Float64Array
        lines.forEach((v, i) => {
            const cols = v.split(sep).filter((f) => f);
            for (let j = 0; j < columns.length; j++) {
                if (columns[j] >= cols.length) {
                    continue;
                }
                const tps = result[j];
                const _vs = cols[columns[j]];
                if (_vs.match(matchNaN)) {
                    tps[i] = NaN;
                    continue;
                }
                const rc = _vs.match(matchInf);
                if (rc) {
                    if (rc[1] === '-') {
                        tps[i] = -Infinity;
                    } else {
                        tps[i] = Infinity;
                    }
                    continue;
                }
                tps[i] = parseFloat(_vs);
            }
        });
        resolve(result);
    });
    return new Promise<Float64Array[]>((_resolve) => {
        resolve = _resolve;
    });
}
