import { UserShortModel } from "@/api/UserAdapter";
import { COLORS } from "@/styles/globalStyles";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

type UserCardProps = {
  user: UserShortModel;
};

export const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter();

  const handleClick = () => router.push(`/profile/${user.id}`);

  return (
    <Card>
      <CardImage
        src={user.avatar || "/icons/product_placeholder.svg"}
        alt={user.surname || user.companyName}
        width={200}
        height={200}
        onClick={handleClick}
      />
      {user.name || user.surname ? (
        <>
          <span>{user.name} </span>
          <span>{user.surname}</span>
        </>
      ) : (
        <span>{user.companyName}</span>
      )}
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
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
  border-radius: 15px 15px 0 0;
  cursor: pointer;
  width: 100%;
  object-fit: cover;
`;
