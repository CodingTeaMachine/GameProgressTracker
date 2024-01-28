import type Prisma from "@prisma/client";

export type DeveloperDropdownItem = Pick<Prisma.Developer, "id" | "label">
