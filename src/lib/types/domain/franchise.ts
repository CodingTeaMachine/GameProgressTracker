import type Prisma from '@prisma/client';

export type FranchiseDropdownItem = Pick<Prisma.Franchise, 'id' | 'title'>;
