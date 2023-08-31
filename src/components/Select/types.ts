/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse {
  id: number;
  name: string;
}

export interface DropdownValues {
  id: number;
  [key: string]: any;
}

export interface SelectProps {
  dropdownValues: DropdownValues[];
  isLoading?: boolean;
  multiple?: boolean;
  itemKey?: string;
  onInputChangeHandler: (value: string) => void;
  defaultValue?: DropdownValues[] | DropdownValues;
}
