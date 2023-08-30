export interface ApiResponse {
  id: number;
  name: string;
}

export interface SelectProps {
  dropdownValues: string[];
  isLoading?: boolean;
  multiple?: boolean;
  onInputChangeHandler: (value: string) => void;
}
