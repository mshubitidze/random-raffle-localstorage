import type { Prize } from "@prisma/client";
// import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const prizesRouter = createTRPCRouter({
  getARandomPrizeFromAvailable: publicProcedure.query(
    async ({ ctx }): Promise<string | Prize> => {
      const prize = await ctx.prisma.$transaction(async (prisma) => {
        const winningPrizesLeftCount = await prisma.prize.count({
          where: { isWinning: true, isWon: false },
        });

        if (winningPrizesLeftCount === 0) {
          return "No prizes left, raffle over";
        }

        const prize = await prisma.$queryRaw<Prize[]>`
          SELECT * FROM Prize
          WHERE isWon = false
          AND EXISTS (SELECT * FROM Prize WHERE isWinning = true)
          ORDER BY RAND()
          LIMIT 1
          FOR UPDATE
        `;

        if (!prize[0]) {
          throw new Error("There was an error fetching a prize");
        }

        if (prize[0].promoCode.slice(0, 4) === "LOSS") {
          return prize[0];
        }

        const updatedPrize = await prisma.prize.update({
          where: { id: prize[0].id },
          data: { isWon: true },
        });

        return updatedPrize;
      });

      if (!prize) {
        throw new Error("No prize was fetched or updated");
      }

      return prize;
    }
  ),
});
