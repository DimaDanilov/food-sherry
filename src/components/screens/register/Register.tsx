import { COLORS, FONT_SIZE } from "@/styles/globalStyles";
import { Form } from "@/ui/Form";
import { Container } from "@/ui/Container";
import { FormInput } from "@/ui/FormInput";
import { FormSwitch } from "@/ui/FormSwitch";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineKey,
} from "react-icons/hi2";

export default function RegisterScreen() {
  const router = useRouter();

  const onFormSubmit = () => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/login");
  };
  return (
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
        <Form
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
              icon={<HiOutlineUser color={COLORS.white} />}
              iconScale={1.5}
              styleType="secondary"
              required
            />
            <FormInput
              type="text"
              name="lname"
              placeholder="Фамилия"
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
            icon={<HiOutlineEnvelope color={COLORS.white} />}
            iconScale={1.5}
            styleType="secondary"
            required
          />
          <FormInput
            type="tel"
            name="tel"
            placeholder="Телефон"
            icon={<HiOutlinePhone color={COLORS.white} />}
            iconScale={1.5}
            styleType="secondary"
            required
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Пароль"
            icon={<HiOutlineKey color={COLORS.white} />}
            iconScale={1.5}
            styleType="secondary"
            required
          />
          <FormInput
            type="password"
            name="confirm_password"
            placeholder="Подтвердите пароль"
            icon={<HiOutlineKey color={COLORS.white} />}
            iconScale={1.5}
            styleType="secondary"
            required
          />
        </Form>
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
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;
`;
