"use client";

import type { Option } from "./types";
import MultiSelectProvider from "./context";
import { SearchInput, Options } from "./components";

type MultiSelectProps = {
  max?: number;

  options: Array<Option>;
  selected: Array<Option>;

  isOptionsLoading?: boolean;
  isSelectedOptionsLoading?: boolean;

  onClear: () => void;
  onSearch?: (search: string) => void;
  onSelect?: (option: Option, options: Array<Option>) => void;
  onDeselect?: (option: Option, options: Array<Option>) => void;
};

const MultiSelect = ({
  options = [],
  selected = [],
  isOptionsLoading = false,
  isSelectedOptionsLoading = false,
  ...props
}: MultiSelectProps) => {
  return (
    <MultiSelectProvider
      options={options}
      selected={selected}
      isOptionsLoading={isOptionsLoading}
      {...props}
    >
      <SearchInput max={props.max} />
      <Options isLoading={isSelectedOptionsLoading} />
    </MultiSelectProvider>
  );
};

export default MultiSelect;

export { Option };
