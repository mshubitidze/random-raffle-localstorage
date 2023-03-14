import Image from "next/image";

const Over = () => {
  return (
    <Image
      width="700"
      height="1300"
      className="rounded-3xl mt-12 shadow-xl border border border-white/10 w-[340px] md:w-[440px]"
      src={`/prizes/over.jpg`}
      alt="prize"
      priority={true}
    />
  );
};

export default Over;
