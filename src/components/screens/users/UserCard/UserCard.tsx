import { UserShortModel } from "@/api/UserAdapter";
import { COLORS } from "@/styles/globalStyles";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

type UserCardProps = {
  user: UserShortModel;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <CardLink href={`/profile/${user.id}`}>
      <Card>
        <CardImage
          src={user.avatar || "/icons/avatar_placeholder.svg"}
          alt={user.surname || user.companyName}
          width={80}
          height={80}
        />
        <CardContent>
          {user.name || user.surname ? (
            <h4>
              {user.name} {user.surname}
            </h4>
          ) : (
            <h4>{user.companyName}</h4>
          )}
        </CardContent>
      </Card>
    </CardLink>
  );
};

const CardLink = styled(Link)``;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 10px;
  transition: 0.15s;
  border-radius: 15px;
  background-color: ${COLORS.white};
  -webkit-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  -moz-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  overflow-wrap: anywhere;
  box-sizing: border-box;
  &:hover {
    transform: scale(1.005);
    -webkit-box-shadow: 0px 0px 9px 0px ${COLORS.shadow};
    -moz-box-shadow: 0px 0px 9px 0px ${COLORS.shadow};
    box-shadow: 0px 0px 9px 0px ${COLORS.shadow};
  }
`;

const CardImage = styled(Image)`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
