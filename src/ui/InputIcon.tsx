import { lato } from "@/styles/fonts";
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

export function InputIcon({
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
  background: linear-gradient(#000, #000), linear-gradient(#000, #000),
    linear-gradient(#000, #000);
  background-size: 1px 20%, 100% 1px, 1px 20%;
  background-position: bottom left, bottom center, bottom right;
  background-repeat: no-repeat;

  border: none;
  color: white;
  width: 100%;
  padding: 10px 40px;
  font-family: ${lato.style.fontFamily};
  font-size: 20px;
  font-weight: 400;
  border: 0;
  border-bottom: 2px solid white;
  outline: 0;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: white; // Text color when input autofilled
    -webkit-background-clip: text;
    background-clip: text;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;
