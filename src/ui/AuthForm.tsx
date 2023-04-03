import styled from "styled-components";
import Button from "./Button";
import { FONT_SIZE } from "@/styles/globalStyles";
import { PropsWithChildren } from "react";

interface IAuthForm {
  action: string;
  btnText: string;
  onFormSubmit: (arg0: any) => void;
}

export function AuthForm({
  action,
  btnText,
  children,
  onFormSubmit,
}: PropsWithChildren<IAuthForm>) {
  return (
    <Form action={action} onSubmit={onFormSubmit}>
      {children}
      <Button
        type="submit"
        fontSize={FONT_SIZE.p}
        fontWeight="bold"
        padding="10px"
        styleType="secondary"
        value="Submit"
      >
        {btnText}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
