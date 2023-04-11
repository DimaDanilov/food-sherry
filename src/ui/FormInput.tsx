import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";
import { Icon } from "./Icon";

interface IInputIcon {
  type: string;
  name: string;
  placeholder?: string;
  icon: JSX.Element;
  iconScale?: number;
  inputValue?: string;
  inputOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styleType: "primary" | "secondary";
  required?: boolean;
}

export function FormInput({
  type,
  name,
  placeholder,
  icon,
  iconScale,
  inputValue,
  inputOnChange,
  styleType,
  required,
}: IInputIcon) {
  return (
    <Container>
      <StyledIcon icon={icon} iconScale={iconScale} />
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={inputOnChange}
        mainColor={styleType === "primary" ? COLORS.mainColor : COLORS.white}
        placeholderColor={
          styleType === "primary"
            ? COLORS.placeholderMain
            : COLORS.placeholderWhite
        }
        required={required}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  width: 40px;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Input = styled.input<{ mainColor: string; placeholderColor: string }>`
  background: transparent;
  border: none;
  color: ${(props) => props.mainColor};
  width: 100%;
  padding: 10px 40px;
  border: 0;
  border-bottom: 2px solid ${(props) => props.mainColor};
  outline: 0;
  caret-color: ${(props) => props.mainColor}; // Typing cursor

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${(props) =>
      props.mainColor}; // Text color when input autofilled
    -webkit-background-clip: text;
    background-clip: text;
  }

  &::placeholder {
    color: ${(props) => props.placeholderColor};
  }
`;
