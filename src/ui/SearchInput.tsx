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

export default function SearchInput({
  type,
  name,
  placeholder,
  icon,
  iconScale,
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
  left: 5px;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 45px;
  border-radius: 20px;
  border: 2px solid ${COLORS.lightgray};
  font-size: ${FONT_SIZE.input};
  :focus {
    outline: none;
    border-color: ${COLORS.gray};
  }
`;
