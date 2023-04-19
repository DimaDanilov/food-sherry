import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { COLORS } from "@/styles/globalStyles";
import { Icon } from "@/ui/Icon";
import { HiUserCircle } from "react-icons/hi2";
import { User, useAuthStore } from "@/store/AuthStore";
import { unlogin } from "@/api/AuthRest";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

export const Header = observer(() => {
  const router = useRouter();
  const authStore = useAuthStore();

  const onExitBtn = () => {
    unlogin();
    authStore.setUser({} as User);
    router.push("/login");
  };
  return (
    <Container>
      <LeftContainer>
        <NavLink href="/">
          <Image
            src="/icons/header_logo.svg"
            alt="logo"
            width={133}
            height={40}
          />
        </NavLink>
        <Nav>
          <NavUl>
            <NavLi>
              <NavLink href="/save-food">Забрать еду</NavLink>
            </NavLi>
            <NavLi>
              <NavLink href="/give-food">Отдать еду</NavLink>
            </NavLi>
            {authStore.user.email && (
              <NavLi>
                <button onClick={onExitBtn}>Выйти</button>
              </NavLi>
            )}
          </NavUl>
        </Nav>
      </LeftContainer>

      <NavLink href={authStore.user.email ? "/profile" : "/login"}>
        <Icon icon={<HiUserCircle />} iconScale={2.5} />
      </NavLink>
    </Container>
  );
});

const Container = styled.header`
  position: sticky;
  width: 100%;
  top: 0;
  background-color: ${COLORS.mainColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5% 3%;
  height: 8vh;
  z-index: 1;
`;
const LeftContainer = styled.div`
  display: flex;
  gap: 5vw;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
`;
const NavUl = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  height: 100%;
`;
const NavLi = styled.li`
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
`;
const NavLink = styled(Link)`
  color: ${COLORS.white};
  white-space: nowrap;
`;
