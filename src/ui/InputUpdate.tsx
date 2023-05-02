import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";

type InputUpdateProps = {
  autoFocus?: boolean;
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputUpdate = ({
  autoFocus,
  type,
  name,
  placeholder,
  value,
  onChange,
}: InputUpdateProps) => {
  return (
    <Input
      autoFocus={autoFocus}
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

const Input = styled.input`
  transition: 0.2s ease-in;
  width: 100%;
  margin: 5px auto;
  border-radius: 5px;
  border: 1px solid ${COLORS.mainColor};
  padding: 7px;
  &:focus {
    outline-color: ${COLORS.mainColor};
  }
`;
