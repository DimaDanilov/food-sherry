import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";
import { Icon } from "../../layout/Icon";
import ReactInputMask from "react-input-mask";

type FormMaskProps = {
  name: string;
  mask: string | (string | RegExp)[];
  placeholder?: string;
  icon: JSX.Element;
  iconScale?: number;
  inputValue?: string;
  inputOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styleType: "primary" | "secondary";
  required?: boolean;
};

export const FormMask = ({
  name,
  mask,
  placeholder,
  icon,
  iconScale,
  inputValue,
  inputOnChange,
  styleType,
  required,
}: FormMaskProps) => {
  return (
    <Container>
      <StyledIcon icon={icon} iconScale={iconScale} />
      <MaskInput
        name={name}
        id={name}
        mask={mask}
        autoComplete="Maskisamazingstuffreally"
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
};

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

type InputProps = {
  mainColor: string;
  placeholderColor: string;
};

const MaskInput = styled(ReactInputMask)<InputProps>`
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
