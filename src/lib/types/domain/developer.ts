import type Prisma from "@prisma/client";
import { z } from "zod";

export type DeveloperDropdownItem = Pick<Prisma.Developer, "id" | "label">
