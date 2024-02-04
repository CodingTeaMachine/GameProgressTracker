import type Prisma from "@prisma/client";

export type PlatformDropdownItem = Pick<Prisma.Platform, "id" | "name">

export type ExplorePagePlatform = Pick<Prisma.Platform, "name" | "shorthand">
