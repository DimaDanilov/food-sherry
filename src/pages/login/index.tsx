import { lato } from "@/styles/fonts";
import Button from "@/ui/Button";
import { Container } from "@/ui/Container";
import { InputIcon } from "@/ui/InputIcon";
import PageTemplate from "@/ui/PageTemplate";
import styled from "styled-components";

export default function Login() {
  return (
    <PageTemplate>
      <Container>
        <LoginFormContainer>
          <Title>Вход</Title>
          <Title>SWITCH</Title>

          <Form action="">
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
  background-color: #289672;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 15px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  color: white;
  font-family: ${lato.style.fontFamily};
  font-size: 32px;
  font-weight: 400;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
