import { UserModel } from "@/models/User";
import { COLORS } from "@/styles/globalStyles";
import { useState, useEffect } from "react";
import { HiOutlineXCircle, HiUserCircle } from "react-icons/hi2";
import styled from "styled-components";
import { deleteUserPhoto, updateUser, updateUserPhoto } from "@/api/UserApi";
import { useAuthStore } from "@/store/AuthStore";
import { ButtonCommon } from "@/ui/forms/buttons/ButtonCommon";
import { InputUpdateData } from "@/ui/forms/inputs/InputUpdateData";
import Image from "next/image";

type ProfileInfoProps = {
  user: UserModel;
  totalProducts: number;
};

export const ProfileInfo = ({ user, totalProducts }: ProfileInfoProps) => {
  const authStore = useAuthStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>(user.phone);
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatar);
  const [email, setEmail] = useState<string>(user.email);
  const [name, setName] = useState<string>(user.name);
  const [surname, setSurname] = useState<string>(user.surname);
  const [companyName, setCompanyName] = useState<string>(user.companyName);

  const onUserEditClick = async () => {
    try {
      if (isEditMode) {
        await updateUser({
          userId: user.id,
          name,
          surname,
          companyName,
          phone,
          email,
        });
      }
      setIsEditMode(!isEditMode);
    } catch (error) {
      console.error(error);
    }
  };

  const onPhotoUpdate = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const newImageUrl: string = await updateUserPhoto(user.id, file);
        setAvatarUrl(newImageUrl);
      }
    }
  };

  const onPhotoDelete = async () => {
    await deleteUserPhoto(user.id);
    setAvatarUrl("");
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };
  const onCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  useEffect(() => {
    setIsEditMode(false);
    setPhone(user.phone);
    setEmail(user.email);
    setName(user.name);
    setSurname(user.surname);
    setCompanyName(user.companyName);
    setAvatarUrl(user.avatar);
  }, [user]);

  return (
    <div>
      <ProfileBriefData>
        {/* Avatar Image */}
        {user.id === authStore.user.id ? (
          <ImageContainerForButtons>
            <DeletePhotoBtn onClick={onPhotoDelete}>
              <HiOutlineXCircle color={COLORS.mainHoverDark} size={30} />
            </DeletePhotoBtn>
            <FileInput
              type="file"
              id="addAvatar"
              value=""
              name="addAvatar"
              accept="image/png, image/gif, image/jpeg"
              onChange={onPhotoUpdate}
            />
            <EditPhotoBtn htmlFor="addAvatar">
              {avatarUrl ? (
                <AvatarImageContainer>
                  <AvatarImage
                    width={400}
                    height={400}
                    alt=""
                    src={avatarUrl}
                  />
                </AvatarImageContainer>
              ) : (
                <AvatarImagePlaceholder color={COLORS.mainColor} />
              )}
            </EditPhotoBtn>
          </ImageContainerForButtons>
        ) : avatarUrl ? (
          <AvatarImageContainer>
            <AvatarImage width={400} height={400} alt="" src={avatarUrl} />
          </AvatarImageContainer>
        ) : (
          <AvatarImagePlaceholder color={COLORS.mainColor} />
        )}

        {user.name && isEditMode ? (
          <>
            <InputUpdateData
              autoFocus={true}
              type="text"
              name="name"
              value={name}
              onChange={onNameChange}
            />
            <InputUpdateData
              type="text"
              name="surname"
              value={surname}
              onChange={onSurnameChange}
            />
          </>
        ) : (
          <>
            <Title>{name}</Title>
            <Title>{surname}</Title>
          </>
        )}

        {user.companyName && isEditMode ? (
          <InputUpdateData
            autoFocus={true}
            type="text"
            name="companyName"
            value={companyName}
            onChange={onCompanyNameChange}
          />
        ) : (
          <Title>{companyName}</Title>
        )}
      </ProfileBriefData>

      <InfoDetails>
        <h5>Телефон:</h5>
        {isEditMode ? (
          <InputUpdateData
            type="tel"
            name="phone"
            value={phone}
            onChange={onPhoneChange}
          />
        ) : (
          <span>{phone}</span>
        )}
      </InfoDetails>

      <InfoDetails>
        <h5>Почта:</h5>
        {isEditMode ? (
          <InputUpdateData
            type="email"
            name="email"
            value={email}
            onChange={onEmailChange}
          />
        ) : (
          <span>{email}</span>
        )}
      </InfoDetails>

      {user.timeCreated && (
        <>
          <InfoDetails>
            <h5>Помогает с:</h5>
            <span>{new Date(user.timeCreated).toLocaleDateString()}</span>
          </InfoDetails>
        </>
      )}

      {!Number.isNaN(totalProducts) && (
        <InfoDetails>
          <h5>Создал объявлений:</h5>
          <span>{totalProducts}</span>
        </InfoDetails>
      )}

      {user.id === authStore.user.id && (
        <ButtonCommon
          onClick={onUserEditClick}
          styleType="primary"
          padding="8px 0"
        >
          {isEditMode ? "Сохранить редактирование" : "Редактировать"}
        </ButtonCommon>
      )}
    </div>
  );
};

const ProfileBriefData = styled.div`
  margin: 0 auto 20px;
  text-align: center;
`;

const FileInput = styled.input`
  display: none;
`;

const EditPhotoBtn = styled.label`
  cursor: pointer;
`;

const DeletePhotoBtn = styled.label`
  cursor: pointer;
  position: absolute;
  display: none;
  top: 0;
  right: 0;
  z-index: 2;
`;

const ImageContainerForButtons = styled.div`
  position: relative;
  &:hover ${DeletePhotoBtn} {
    display: block;
  }
`;

const AvatarImageContainer = styled.div`
  position: relative;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const AvatarImage = styled(Image)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; /* Make the picture taking the size of it's parent */
  width: 100%; /* This if for the object-fit */
  height: 100%; /* This if for the object-fit */
  object-fit: cover; /* Equivalent of the background-size: cover; of a background-image */
  object-position: center;
  border-radius: 100%;
`;

const AvatarImagePlaceholder = styled(HiUserCircle)`
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  color: ${COLORS.mainColor};
`;

const InfoDetails = styled.div`
  & > h5 {
    color: ${COLORS.mainColor};
  }
  margin: 10px auto;
`;
