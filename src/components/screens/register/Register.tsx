import { COLORS } from "@/styles/globalStyles";
import { AuthForm } from "@/ui/forms/AuthForm";
import { Container } from "@/ui/layout/Container";
import { FormInput } from "@/ui/forms/inputs/FormInput";
import { ButtonSwitch } from "@/ui/forms/buttons/ButtonSwitch";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineKey,
} from "react-icons/hi2";
import { useAuthStore } from "@/store/AuthStore";
import { observer } from "mobx-react";
import { Loader } from "@/components/layout/Loader";
import { registerUser } from "@/api/AuthApi";
import InputMask from "react-input-mask";
import { FormMask } from "@/ui/forms/inputs/FormMask";

export const RegisterScreen = observer(() => {
  const router = useRouter();
  const authStore = useAuthStore();
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shortPhone = e.target.value.replace(/\D/g, "");
    if (shortPhone.length < 11) {
      e.currentTarget.setCustomValidity("Enter full phone number.");
    } else {
      e.currentTarget.setCustomValidity("");
    }
    setPhone(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onFormSubmit =
    () => async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        await registerUser(email, password, name, surname, phone);
        router.push("/login");
      } catch (e: any) {
        alert(e.response.data.message);
        console.error(e);
      }
    };

  useEffect(() => {
    if (authStore.user.email) {
      router.replace("/profile");
    }
  }, [authStore.user]);

  useEffect(() => {
    if (confirmPasswordRef.current) {
      if (password !== confirmPassword) {
        confirmPasswordRef.current.setCustomValidity(
          "Поле должно совпадать с паролем"
        );
      } else {
        confirmPasswordRef.current.setCustomValidity("");
      }
    }
  }, [password, confirmPassword]);

  return !authStore.firstLoadCompleted ? (
    <Loader />
  ) : (
    <Container>
      <LoginFormContainer>
        <Title>Регистрация</Title>
        <ButtonSwitch
          activeBtn="right"
          leftText="Вход"
          rightText="Регистрация"
          link="/login"
        />
        <ButtonSwitch
          activeBtn="left"
          leftText="Человек"
          rightText="Компания"
          link="/register-company"
        />
        <AuthForm
          action=""
          onFormSubmit={onFormSubmit()}
          btnText="Зарегистрироваться"
          styleType="secondary"
        >
          <Flex>
            <FormInput
              type="text"
              name="fname"
              placeholder="Имя"
              inputValue={name}
              inputOnChange={onNameChange}
              icon={<HiOutlineUser color={COLORS.white} />}
              iconScale={1.5}
              styleType="secondary"
              required
            />
            <FormInput
              type="text"
              name="lname"
              placeholder="Фамилия"
              inputValue={surname}
              inputOnChange={onSurnameChange}
              icon={<HiOutlineUser color={COLORS.white} />}
              iconScale={1.5}
              styleType="secondary"
              required
            />
          </Flex>
          <FormInput
            type="email"
            name="email"
            placeholder="Почта"
            inputValue={email}
            inputOnChange={onEmailChange}
            icon={<HiOutlineEnvelope color={COLORS.white} />}
            iconScale={1.5}
            styleType="secondary"
            required
          />
          <FormMask
            name="tel"
            mask="+7 (999) 999-99-99"
            placeholder="Телефон"
            inputValue={phone}
            inputOnChange={onPhoneChange}
            icon={<HiOutlinePhone color={COLORS.white} />}
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
          <FormInput
            type="password"
            name="confirm_password"
            placeholder="Подтвердите пароль"
            inputValue={confirmPassword}
            inputOnChange={onConfirmPasswordChange}
            inputRef={confirmPasswordRef}
            icon={<HiOutlineKey color={COLORS.white} />}
            iconScale={1.5}
            styleType="secondary"
            required
          />
        </AuthForm>
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

const Flex = styled.div`
  display: flex;
  gap: 20px;
`;
