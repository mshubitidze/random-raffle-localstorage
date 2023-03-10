import type { Prize } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Loading from "~/components/Loading";
import Lose from "~/components/Lose";
import Over from "~/components/Over";
import Win from "~/components/Win";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [prize, setPrize] = useState<Prize>();
  const [isOver, setIsOver] = useState(false);

  const localStorageData = typeof window !== "undefined"
    ? localStorage.getItem("prize") ?? ""
    : "";

  useEffect(() => {
    if (localStorageData) {
      const data = JSON.parse(localStorageData) as Prize;
      setPrize(data);
    }
  }, [localStorageData]);

  const { data: prizeData, isLoading: prizeLoading } = api.prizes
    .getARandomPrizeFromAvailable.useQuery(undefined, {
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
        className={`flex flex-col items-center gap-6 text-white`}
      >
        {prize
          ? (
            prize.isWinning
              ? <Win id={prize.id} url={prize.imageUrl} />
              : <Lose />
          )
          : prizeLoading
          ? <Loading />
          : <Over />}
      </main>
    </>
  );
};

export default Home;
