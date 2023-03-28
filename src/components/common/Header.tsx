import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { lato } from "@/styles/fonts";

export default function Header() {
  return (
    <Container>
      <LeftContainer>
        <NavLink href="/">
          <Image
            src="/images/header_logo.svg"
            alt="logo"
            width={133}
            height={40}
          />
        </NavLink>

        <Nav>
          <NavUl>
            <NavLi>
              <NavLink href="/give-food">Забрать еду</NavLink>
            </NavLi>
            <NavLi>
              <NavLink href="/save-food">Отдать еду</NavLink>
            </NavLi>
          </NavUl>
        </Nav>
      </LeftContainer>

      <NavLink href="/profile">
        <Image
          src="/images/profile_placeholder.svg"
          alt="profile"
          width={40}
          height={40}
        />
      </NavLink>
    </Container>
  );
}

const Container = styled.header`
  background-color: #289672;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5% 3%;
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
  color: white;
  overflow: hidden;
  white-space: nowrap;
  font-family: ${lato.style.fontFamily};
  font-size: 18px;
  font-weight: 400;
  text-decoration: none;
`;
