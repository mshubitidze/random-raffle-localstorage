import { Prize } from "@prisma/client";
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
      const data = JSON.parse(localStorageData);
      if (data !== "lost") {
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
    enabled: hasPlayed === false,
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
      updatePrizeCount
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
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-2xl text-white">
        {fetchPrizes.isLoading ? (
          <Loading />
        ) : hasPlayed ? (
          won ? prize && (
            <Win name={prize.name} id={prize.id} />
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
