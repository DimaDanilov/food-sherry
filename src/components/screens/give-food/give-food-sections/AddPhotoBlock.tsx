import { COLORS } from "@/styles/globalStyles";
import { useState, useCallback } from "react";
import { HiOutlineCamera, HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const MAX_PHOTO_COUNT = 10;

export default function AddPhotoBlock() {
  const [photoArray, setPhotoArray] = useState<Array<File>>([]);

  const handleAddPhotos = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const files = Array.from(event.target.files);
        const newPhotos = files.filter(
          (file) =>
            !(
              photoArray.find((el) => el.lastModified === file.lastModified) !==
                undefined &&
              photoArray.find((el) => el.name === file.name) !== undefined
            )
        );
        if (newPhotos.length > 0) {
          setPhotoArray((prevPhotos) => [
            ...prevPhotos,
            ...newPhotos.slice(0, MAX_PHOTO_COUNT - prevPhotos.length),
          ]);
        } else {
          alert(`No new files added.`);
        }
      }
    },
    [photoArray]
  );

  const handleRemovePhoto = useCallback(
    (index: number) => {
      setPhotoArray((prevPhotos) =>
        prevPhotos.filter((_, currInd) => {
          return currInd !== index;
        })
      );
    },
    [setPhotoArray]
  );

  return (
    <div>
      <PhotoLabel
        htmlFor="addImage"
        bgColor={
          photoArray.length >= MAX_PHOTO_COUNT
            ? COLORS.placeholderMain
            : COLORS.mainColor
        }
      >
        <HiOutlineCamera color={COLORS.white} size={150} />
      </PhotoLabel>

      <InputImage
        type="file"
        id="addImage"
        name="addImage"
        accept="image/png, image/gif, image/jpeg"
        multiple
        disabled={photoArray.length >= MAX_PHOTO_COUNT}
        onChange={handleAddPhotos}
      />

      <PhotosContainer>
        {photoArray.map((photo, index) => (
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
}

const PhotosContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 40px auto;
`;

const Photo = styled.img`
  width: 100%;
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  -moz-box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
  box-shadow: 0px 0px 4px 0px ${COLORS.shadow};
`;

const InputImage = styled.input`
  display: none;
`;

const PhotoLabel = styled.label<{ bgColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
`;

const PhotoEl = styled.div`
  position: relative;
  border-radius: 15px;
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
