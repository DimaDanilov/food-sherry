import { COLORS, FONT_SIZE } from "@/styles/globalStyles";
import styled from "styled-components";

interface IInputIcon {
  type: string;
  name: string;
  placeholder?: string;
  icon: string;
  required?: boolean;
}

interface IFormField {
  icon: string;
}

export function FormInput({
  type,
  name,
  placeholder,
  icon,
  required,
}: IInputIcon) {
  return (
    <Container>
      <Icon icon={icon} />
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

const Icon = styled.i<IFormField>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(${(props) => props.icon}) no-repeat left;
  background-position: 5px 50%;
  background-size: 25px;
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
