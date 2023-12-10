import type { StorefrontType } from "$types/enums/storefrontType";
import type Prisma from '@prisma/client';

export type StorefrontDropdownItem = Pick<Prisma.Storefront, 'id' | 'name'> & { Type: { name: StorefrontType } };
