import { useDebounce } from "react-use";
import { useEffect, useState } from "react";

import Options from "./Dropdown";
import { useMultiSelect } from "../context";
import { IconChevronDown, IconSearch, IconX } from "../assets";

const CLASSES = {
  input__search: "text-sm h-full flex-1 focus:outline-none",
  input__view_options:
    "flex items-center justify-center size-10 focus-visible:outline-none focus:bg-indigo-50 hover:bg-indigo-50 focus:ring-2 ring-inset ring-blue-400",
  input__clear_options:
    "rounded-tr-md flex items-center justify-center size-10 focus-visible:outline-none focus:bg-indigo-50 hover:bg-indigo-50 focus:ring-2 ring-inset ring-blue-400",
};

const SearchInput = ({ max }: { max?: number }) => {
  const [search, setSearch] = useState("");

  const { clearOptions, onSearch } = useMultiSelect();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useDebounce(() => setDebouncedSearch(search), 300, [search]);

  useEffect(() => {
    if (!isDropdownOpen) {
      setSearch("");
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch.trim());
    }
  }, [debouncedSearch, onSearch]);

  return (
    <div className="w-full relative rounded-md bg-white border border-slate-300">
      <div className="h-10 w-full flex items-center">
        <span className="flex items-center justify-center size-10">
          <IconSearch size={18} className="text-slate-600" />
        </span>
        <input
          type="text"
          value={search}
          placeholder="Search tags..."
          className={CLASSES.input__search}
          onFocus={() => setIsDropdownOpen(true)}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          title="View Tags"
          className={CLASSES.input__view_options}
          onClick={() => setIsDropdownOpen((v) => !v)}
        >
          <IconChevronDown size={18} className="text-slate-600" />
        </button>
        <button
          title="Clear Options"
          onClick={clearOptions}
          className={CLASSES.input__clear_options}
        >
          <IconX size={18} className="text-slate-600" />
        </button>
      </div>
      {isDropdownOpen && (
        <Options
          max={max}
          search={debouncedSearch}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchInput;
