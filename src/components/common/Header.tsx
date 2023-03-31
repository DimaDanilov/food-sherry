import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { COLORS, FONT_SIZE } from "@/styles/globalStyles";

export default function Header() {
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
          </NavUl>
        </Nav>
      </LeftContainer>

      <NavLink href="/login">
        <Image
          src="/icons/profile_placeholder.svg"
          alt="profile"
          width={40}
          height={40}
        />
      </NavLink>
    </Container>
  );
}

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
  overflow: hidden;
  white-space: nowrap;
  font-size: ${FONT_SIZE.p};
  text-decoration: none;
`;
