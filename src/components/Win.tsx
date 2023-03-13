import CopyButton from "./CopyButton";
import Image from "next/image";

const Win = ({ name, id }: { name: string; id: string }) => {
  return (
    <div className="flex flex-col gap-8 items-center text-lg md:text-2xl">
      <Image
        width="390"
        height="844"
        className="rounded-lg border-4 border-blue-900 w-[320px] md:w-[400px]"
        src={`/prizes/${name.substring(0, name.length - 2) ?? "default"}.png`}
        alt="prize"
        priority={true}
      />
      <div className="flex absolute flex-col gap-4 justify-center items-center translate-y-[440px] md:translate-y-[540px]">
        <div className="flex flex-row gap-2 justify-center items-center py-2 px-4 text-white bg-blue-900 rounded-lg border border-white">
          <p className="font-bold">{id}</p>
        </div>
        <CopyButton text={id} />
      </div>
    </div>
  );
};

export default Win;
