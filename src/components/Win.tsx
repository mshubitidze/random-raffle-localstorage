// import CopyButton from "./CopyButton";
import Image from "next/image";

const Win = ({ name, id }: { name: string; id: string }) => {
  const imageName = name.substring(0, name.length - 2) ?? "default";

  const mail = `mshubitidze98@gmail.com`;
  const mailSubject = `${name} - გამარჯვებული`;
  const messageBody =
    `გამარჯობა,%0D%0Aმოვიგე ${name}%0D%0A%0D%0Aპრიზის ID: ${id}`;

  return (
    <div className="flex flex-col gap-8 items-center text-lg md:text-2xl">
      <Image
        width="390"
        height="844"
        className="rounded-lg shadow-2xl w-[320px] md:w-[400px]"
        src={`/prizes/${imageName}.png`}
        alt="prize"
        priority={true}
      />
      <a
        className="py-2 px-5 font-semibold text-blue-900 no-underline rounded-lg transition bg-white/60 hover:bg-white/80 absolute translate-y-[480px] md:translate-y-[640px]"
        href={`mailto:${mail}?subject=${mailSubject}&body=${messageBody}`}
      >
        ᲛᲘᲘᲦᲔ ᲞᲠᲘᲖᲘ
      </a>
      {
        /* <div className="flex absolute flex-col gap-4 justify-center items-center translate-y-[440px] md:translate-y-[540px]">
        <div className="flex flex-row gap-2 justify-center items-center py-2 px-4 text-white bg-blue-900 rounded-lg border border-white">
          <p className="font-bold">{id}</p>
        </div>
        <CopyButton text={id} />
      </div> */
      }
    </div>
  );
};

export default Win;
