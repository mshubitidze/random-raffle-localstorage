import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import EnvelopeIcon from "./EnvelopeIcon";
import ExclamationIcon from "./ExclamationIcon";
import InstructionsModal from "./InstructionsModal";

type PrizeName =
  | "marketer"
  | "oktopus"
  | "veli-100"
  | "veli-200"
  | "veli-500";

const Win = ({ name, id }: { name: string; id: string }) => {
  const [toggle, setToggle] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      const button = document.getElementById("toggle-button");
      if (button && button.contains(event.target as Node)) {
        return;
      }
      setToggle(false);
    }
  };

  const imageName = name.substring(0, name.length - 2) ??
    "default" as PrizeName | "default";
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

  return (
    <div className="flex py-4 relative flex-col gap-8 items-center font-bold">
      <Image
        width="700"
        height="1300"
        className="rounded-3xl shadow-xl border border border-white/10 w-[340px] select-none md:w-[440px]"
        src={`/prizes/${image}.jpg`}
        alt="prize"
        priority={true}
      />
      <div className="flex gap-2 flex-col backdrop-blur-md w-[255px] md:w-[300px] text-md md:text-lg justify-center font-semibold text-white transition mt-[110%] absolute">
        <div className="flex space-x-2">
          <button
            id="toggle-button"
            onClick={() => setToggle(!toggle)}
            className="flex cursor-pointer"
          >
            <ExclamationIcon />
          </button>
          <div className="flex flex-row items-center whitespace-nowrap select-none flex-1 justify-center py-2 px-5 space-x-2 no-underline bg-white/30 hover:bg-white/50 rounded-lg">
            <a
              href={`mailto:${mail}?subject=${mailSubject}&body=${messageBody}`}
            >
              მიიღე საჩუქარი
            </a>
            <EnvelopeIcon />
          </div>
        </div>
        <div ref={modalRef} className={`${toggle ? "block" : "hidden"} z-10`}>
          <InstructionsModal />
        </div>
      </div>
    </div>
  );
};

export default Win;
