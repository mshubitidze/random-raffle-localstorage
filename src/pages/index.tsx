import { type Prize } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import GenerateResult from "~/components/GenerateResult";
import Loading from "~/components/Loading";
import Lose from "~/components/Lose";
import Over from "~/components/Over";
import Win from "~/components/Win";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [fetchedPrizes, setFetchedPrizes] = useState<Prize[]>([]);
  const [prize, setPrize] = useState<Prize>();
  const [hasPlayed, setHasPlayed] = useState(false);
  const [won, setWon] = useState(false);

  const localStorageData =
    typeof window !== "undefined" ? localStorage.getItem("results") ?? "" : "";

  useEffect(() => {
    if (localStorageData) {
      setHasPlayed(true);
      const data = JSON.parse(localStorageData) as "lost" | Prize;
      if (data !== "lost" && data) {
        setPrize(data);
        setWon(true);
      }
    }
  }, [localStorageData]);

  const fetchPrizes = api.prizes.getAllAvailablePrizes.useQuery(undefined, {
    onSuccess: (prizes) => {
      if (!prizes) return;
      setFetchedPrizes(prizes.filter((prize) => prize.count > 0));
    },
    refetchInterval: 100,
    enabled: !hasPlayed,
  });

  const updatePrizeCount = api.prizes.updatePrizesCountById.useMutation();

  function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHasPlayed(true);

    const possible = [...fetchedPrizes, "lost"];

    const result = possible[Math.floor(Math.random() * possible.length)] as
      | Prize
      | "lost";

    if (result !== "lost") {
      void updatePrizeCount
        .mutateAsync({
          id: result.id,
          count: result.count - 1,
        })
        .then((prize) => setPrize(prize));
      setPrize(result);
    }
    localStorage.setItem("results", JSON.stringify(result));
  }

  return (
    <>
      <Head>
        <title>BA Raffle</title>
        <meta name="description" content="BA Raffle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-6 justify-center items-center min-h-screen text-lg text-white bg-blue-800 md:text-2xl">
        {fetchPrizes.isLoading || updatePrizeCount.isLoading ? (
          <Loading />
        ) : hasPlayed ? (
          won ? (
            prize && <Win name={prize.name} id={prize.id} />
          ) : (
            <Lose />
          )
        ) : fetchedPrizes.length ? (
          <GenerateResult handleGenerate={handleGenerate} />
        ) : (
          <Over />
        )}
      </main>
    </>
  );
};

export default Home;
