import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const prizesRouter = createTRPCRouter({
  getARandomPrizeFromAvailable: publicProcedure.query(async ({ ctx }) => {
    const available = await ctx.prisma.prize.findMany({
      where: {
        isWon: false,
      },
    });
    if (available.length === 1 && available[0]?.name === "LOSS")
      return "No Prizes Left";
    const result = available[Math.floor(Math.random() * available.length)];
    return result;
  }),
  updatePrizeStatusById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.prize.update({
        where: {
          id: input.id,
        },
        data: {
          isWon: true,
        },
      });
    }),
});
