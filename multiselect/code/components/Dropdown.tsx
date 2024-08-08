import { useEffect, useRef } from "react";

import { useMultiSelect } from "../context";
import DropdownOption from "./DropdownOption";

const CLASSES = {
  popover__container:
    "mt-[5px] w-[calc(100%_+_2px)] ml-[-1px] p-2 overflow-auto max-h-[340px] bg-white absolute border border-slate-300 rounded-md space-y-1",
  popover__no_results: "h-8 px-3 text-sm flex items-center text-slate-400",
};

type OptionsProps = {
  max?: number;
  search: string;
  onClose: () => void;
};

const Dropdown = ({ max, onClose, search = "" }: OptionsProps) => {
  const { options, isOptionsLoading } = useMultiSelect();

  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (event.target as Node).nodeName !== "INPUT"
      ) {
        onClose && onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <ul ref={ref} className={CLASSES.popover__container}>
      {!!max && (
        <li className="text-sm px-3 text-slate-500 h-8 flex items-center">
          Max allowed: {max}
        </li>
      )}
      {isOptionsLoading ? (
        <li className="p-3 text-center">
          <span className="text-slate-600">Loading...</span>
        </li>
      ) : (
        <>
          {options.length === 0 && (
            <li className={CLASSES.popover__no_results}>
              No options to select.
            </li>
          )}
          {search.trim() && options.length > 0 && options.length === 0 && (
            <li className={CLASSES.popover__no_results}>No options matched.</li>
          )}
          {options.map((option) => (
            <DropdownOption
              key={option.value}
              search={search}
              option={option}
            />
          ))}
        </>
      )}
    </ul>
  );
};

export default Dropdown;
