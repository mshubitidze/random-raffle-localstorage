import { useState } from "react";
import CopyButton from "./CopyButton";

const InstructionsModal = ({ code }: { code: string }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const email = "mshubitidze98@gmail.com";
  return (
    <div className="absolute p-2 max-w-full mt-[115%] space-y-2 md:text-2xl text-md bg-black/30 text-white backdrop-blur-md">
      <p>
        პრიზის მისაღებად ქვემოთ მოცემული კოდი მოგვწერეთ ქვემოთ მოცემულ მეილზე
      </p>
      <div className="flex space-x-2">
        <div
          className={`flex w-full border ${
            emailCopied ? "bg-green-500/40" : "bg-black/30"
          } rounded-lg border-white space-x-2`}
        >
          <pre className="flex-1 px-2 py-1">{email}</pre>
        </div>
        <CopyButton
          copied={emailCopied}
          onClick={() => {
            void navigator.clipboard.writeText(email);
            setEmailCopied(true);
            setTimeout(() => {
              setEmailCopied(false);
            }, 1500);
          }}
        />
      </div>
      <div className="flex space-x-2">
        <div
          className={`flex w-full border ${
            codeCopied ? "bg-green-500/40" : "bg-black/30"
          } rounded-lg border-white space-x-2`}
        >
          <pre className="flex-1 px-2 py-1">{code}</pre>
        </div>
        <CopyButton
          copied={codeCopied}
          onClick={() => {
            void navigator.clipboard.writeText(code);
            setCodeCopied(true);
            setTimeout(() => {
              setCodeCopied(false);
            }, 1500);
          }}
        />
      </div>
    </div>
  );
};

export default InstructionsModal;
