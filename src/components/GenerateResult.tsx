const GenerateResult = ({
  handleGenerate,
}: {
  handleGenerate: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form onSubmit={handleGenerate}>
      <button className="py-3 px-10 font-semibold no-underline rounded-full transition bg-white/10 hover:bg-white/20">
        Generate
      </button>
    </form>
  );
};

export default GenerateResult;
