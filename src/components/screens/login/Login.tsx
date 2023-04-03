import { COLORS, FONT_SIZE, FONT_WEIGHT } from "@/styles/globalStyles";
import { AuthForm } from "@/ui/AuthForm";
import { Container } from "@/ui/Container";
import { FormInput } from "@/ui/FormInput";
import { FormSwitch } from "@/ui/FormSwitch";
import { useRouter } from "next/router";
import styled from "styled-components";
import { HiOutlineEnvelope, HiOutlineKey } from "react-icons/hi2";

export default function LoginScreen() {
  const router = useRouter();

  const onFormSubmit = () => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/profile");
  };

  return (
    <Container>
      <LoginFormContainer>
        <Title>Вход</Title>
        <FormSwitch
          activeBtn="left"
          leftText="Вход"
          rightText="Регистрация"
          link="/register"
        />
        <AuthForm action="" onFormSubmit={onFormSubmit()} btnText="Войти">
          <FormInput
            type="email"
            name="email"
            placeholder="Почта"
            icon={<HiOutlineEnvelope color={COLORS.white} />}
            iconScale={1.5}
            required
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Пароль"
            icon={<HiOutlineKey color={COLORS.white} />}
            iconScale={1.5}
            required
          />
        </AuthForm>
      </LoginFormContainer>
    </Container>
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
