import { COLORS } from "@/styles/globalStyles";
import styled from "styled-components";

interface ITextArea {
  name: string;
  rows: number;
  placeholder: string;
  inputValue?: string;
  inputOnChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  styleType: "primary" | "secondary";
}

export const TextArea = ({
  name,
  rows,
  placeholder,
  inputValue,
  inputOnChange,
  styleType,
}: ITextArea) => {
  return (
    <CustomTextArea
      name={name}
      placeholder={placeholder}
      mainColor={styleType === "primary" ? COLORS.mainColor : COLORS.white}
      placeholderColor={
        styleType === "primary"
          ? COLORS.placeholderMain
          : COLORS.placeholderWhite
      }
      value={inputValue}
      onChange={inputOnChange}
      rows={rows}
    />
  );
};

const CustomTextArea = styled.textarea<{
  mainColor: string;
  placeholderColor: string;
}>`
  resize: vertical;
  padding: 15px;
  color: ${(props) => props.mainColor};
  border: 2px solid ${(props) => props.mainColor};
  border-radius: 15px;
  outline: 0;
  min-height: 100px;
  &::placeholder {
    color: ${(props) => props.placeholderColor};
  }
`;
