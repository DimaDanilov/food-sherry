import { colors, lato } from "@/styles/globalStyles";
import Button from "@/ui/Button";
import { Container } from "@/ui/Container";
import { InputIcon } from "@/ui/InputIcon";
import { FormSwitch } from "@/ui/FormSwitch";
import PageTemplate from "@/ui/PageTemplate";
import styled from "styled-components";

const onFormSubmit = () => (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export default function Login() {
  return (
    <PageTemplate>
      <Container>
        <LoginFormContainer>
          <Title>Вход</Title>
          <FormSwitch
            activeBtn="left"
            leftText="Вход"
            rightText="Регистрация"
            link="/register"
          />
          <Form action="" onSubmit={onFormSubmit()}>
            <InputIcon
              type="email"
              name="email"
              placeholder="Почта"
              icon="/icons/mail.svg"
              required
            />
            <InputIcon
              type="password"
              name="password"
              placeholder="Пароль"
              icon="/icons/password.svg"
              required
            />
            <Button
              type="submit"
              fontSize={18}
              fontWeight="bold"
              padding="10px"
              styleType="secondary"
              value="Subscribe!"
            >
              Войти
            </Button>
          </Form>
        </LoginFormContainer>
      </Container>
    </PageTemplate>
  );
}

const LoginFormContainer = styled.div`
  width: 40%;
  margin: 0 auto;
  padding: 40px;
  background-color: ${colors.mainColor};
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 15px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  color: ${colors.white};
  font-family: ${lato.style.fontFamily};
  font-size: 32px;
  font-weight: 400;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
