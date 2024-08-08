import { memo } from "react";

import { IconX } from "../assets";
import type { Option } from "../types";
import { useMultiSelect } from "../context";

const CLASSES = {
  option:
    "text-sm rounded-md pl-2 h-6 flex gap-2 flex-wrap items-center bg-indigo-50 text-slate-700",
  option__remove:
    "rounded-r-md size-6 flex items-center justify-center hover:bg-indigo-100 focus:bg-indigo-200 focus-visible:outline-none focus:ring-2 ring-inset ring-indigo-400",
};

const Option = ({ option }: { option: Option }) => {
  const { removeOption } = useMultiSelect();
  return (
    <li className={CLASSES.option}>
      <span title={option.label}>{option.label}</span>
      <button
        title="Remove Tag"
        className={CLASSES.option__remove}
        onClick={() => removeOption(option)}
      >
        <IconX />
      </button>
    </li>
  );
};

export default memo(Option);
