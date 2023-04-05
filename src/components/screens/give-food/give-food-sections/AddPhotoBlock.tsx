import { useState } from "react";
import styled from "styled-components";

export default function AddPhotoBlock() {
  const [photoArray, setPhotoArray] = useState<Array<File>>([]);

  return (
    <div>
      <input
        type="file"
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
  border: 1px solid blue;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Photo = styled.img`
  width: 100%;
`;
