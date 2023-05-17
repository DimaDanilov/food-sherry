import styled from "styled-components";
import { ButtonCommon } from "./buttons/ButtonCommon";
import { PropsWithChildren } from "react";

type AuthFormProps = {
  action: string;
  btnText: string;
  styleType: "secondary" | "primary";
  onFormSubmit: (arg0: any) => void;
};

export const AuthForm = ({
  action,
  btnText,
  styleType,
  children,
  onFormSubmit,
}: PropsWithChildren<AuthFormProps>) => {
  return (
    <CustomForm action={action} onSubmit={onFormSubmit}>
      {children}
      <ButtonCommon
        type="submit"
        width="100%"
        padding="10px"
        styleType={styleType}
        value="Submit"
      >
        {btnText}
      </ButtonCommon>
    </CustomForm>
  );
};

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
