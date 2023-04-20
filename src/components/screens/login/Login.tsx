import { COLORS } from "@/styles/globalStyles";
import { Form } from "@/ui/Form";
import { Container } from "@/ui/Container";
import { FormInput } from "@/ui/FormInput";
import { FormSwitch } from "@/ui/FormSwitch";
import { useRouter } from "next/router";
import styled from "styled-components";
import { HiOutlineEnvelope, HiOutlineKey } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { login } from "@/api/AuthApi";
import { useAuthStore } from "@/store/AuthStore";
import { observer } from "mobx-react";
import Loader from "@/components/layout/Loader";

export const LoginScreen = observer(() => {
  const router = useRouter();
  const authStore = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onFormSubmit =
    () => async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const user = await login(email, password);
      authStore.setUser(user);
    };

  useEffect(() => {
    if (authStore.user.email) {
      router.replace(`/profile/${authStore.user.id}`);
    }
  }, [authStore.user]);

  return !authStore.firstLoadCompleted ? (
    <Loader />
  ) : (
    <Container>
      <LoginFormContainer>
        <Title>Вход</Title>
        <FormSwitch
          activeBtn="left"
          leftText="Вход"
          rightText="Регистрация"
          link="/register"
        />
        <Form
          action=""
          onFormSubmit={onFormSubmit()}
          btnText="Войти"
          styleType="secondary"
        >
          <FormInput
            type="email"
            name="email"
            placeholder="Почта"
            inputValue={email}
            inputOnChange={onLoginChange}
            icon={<HiOutlineEnvelope color={COLORS.white} />}
            iconScale={1.5}
            styleType="secondary"
            required
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Пароль"
            inputValue={password}
            inputOnChange={onPasswordChange}
            icon={<HiOutlineKey color={COLORS.white} />}
            iconScale={1.5}
            styleType="secondary"
            required
          />
        </Form>
      </LoginFormContainer>
    </Container>
  );
});

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
`;
