import Image from "next/image";

type PrizeName =
  | "marketer"
  | "oktopus"
  | "veli-100"
  | "veli-200"
  | "veli-500";

const Win = ({ name, id }: { name: string; id: string }) => {
  const imageName = (name.substring(0, name.length - 2) ?? "default") as
    | PrizeName
    | "default";
  const image = {
    "marketer": "G5vYnT8JQw6URNyA12ZpAw==",
    "oktopus": "B2lf1pn8kbhTDYm3qCc9FQ==",
    "veli-100": "ckcZpppViAM7bmGytmJFBQ==",
    "veli-200": "yavtbjv8eiAox5m7qLt8sQ==",
    "veli-500": "9YYoFNI1X2dA2gypu8VjpA==",
    "default": "default",
  }[imageName] as PrizeName;

  const mail = `mshubitidze98@gmail.com`;
  const mailSubject = `${name} - გამარჯვებული`;
  const messageBody =
    `გამარჯობა,%0D%0Aმოვიგე ${name}%0D%0A%0D%0A%0D%0Aპრიზის ID: ${id}`;

  console.log(image);

  return (
    <div className="flex py-4 flex-col gap-8 items-center text-2xl font-extrabold md:text-2xl">
      <Image
        width="700"
        height="1300"
        className="rounded-3xl shadow-xl border border border-white/10 w-[340px] md:w-[440px]"
        src={`/prizes/${image}.jpg`}
        alt="prize"
        priority={true}
      />
      <a
        className="py-2 px-5 font-semibold text-white no-underline rounded-lg transition bg-white/30 hover:bg-white/50 absolute translate-y-[520px] md:translate-y-[680px]"
        href={`mailto:${mail}?subject=${mailSubject}&body=${messageBody}`}
      >
        ᲛᲘᲘᲦᲔ ᲞᲠᲘᲖᲘ
      </a>
    </div>
  );
};

export default Win;
