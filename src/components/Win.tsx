import CopyButton from "./CopyButton";
import Image from "next/image";

const Win = ({ name, id }: { name: string; id: string }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Image
        width="390"
        height="844"
        className="w-[300px] h-[565px]"
        src={`/prizes/${name.substring(0, name.length - 2) ?? "default"}.png`}
        alt="prize"
        priority={true}
      />
      <div className="flex absolute translate-y-[450px] flex-col gap-4 justify-center items-center md:flex-row">
        <div className="flex flex-row gap-2 justify-center items-center py-2 px-4 text-white bg-blue-900 rounded-lg border border-white">
          <p className="font-bold">{id}</p>
        </div>
        <CopyButton text={id} />
      </div>
    </div>
  );
};

export default Win;
