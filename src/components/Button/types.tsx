export interface ButtonProps {
  type: 'primary' | 'secondary';
  text: string;
  onClick: () => void;
  isLoading?: boolean;
}
