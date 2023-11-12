import type Prisma from "@prisma/client";

export type GenreDropdownItem = Pick<Prisma.Genre, "id" | "label">
