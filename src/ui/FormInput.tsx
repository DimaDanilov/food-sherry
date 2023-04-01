import { COLORS, FONT_SIZE } from "@/styles/globalStyles";
import styled from "styled-components";
import { Icon } from "./Icon";

interface IInputIcon {
  type: string;
  name: string;
  placeholder?: string;
  icon: JSX.Element;
  iconScale?: number;
  required?: boolean;
}

export function FormInput({
  type,
  name,
  placeholder,
  icon,
  iconScale,
  required,
}: IInputIcon) {
  console.log(icon);
  return (
    <Container>
      <StyledIcon icon={icon} iconScale={iconScale} />
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
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

const Input = styled.input`
  background: transparent;
  border: none;
  color: ${COLORS.white};
  width: 100%;
  padding: 10px 40px;
  font-size: ${FONT_SIZE.input};
  border: 0;
  border-bottom: 2px solid ${COLORS.white};
  outline: 0;
  caret-color: ${COLORS.white}; // Typing cursor

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${COLORS.white}; // Text color when input autofilled
    -webkit-background-clip: text;
    background-clip: text;
  }

  &::placeholder {
    color: ${COLORS.placeholder};
  }
`;
