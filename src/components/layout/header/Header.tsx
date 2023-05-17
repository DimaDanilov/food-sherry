import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { COLORS, SIZES } from "@/styles/globalStyles";
import { Icon } from "@/ui/layout/Icon";
import { HiOutlineArrowLeftOnRectangle, HiUserCircle } from "react-icons/hi2";
import { useAuthStore } from "@/store/AuthStore";
import { unlogin } from "@/api/AuthApi";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import { UserModel } from "@/models/User";

export const Header = observer(() => {
  const router = useRouter();
  const authStore = useAuthStore();

  const onExitBtn = () => {
    unlogin();
    authStore.setUser({} as UserModel);
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
        <Nav burgerHoverColor={COLORS.mainHoverDark}>
          <DropDownText>Меню</DropDownText>
          <MainNavUl>
            <MainNavLi
              activeColor={
                router.pathname === "/save-product"
                  ? COLORS.mainActive
                  : COLORS.mainColor
              }
              hoverColor={
                router.pathname === "/save-product"
                  ? COLORS.mainActive
                  : COLORS.mainHoverDark
              }
            >
              <NavLink href="/save-product">Забрать еду</NavLink>
            </MainNavLi>
            {authStore.user.id && (
              <MainNavLi
                activeColor={
                  router.pathname === "/give-product"
                    ? COLORS.mainActive
                    : COLORS.mainColor
                }
                hoverColor={
                  router.pathname === "/give-product"
                    ? COLORS.mainActive
                    : COLORS.mainHoverDark
                }
              >
                <NavLink href="/give-product">Отдать еду</NavLink>
              </MainNavLi>
            )}
            <MainNavLi
              activeColor={
                router.pathname === "/users"
                  ? COLORS.mainActive
                  : COLORS.mainColor
              }
              hoverColor={
                router.pathname === "/users"
                  ? COLORS.mainActive
                  : COLORS.mainHoverDark
              }
            >
              <NavLink href="/users">Пользователи</NavLink>
            </MainNavLi>
            <MainNavLi
              activeColor={
                router.pathname === "/about-us"
                  ? COLORS.mainActive
                  : COLORS.mainColor
              }
              hoverColor={
                router.pathname === "/about-us"
                  ? COLORS.mainActive
                  : COLORS.mainHoverDark
              }
            >
              <NavLink href="/about-us">О нас</NavLink>
            </MainNavLi>
          </MainNavUl>
        </Nav>
      </LeftContainer>

      <NavUl>
        {authStore.user.id && (
          <NavLi onClick={onExitBtn}>
            <Icon
              icon={<HiOutlineArrowLeftOnRectangle color={COLORS.white} />}
              iconScale={2}
            />
          </NavLi>
        )}
        <NavLi>
          <NavLink
            href={
              authStore.user.id
                ? `/profile/${authStore.user.id}?page=1`
                : "/login"
            }
          >
            <Icon icon={<HiUserCircle />} iconScale={2.5} />
          </NavLink>
        </NavLi>
      </NavUl>
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
  padding: 0 3%;
  height: 8vh;
  z-index: 1000;
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 5vw;
  height: 100%;
`;

const DropDownText = styled.span`
  display: none;
  color: white;
  height: 100%;
  padding: 0 20px;
  cursor: pointer;
  transition: 0.3s;
`;

const NavUl = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  height: 100%;
`;

const MainNavUl = styled(NavUl)`
  display: flex;
  gap: 0;
  list-style: none;
  height: 100%;
`;

const NavLi = styled.li`
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NavLink = styled(Link)`
  color: ${COLORS.white};
  white-space: nowrap;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
`;

type NavProps = {
  burgerHoverColor: string;
};

const Nav = styled.nav<NavProps>`
  display: flex;
  align-items: center;
  @media (max-width: 820px) {
    & > ${MainNavUl} {
      display: none;
    }
    & ${NavLink} {
      width: 100%;
    }
    & > ${DropDownText} {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover > ${DropDownText} {
      background-color: ${(props) => props.burgerHoverColor};
    }
    &:hover > ${MainNavUl} {
      display: block;
      position: absolute;
      top: 100%;
    }
  }
`;

type MainNavLiProps = {
  activeColor: string;
  hoverColor: string;
};

const MainNavLi = styled(NavLi)<MainNavLiProps>`
  background-color: ${(props) => props.activeColor};
  & :hover {
    background-color: ${(props) => props.hoverColor};
  }
  & a {
    padding: 0 20px;
  }
`;
