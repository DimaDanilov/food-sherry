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

export default function SearchInput({
  type,
  name,
  placeholder,
  icon,
  required,
}: IInputIcon) {
  return (
    <Input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      required={required}
      icon={icon}
    />
  );
}

const Input = styled.input<IFormField>`
  width: 100%;
  padding: 10px 45px;
  border-radius: 20px;
  border: 2px solid ${COLORS.lightgray};

  background: url(${(props) => props.icon}) no-repeat left;
  background-position: 15px 50%;
  background-size: 20px;
  font-size: ${FONT_SIZE.input};
  :focus {
    outline: none;
    border-color: ${COLORS.gray};
  }
`;
