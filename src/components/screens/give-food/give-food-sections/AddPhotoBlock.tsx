import { useState, useEffect } from "react";
import styled from "styled-components";

export default function AddPhotoBlock() {
  const [photoArray, setPhotoArray] = useState<Array<File>>([]);
  let photosElements;

  useEffect(() => {
    photosElements = photoArray.map((photo) => {
      console.log(photo);
      return (
        <img
          alt={photo.name}
          width={"250px"}
          height={"250px"}
          src={URL.createObjectURL(photo)}
        />
      );
    });
  }, [photoArray.length]);

  return (
    <div>
      <input
        type="file"
        name="addImage"
        accept="image/png, image/gif, image/jpeg"
        multiple
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files) {
            let newPhotos: Array<File> = [];
            for (let i = 0; i < event.target.files.length; i++) {
              newPhotos.push(event.target.files[i]);
            }
            setPhotoArray([...photoArray, ...newPhotos]);
          }
        }}
      />
      <PhotosContainer>{photosElements}</PhotosContainer>
    </div>
  );
}

{
  /* {selectedImage && (
  <div>
    <img
      alt="not found"
      width={"250px"}
      src={URL.createObjectURL(selectedImage[selectedImage.length - 1])}
    />
    <br />
    <button onClick={() => setSelectedImage([])}>Remove</button>
  </div>
)} */
}

const PhotosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
