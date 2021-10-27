'use strict';
/* This is a conversion from libRmath.so to Typescript/Javascript
Copyright (C) 2018  Jacob K.F. Bogers  info@mail.jacob-bogers.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
import { debug } from 'debug';
const printer = debug('punif');

import { ML_ERR_return_NAN } from '@common/logger';
import { R_D_val, R_DT_0, R_DT_1 } from '@lib/r-func';

export function punif(x: number, a = 0, b = 1, lowerTail = true, logP = false): number {
    if (isNaN(x) || isNaN(a) || isNaN(b))
    {
        return x + a + b;
    }

    if (b < a)
    {
        return ML_ERR_return_NAN(printer);
    }

    if (!isFinite(a) || !isFinite(b))
    {
        return ML_ERR_return_NAN(printer);
    }

    if (x >= b)
    {
        return R_DT_1(lowerTail, logP);
    }

    if (x <= a)
    {
        return R_DT_0(lowerTail, logP);
    }

    const dnom = 1 / (b - a);

    if (lowerTail)
    {
        return R_D_val(logP, x * dnom - a * dnom)
    }

    return R_D_val(logP, b * dnom - x * dnom);
}