import Highlight from "./Highlight";
import { IconCheck } from "../assets";
import type { Option } from "../types";
import { useMultiSelect } from "../context";

type DropdownOptionProps = {
  option: Option;
  search: string;
};

const DropdownOption = ({ search, option }: DropdownOptionProps) => {
  const { selected, addOption, removeOption } = useMultiSelect();

  const isSelected = selected.has(option.value);
  return (
    <li
      tabIndex={0}
      title={option.label}
      onClick={() => (isSelected ? removeOption(option) : addOption(option))}
      onKeyUp={(e) =>
        e.code === "Enter" &&
        (isSelected ? removeOption(option) : addOption(option))
      }
      className={`"rounded-md cursor-pointer text-sm flex items-center justify-between h-8 px-3 hover:bg-indigo-100 focus:bg-indigo-100 focus-visible:outline-none focus:ring-2 ring-inset ring-indigo-400" ${
        isSelected ? "bg-indigo-50" : ""
      }`}
    >
      <Highlight highlight={search} text={option.label} />
      <span className="size-8 flex items-center justify-center">
        {isSelected && <IconCheck size={18} className="text-indigo-700" />}
      </span>
    </li>
  );
};

export default DropdownOption;
