import Image from "next/image";

const Lose = () => {
  return (
    <Image
      width="700"
      height="1300"
      className="rounded-3xl py-4 shadow-xl border border border-white/10 w-[340px] md:w-[440px]"
      src={`/prizes/loss.jpg`}
      alt="prize"
      priority={true}
    />
  );
};

export default Lose;
