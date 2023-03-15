import Image from "next/image";
import InstructionsModal from "./InstructionsModal";

const Win = ({ id, url }: { id: string; url: string }) => {
  return (
    <div className="flex py-4 relative flex-col gap-8 items-center">
      <Image
        width="700"
        height="1300"
        className="rounded-3xl shadow-xl border border border-white/10 w-[340px] select-none md:w-[440px]"
        src={`/prizes/${url}.jpg` ?? "default.jpg"}
        alt="prize"
        priority={true}
      />
      <InstructionsModal code={id} />
    </div>
  );
};

export default Win;
