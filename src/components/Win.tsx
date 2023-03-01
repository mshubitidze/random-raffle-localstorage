import CopyButton from "./CopyButton";
import Image from "next/image";

const Win = ({ name, id }: { name: string; id: string }) => {
  return (
    <>
      <p>{name}</p>
      <Image
        width="310"
        height="410"
        src={`/prizes/${name.split("-")[1] ?? "default"}.png`}
        alt="prize"
      />
      <div className="flex flex-col gap-4 justify-center items-center md:flex-row">
        <p>{id}</p>
        <CopyButton copy={id} />
      </div>
    </>
  );
};

export default Win;
