import type { Prize } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import Loading from "~/components/Loading";
import Lose from "~/components/Lose";
import Over from "~/components/Over";
import Win from "~/components/Win";
import { api } from "~/utils/api";

import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "700" });

const Home: NextPage = () => {
  const [prize, setPrize] = useState<Prize>();
  const [isOver, setIsOver] = useState(false);

  const localStorageData =
    typeof window !== "undefined" ? localStorage.getItem("prize") ?? "" : "";

  useEffect(() => {
    if (localStorageData) {
      const data = JSON.parse(localStorageData) as Prize;
      setPrize(data);
    }
  }, [localStorageData]);

  const { data: prizeData, isLoading: prizeLoading } =
    api.prizes.getARandomPrizeFromAvailable.useQuery(undefined, {
      enabled: !localStorageData && !prize && !isOver,
    });

  useEffect(() => {
    if (prizeData) {
      if (typeof prizeData === "string") {
        setIsOver(true);
        return;
      }
      setPrize(prizeData);
      localStorage.setItem("prize", JSON.stringify(prizeData));
    }
  }, [prizeData]);

  return (
    <>
      <Head>
        <title>BA Raffle</title>
        <meta name="description" content="BA Raffle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`mt-8 flex max-h-screen flex-col items-center gap-6 bg-[#004fff] text-white md:mt-0 md:min-h-screen md:justify-center ${roboto.className}`}
      >
        {prize ? (
          prize.isWinning ? (
            <Win name={prize.name} id={prize.id} />
          ) : (
            <Lose />
          )
        ) : prizeLoading ? (
          <Loading />
        ) : (
          <Over />
        )}
      </main>
    </>
  );
};

export default Home;
