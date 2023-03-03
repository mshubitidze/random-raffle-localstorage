import { createTRPCRouter } from "~/server/api/trpc";
import { prizesRouter } from "./routers/prizes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  prizes: prizesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
