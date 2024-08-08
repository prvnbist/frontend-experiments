import Option from "./Option";
import { useMultiSelect } from "../context";

const Options = ({ isLoading }: { isLoading: boolean }) => {
  const { selected } = useMultiSelect();

  if (isLoading)
    return (
      <div className="bg-white mt-1 border border-slate-300 rounded-md p-3 text-center">
        <span className="text-slate-600">Loading...</span>
      </div>
    );

  if (selected.size === 0) return null;

  return (
    <ul className="bg-white mt-1 border border-slate-300 rounded-md p-3 flex gap-2 flex-wrap items-center">
      {[...selected.values()].map((option) => (
        <Option key={option.value} option={option} />
      ))}
    </ul>
  );
};

export default Options;
