import { COLORS, FONT_SIZE, FONT_WEIGHT } from "@/styles/globalStyles";
import { AuthForm } from "@/ui/AuthForm";
import { Container } from "@/ui/Container";
import { FormInput } from "@/ui/FormInput";
import { FormSwitch } from "@/ui/FormSwitch";
import PageTemplate from "@/ui/PageTemplate";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function RegisterCompany() {
  const router = useRouter();

  const onFormSubmit = () => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/login");
  };
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
            activeBtn="right"
            leftText="Человек"
            rightText="Компания"
            link="/register"
          />
          <AuthForm
            action=""
            onSubmit={onFormSubmit()}
            btnText="Зарегистрироваться"
          >
            <FormInput
              type="text"
              name="company"
              placeholder="Название компании"
              icon="/icons/company.svg"
              required
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Почта"
              icon="/icons/mail.svg"
              required
            />
            <FormInput
              type="tel"
              name="tel"
              placeholder="Телефон"
              icon="/icons/phone.svg"
              required
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Пароль"
              icon="/icons/password.svg"
              required
            />
            <FormInput
              type="password"
              name="confirm_password"
              placeholder="Подтвердите пароль"
              icon="/icons/password.svg"
              required
            />
          </AuthForm>
        </LoginFormContainer>
      </Container>
    </PageTemplate>
  );
}

const LoginFormContainer = styled.div`
  width: 40%;
  margin: 0 auto;
  padding: 40px;
  background-color: ${COLORS.mainColor};
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 15px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  color: ${COLORS.white};
  font-size: ${FONT_SIZE.h1};
  font-weight: ${FONT_WEIGHT.h1};
`;
