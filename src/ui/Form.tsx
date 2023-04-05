import styled from "styled-components";
import Button from "./Button";
import { FONT_SIZE } from "@/styles/globalStyles";
import { PropsWithChildren } from "react";

interface IAuthForm {
  action: string;
  btnText: string;
  styleType: "secondary" | "primary";
  onFormSubmit: (arg0: any) => void;
}

export function Form({
  action,
  btnText,
  styleType,
  children,
  onFormSubmit,
}: PropsWithChildren<IAuthForm>) {
  return (
    <CustomForm action={action} onSubmit={onFormSubmit}>
      {children}
      <Button
        type="submit"
        fontSize={FONT_SIZE.p}
        padding="10px"
        styleType={styleType}
        value="Submit"
      >
        {btnText}
      </Button>
    </CustomForm>
  );
}

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
