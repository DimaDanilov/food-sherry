import { COLORS } from "@/styles/globalStyles";
import { useState } from "react";
import { HiOutlineCamera, HiXMark } from "react-icons/hi2";
import styled from "styled-components";

export default function AddPhotoBlock() {
  const [photoArray, setPhotoArray] = useState<Array<File>>([]);

  return (
    <div>
      <PhotoLabel
        htmlFor="addImage"
        bgColor={
          photoArray.length >= 10 ? COLORS.placeholderMain : COLORS.mainColor
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
        disabled={photoArray.length >= 10}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files) {
            let newPhotos: Array<File> = [];

            for (let i = 0; i < event.target.files.length; i++) {
              const currFile = event.target.files[i];
              if (
                !(
                  photoArray.find(
                    (el) => el.lastModified === currFile.lastModified
                  ) !== undefined &&
                  photoArray.find((el) => el.name === currFile.name) !==
                    undefined
                )
              ) {
                newPhotos.push(event.target.files[i]);
              }
            }

            if (newPhotos.length <= 10 - photoArray.length) {
              setPhotoArray([...photoArray, ...newPhotos]);
            } else {
              alert(`Only ${10 - photoArray.length} files accepted.`);
              event.preventDefault();
            }
          }
        }}
      />

      <PhotosContainer>
        {photoArray.map((photo, index) => (
          <PhotoEl key={index}>
            <Photo alt={photo.name} src={URL.createObjectURL(photo)} />
            <DeleteIcon
              color={COLORS.white}
              size={35}
              strokeWidth={1}
              onClick={() =>
                setPhotoArray(
                  photoArray.filter((_, currInd) => {
                    return currInd !== index;
                  })
                )
              }
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
