import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";

import type { Option } from "./types";

type ContextType = {
  options: Array<Option>;
  selected: Map<string, Option>;

  isOptionsLoading: boolean;

  addOption: (Option: Option) => void;
  removeOption: (Option: Option) => void;
  clearOptions: () => void;
  onSearch: (search: string) => void;
};

type Action =
  | { type: "SET_LOADING_OPTIONS"; payload: boolean }
  | { type: "SET_LOADING_SELECTED"; payload: boolean }
  | { type: "INIT_DATA"; payload: Array<Option> }
  | { type: "INIT_SELECTED"; payload: Array<Option> }
  | { type: "ADD_OPTION"; payload: Option }
  | { type: "REMOVE_OPTION"; payload: Option }
  | { type: "CLEAR_OPTIONS" };

type MultiSelectProviderProps = {
  max?: number;

  options: Array<Option>;
  selected: Array<Option>;

  isOptionsLoading: boolean;

  onClear: () => void;
  onSearch?: (search: string) => void;
  onSelect?: (option: Option, options: Array<Option>) => void;
  onDeselect?: (option: Option, options: Array<Option>) => void;
};

const INITIAL_STATE: ContextType = {
  addOption: () => null,
  removeOption: () => null,
  clearOptions: () => null,
  onSearch: () => null,

  options: [],
  selected: new Map<string, Option>([]),

  isOptionsLoading: false,
};

const Context = createContext<ContextType>(INITIAL_STATE);

const reducer = (state: ContextType, action: Action) => {
  switch (action.type) {
    case "SET_LOADING_OPTIONS":
      return { ...state, isOptionsLoading: action.payload };
    case "INIT_DATA":
      return { ...state, options: action.payload };
    case "INIT_SELECTED": {
      const selected = new Map(
        action.payload.map((option) => [option.value, option])
      );
      return { ...state, selected };
    }
    case "ADD_OPTION": {
      const selected = new Map(state.selected);
      selected.set(action.payload.value, action.payload);
      return { ...state, selected };
    }
    case "REMOVE_OPTION": {
      const selected = new Map(state.selected);
      selected.delete(action.payload.value);
      return { ...state, selected };
    }
    case "CLEAR_OPTIONS":
      return { ...state, selected: new Map() };
    default:
      return state;
  }
};

const MultiSelectProvider = (
  props: MultiSelectProviderProps & PropsWithChildren
) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: "SET_LOADING_OPTIONS", payload: props.isOptionsLoading });
  }, [props.isOptionsLoading]);

  useEffect(() => {
    dispatch({ type: "INIT_DATA", payload: props.options });
  }, [props.options]);

  useEffect(() => {
    if (props.selected.length > 0) {
      dispatch({ type: "INIT_SELECTED", payload: props.selected });
    }
  }, [props.selected]);

  const addOption = (option: Option) => {
    const existing = [...state.selected.values()];

    if (!!props.max && props.max === existing.length) {
      return;
    }

    dispatch({ type: "ADD_OPTION", payload: option });

    const updated = [...existing, option];
    props.onSelect && props.onSelect(option, updated);
  };

  const removeOption = (option: Option) => {
    dispatch({ type: "REMOVE_OPTION", payload: option });

    const selected = new Map(state.selected);
    selected.delete(option.value);

    const updated = [...selected.values()];
    props.onDeselect && props.onDeselect(option, updated);
  };

  const clearOptions = () => {
    dispatch({ type: "CLEAR_OPTIONS" });
    props.onClear && props.onClear();
  };

  return (
    <Context.Provider
      value={{
        ...state,
        addOption,
        removeOption,
        clearOptions,
        ...(props.onSearch && { onSearch: props.onSearch }),
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

const useMultiSelect = () => {
  const context = useContext(Context);

  if (!context)
    throw Error("useMultiSelect must be used within a MultiSelectProvider.");

  return context;
};

export default MultiSelectProvider;

export { useMultiSelect };
