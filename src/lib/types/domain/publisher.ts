import type Prisma from "@prisma/client";

export type PublisherDropdownItem = Pick<Prisma.Publisher, "id" | "label">
