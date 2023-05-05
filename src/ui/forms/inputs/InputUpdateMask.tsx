import { COLORS } from "@/styles/globalStyles";
import ReactInputMask from "react-input-mask";
import styled from "styled-components";

type InputUpdateMaskProps = {
  name: string;
  mask: string | (string | RegExp)[];
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputUpdateMask = ({
  name,
  mask,
  placeholder,
  value,
  onChange,
}: InputUpdateMaskProps) => {
  return (
    <MaskInput
      name={name}
      id={name}
      mask={mask}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

const MaskInput = styled(ReactInputMask)`
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
