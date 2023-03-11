import type { Prize } from "@prisma/client";
// import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const prizesRouter = createTRPCRouter({
  getARandomPrizeFromAvailable: publicProcedure.query(
    async ({ ctx }): Promise<string | Prize> => {
      const winningPrizesLeftCount = await ctx.prisma.prize.count({
        where: { isWinning: true, isWon: false },
      });

      if (winningPrizesLeftCount === 0) {
        return "No prizes left, raffle over";
      }

      const prize = await ctx.prisma.$queryRaw<Prize[]>`
    SELECT * FROM Prize
    WHERE isWon = false
    AND EXISTS (SELECT * FROM Prize WHERE isWinning = true)
    ORDER BY RAND()
    LIMIT 1
    FOR UPDATE
  `;

      if (prize[0]?.promoCode.slice(0, 4) === "LOSS") return prize[0];

      const updatedPrize = await ctx.prisma.prize.updateMany({
        where: { id: prize[0]?.id },
        data: { isWon: true },
      });

      const updatedPrizeId = updatedPrize?.count ? prize[0]?.id : undefined;

      const result = await ctx.prisma.prize.findUnique({
        where: { id: updatedPrizeId },
      });

      if (!result) {
        throw new Error("No prize found");
      }

      return result;
    }
  ),
});
