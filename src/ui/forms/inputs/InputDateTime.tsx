import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";

type InputDateTimeProps = {
  name: string;
  styleType: "primary" | "secondary";
  min?: string;
  max?: string;
  value?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputDateTime = ({
  name,
  styleType,
  min,
  max,
  value,
  required,
  onChange,
}: InputDateTimeProps) => {
  return (
    <Input
      id={name}
      name={name}
      type="datetime-local"
      min={min}
      max={max}
      mainColor={styleType === "primary" ? COLORS.mainColor : COLORS.white}
      placeholderColor={
        styleType === "primary"
          ? COLORS.placeholderMain
          : COLORS.placeholderWhite
      }
      iconColor={COLORS.mainColorFilter}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

type InputProps = {
  mainColor: string;
  iconColor: string;
  placeholderColor: string;
};

const Input = styled.input<InputProps>`
  transition: 0.3s;
  color: ${(props) => props.placeholderColor};
  width: 100%;
  padding: 10px;
  border: 2px solid ${(props) => props.mainColor};
  border-radius: 10px;
  outline: 0;
  &:focus {
    color: ${(props) => props.mainColor};
  }
  &::-webkit-calendar-picker-indicator {
    filter: ${(props) => props.iconColor};
  }
`;
