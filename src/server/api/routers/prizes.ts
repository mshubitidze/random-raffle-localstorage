import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const prizesRouter = createTRPCRouter({
  getAllAvailablePrizes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.prize.findMany();
  }),
  updatePrizesCountById: publicProcedure
    .input(z.object({ id: z.string(), count: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.prize.update({
        where: {
          id: input.id,
        },
        data: {
          count: input.count,
        },
      });
    }),
});
