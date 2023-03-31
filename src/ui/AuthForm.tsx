import styled from "styled-components";
import Button from "./Button";
import { FONT_SIZE } from "@/styles/globalStyles";
import { IChildrenProps } from "@/models/ChildrenProps";

interface IAuthForm extends IChildrenProps {
  action: string;
  btnText: string;
}

export function AuthForm({ action, btnText, children, ...props }: IAuthForm) {
  return (
    <Form action={action} {...props}>
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
