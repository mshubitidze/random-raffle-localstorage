import CopyButton from "./CopyButton";
import Image from "next/image";

const Win = ({ name, id }: { name: string; id: string }) => {
  return (
    <>
      <p>{name}</p>
      <Image
        width="280"
        height="370"
        src={`/prizes/${name.split("-")[1] ?? "default"}.png`}
        alt="prize"
        priority={true}
      />
      <div className="flex flex-col gap-4 justify-center items-center md:flex-row">
        <p>Code:</p>
        <div className="flex py-2 px-4 flex-row gap-2 justify-center items-center text-white bg-blue-900 rounded-lg border border-white">
          <p className="font-bold">{id}</p>
        </div>
        <CopyButton copy={id} />
      </div>
    </>
  );
};

export default Win;
