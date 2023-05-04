import { COLORS } from "@/styles/globalStyles";
import { AuthForm } from "@/ui/forms/AuthForm";
import { Container } from "@/ui/layout/Container";
import { FormInput } from "@/ui/forms/inputs/FormInput";
import { ButtonSwitch } from "@/ui/forms/buttons/ButtonSwitch";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineBuildingOffice2,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineKey,
} from "react-icons/hi2";
import { useAuthStore } from "@/store/AuthStore";
import { observer } from "mobx-react";
import { Loader } from "@/components/layout/Loader";
import { registerCompany } from "@/api/AuthApi";

export const RegisterCompanyScreen = observer(() => {
  const router = useRouter();
  const authStore = useAuthStore();
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        await registerCompany(email, password, companyName, phone);
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
          activeBtn="right"
          leftText="Человек"
          rightText="Компания"
          link="/register"
        />
        <AuthForm
          action=""
          onFormSubmit={onFormSubmit()}
          btnText="Зарегистрироваться"
          styleType="secondary"
        >
          <FormInput
            type="text"
            name="company"
            placeholder="Название компании"
            inputValue={companyName}
            inputOnChange={onCompanyNameChange}
            icon={<HiOutlineBuildingOffice2 color={COLORS.white} />}
            iconScale={1.5}
            styleType="secondary"
            required
          />
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
          <FormInput
            type="tel"
            name="tel"
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
