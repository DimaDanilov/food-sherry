import { COLORS } from "@/styles/globalStyles";
import { useCallback, useEffect, useRef } from "react";
import { HiOutlineCamera, HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useGiveProductStore } from "../store/GiveProductStore";
import { observer } from "mobx-react";

const MAX_PHOTO_COUNT = 10;

export const AddPhotoBlock = observer(() => {
  const giveProductStore = useGiveProductStore();

  const photoValidationRef = useRef<HTMLInputElement>(null);

  const handleAddPhotos = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const files = Array.from(event.target.files);
        const newPhotos = files.filter(
          (file) =>
            !(
              giveProductStore.productImages.find(
                (el) => el.lastModified === file.lastModified
              ) !== undefined &&
              giveProductStore.productImages.find(
                (el) => el.name === file.name
              ) !== undefined
            )
        );
        const imgAmountRequired =
          MAX_PHOTO_COUNT - giveProductStore.productImages.length;
        if (newPhotos.length <= 0) {
          alert(`No new files added.`);
        } else {
          if (newPhotos.length <= imgAmountRequired) {
            giveProductStore.updateProductImages([
              ...giveProductStore.productImages,
              ...newPhotos,
            ]);
          } else {
            alert(`You can add only ${imgAmountRequired} more images.`);
          }
        }
      }
    },
    [giveProductStore.productImages]
  );

  const handleRemovePhoto = (index: number) => {
    giveProductStore.updateProductImages(
      giveProductStore.productImages.filter((_, currInd) => {
        return currInd !== index;
      })
    );
  };

  useEffect(() => {
    if (photoValidationRef.current) {
      if (giveProductStore.productImages.length === 0) {
        photoValidationRef.current.setCustomValidity("Загрузите фото");
      } else {
        photoValidationRef.current.setCustomValidity("");
      }
    }
  }, [giveProductStore.productImages.length]);

  return (
    <div>
      <PhotoLabel
        htmlFor="addImage"
        bgColor={
          giveProductStore.productImages.length >= MAX_PHOTO_COUNT
            ? COLORS.placeholderMain
            : COLORS.mainColor
        }
        bgHoverColor={
          giveProductStore.productImages.length >= MAX_PHOTO_COUNT
            ? COLORS.placeholderMain
            : COLORS.mainHoverLight
        }
      >
        <HiOutlineCamera color={COLORS.white} size={150} />
      </PhotoLabel>

      <InputImage
        type="file"
        id="addImage"
        value=""
        name="addImage"
        accept="image/png, image/gif, image/jpeg"
        multiple
        disabled={giveProductStore.productImages.length >= MAX_PHOTO_COUNT}
        onChange={handleAddPhotos}
      />
      <InputRequireMark // Component to make images required
        ref={photoValidationRef}
      />

      <PhotosContainer>
        {giveProductStore.productImages.map((photo, index) => (
          <PhotoEl key={index}>
            <Photo alt={photo.name} src={URL.createObjectURL(photo)} />
            <DeleteIcon
              color={COLORS.white}
              size={35}
              strokeWidth={1}
              onClick={() => handleRemovePhoto(index)}
            />
          </PhotoEl>
        ))}
      </PhotosContainer>
    </div>
  );
});

const PhotosContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 40px auto;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  -moz-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
`;

const InputImage = styled.input`
  display: none;
`;
const InputRequireMark = styled.input`
  // Component to make images required
  opacity: 0;
  width: 100%;
  height: 0px;
`;
const PhotoLabel = styled.label<{ bgColor: string; bgHoverColor: string }>`
  transition: 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.bgHoverColor};
  }
`;

const PhotoEl = styled.div`
  position: relative;
  border-radius: 15px;
  height: 100%;
  cursor: pointer;
  ::after {
    transition: 0.3s;
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    border-radius: 15px;
  }
  &:hover {
    ::after {
      -webkit-box-shadow: 0px 0px 100px 100px ${COLORS.shadow} inset;
      -moz-box-shadow: 0px 0px 100px 100px ${COLORS.shadow} inset;
      box-shadow: 0px 0px 100px 100px ${COLORS.shadow} inset;
    }
    & > svg {
      display: block;
    }
  }
`;
const DeleteIcon = styled(HiXMark)`
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px;
  cursor: pointer;
  z-index: 1;
`;
