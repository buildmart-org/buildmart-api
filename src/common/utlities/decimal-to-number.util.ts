import { Decimal } from '@prisma/client/runtime/client';

export function decimalToNumber(value: Decimal): number {
    return value.toNumber();
}
