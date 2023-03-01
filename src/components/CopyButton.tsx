import { useState } from "react";

const CopyButton = ({ copy }: { copy: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  return (
    <button
      onClick={() => {
        setHasCopied(true);
        navigator.clipboard.writeText(copy);
      }}
      className="py-2 px-5 font-semibold no-underline rounded-lg transition bg-white/10 hover:bg-white/20"
    >
      {hasCopied ? "Copied" : "Copy"}
    </button>
  );
};

export default CopyButton;
