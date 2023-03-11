import type { Prize } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const prizesRouter = createTRPCRouter({
  getARandomPrizeFromAvailable: publicProcedure.query(
    async ({ ctx }): Promise<string | Prize> => {
      const winningPrizesCount = await ctx.prisma.prize.count({
        where: { isWinning: true, isWon: false },
      });

      if (winningPrizesCount === 0) {
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

      const updatedPrize = await ctx.prisma.prize.updateMany({
        where: { id: prize[0]?.id },
        data: { isWon: true },
      });

      const updatedPrizeId = updatedPrize?.count ? prize[0]?.id : undefined;

      if (!updatedPrizeId) return "dikh";

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
// const randomPrize: Prize[] = await ctx.prisma
//   .$queryRaw`SELECT * FROM Prize WHERE isWon = false AND EXISTS (SELECT * FROM Prize WHERE isWinning = true) ORDER BY RAND() LIMIT 1;`;
// try {
//   return randomPrize[0] ? randomPrize[0] : "No Prizes Left";
// } catch (e) {
//   console.error(e);
// }

// const available = await ctx.prisma.prize.findMany({
//   where: {
//     isWon: false,
//   },
// });
// if (available.length === 1 && available[0]?.name === "LOSS")
//   return "No Prizes Left";
// const result = available[Math.floor(Math.random() * available.length)];
// return result;
// }),
//   updatePrizeStatusById: publicProcedure
//     .input(z.object({ id: z.string() }))
//     .mutation(({ input, ctx }) => {
//       return ctx.prisma.prize.update({
//         where: {
//           id: input.id,
//         },
//         data: {
//           isWon: true,
//         },
//       });
//     }),
// });
