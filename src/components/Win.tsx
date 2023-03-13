import CopyButton from "./CopyButton";
// import Image from "next/image";

const Win = ({ name, id }: { name: string; id: string }) => {
  return (
    <>
      {/* <p>{name}</p> */}
      {/* <Image */}
      {/*   width="280" */}
      {/*   height="370" */}
      {/*   src={`/prizes/${name.split("-")[1] ?? "default"}.png`} */}
      {/*   alt="prize" */}
      {/*   priority={true} */}
      {/* /> */}
      <div className="flex rounded-lg border-[10px] border-blue-900 justify-center items-center md:w-[400px] md:h-[600px] w-[280px] h-[400px] bg-fuchsia-500">
        {name}
      </div>
      <div className="flex flex-col gap-4 justify-center items-center md:flex-row">
        <div className="flex flex-row gap-2 justify-center items-center py-2 px-4 text-white bg-blue-900 rounded-lg border border-white">
          <p className="font-bold">{id}</p>
        </div>
        <CopyButton copy={id} />
      </div>
    </>
  );
};

export default Win;
