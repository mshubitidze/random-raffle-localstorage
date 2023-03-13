import { useState } from "react";

const CopyButton = ({ text }: { text: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  return (
    <button
      onClick={() => {
        setHasCopied(true);
        void navigator.clipboard.writeText(text);
      }}
      className="py-2 px-5 font-semibold no-underline rounded-lg transition bg-white/40 hover:bg-white/70"
    >
      {hasCopied ? "Copied" : "Copy"}
    </button>
  );
};

export default CopyButton;
