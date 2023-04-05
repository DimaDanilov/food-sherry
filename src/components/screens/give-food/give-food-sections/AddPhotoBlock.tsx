import { COLORS } from "@/styles/globalStyles";
import { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import styled from "styled-components";

export default function AddPhotoBlock() {
  const [photoArray, setPhotoArray] = useState<Array<File>>([]);

  return (
    <div>
      <PhotoLabel htmlFor="addImage">
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
            if (event.target.files.length > 10 - photoArray.length) {
              alert(`Only ${10 - photoArray.length} files accepted.`);
              event.preventDefault();
            } else {
              let newPhotos: Array<File> = [];
              for (let i = 0; i < event.target.files.length; i++) {
                newPhotos.push(event.target.files[i]);
              }
              setPhotoArray([...photoArray, ...newPhotos]);
            }
          }
        }}
      />
      <PhotosContainer>
        {photoArray.map((photo) => (
          <Photo
            key={photo.name}
            alt={photo.name}
            src={URL.createObjectURL(photo)}
          />
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
const PhotoLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  background-color: ${COLORS.mainColor};
  cursor: pointer;
`;
