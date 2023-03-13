// import CopyButton from "./CopyButton";
import Image from "next/image";

const Win = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <Image
        width="390"
        height="844"
        className="h-[565px] w-[300px]"
        src={`/prizes/${name.substring(0, name.length - 2) ?? "default"}.png`}
        alt="prize"
        priority={true}
      />
      {/* <div className="flex absolute flex-col gap-4 justify-center items-center md:flex-row translate-y-[480px]"> */}
      {/*   <div className="flex flex-row gap-2 justify-center items-center py-2 px-4 text-white bg-blue-900 rounded-lg border border-white"> */}
      {/*     <p className="font-bold">{id}</p> */}
      {/*   </div> */}
      {/*   <CopyButton text={id} /> */}
      {/* </div> */}
    </div>
  );
};

export default Win;
