import { lato } from "@/styles/fonts";
import Button from "@/ui/Button";
import { Container } from "@/ui/Container";
import { InputIcon } from "@/ui/InputIcon";
import { FormSwitch } from "@/ui/FormSwitch";
import PageTemplate from "@/ui/PageTemplate";
import styled from "styled-components";

const onFormSubmit = () => (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export default function Register() {
  return (
    <PageTemplate>
      <Container>
        <LoginFormContainer>
          <Title>Регистрация</Title>
          <FormSwitch
            activeBtn="right"
            leftText="Вход"
            rightText="Регистрация"
            link="/login"
          />
          <FormSwitch
            activeBtn="left"
            leftText="Человек"
            rightText="Компания"
            link="/register-company"
          />
          <Form action="" onSubmit={onFormSubmit()}>
            <Flex>
              <InputIcon
                type="text"
                name="fname"
                placeholder="Имя"
                icon="/icons/user.svg"
                required
              />
              <InputIcon
                type="text"
                name="lname"
                placeholder="Фамилия"
                icon="/icons/user.svg"
                required
              />
            </Flex>
            <InputIcon
              type="email"
              name="email"
              placeholder="Почта"
              icon="/icons/mail.svg"
              required
            />
            <InputIcon
              type="tel"
              name="tel"
              placeholder="Телефон"
              icon="/icons/phone.svg"
              required
            />
            <InputIcon
              type="password"
              name="password"
              placeholder="Пароль"
              icon="/icons/password.svg"
              required
            />
            <InputIcon
              type="password"
              name="confirm_password"
              placeholder="Подтвердите пароль"
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

const Flex = styled.div`
  display: flex;
  gap: 20px;
`;
