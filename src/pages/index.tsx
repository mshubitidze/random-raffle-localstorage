import { type Prize } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import Loading from "~/components/Loading";
import Lose from "~/components/Lose";
import Over from "~/components/Over";
import Win from "~/components/Win";
import { api } from "~/utils/api";

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

  const updatePrizeStatus = api.prizes.updatePrizeStatusById.useMutation();

  const { isLoading: prizeLoading } =
    api.prizes.getARandomPrizeFromAvailable.useQuery(undefined, {
      onSuccess: (prize) => {
        if (prize === "No Prizes Left") {
          setIsOver(true);
          return;
        }
        setPrize(prize);
        if (prize && prize.name && prize.name !== "LOSS") {
          void updatePrizeStatus.mutateAsync({
            id: prize.id,
          });
        }
        localStorage.setItem("prize", JSON.stringify(prize));
      },
      enabled: !prize && !isOver && !localStorageData,
    });

  return (
    <>
      <Head>
        <title>BA Raffle</title>
        <meta name="description" content="BA Raffle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-6 justify-center items-center min-h-screen text-lg text-white bg-blue-800 md:text-2xl">
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
