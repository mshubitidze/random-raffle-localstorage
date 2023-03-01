import CopyButton from "./CopyButton";

const Win = ({
  name,
  id,
}: {
  name: string;
  id: string;
}) => {
  return (
    <>
      <p>{name}</p>
      <div className="flex gap-4 justify-center items-center">
        <p>{id}</p>
        <CopyButton copy={id} />
      </div>
    </>
  );
};

export default Win;
