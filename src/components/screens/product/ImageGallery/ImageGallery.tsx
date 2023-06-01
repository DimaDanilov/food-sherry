import { useState, useCallback, memo } from "react";
import styled from "styled-components";
import Image from "next/image";
import { COLORS, SIZES } from "@/styles/globalStyles";

type SmallImageProps = {
  imageUrl: string;
  index: number;
  currentImageID: number;
  onImageClick: (id: number) => void;
};

// Small image of product under main image
const SmallImage = memo(
  ({ imageUrl, index, currentImageID, onImageClick }: SmallImageProps) => {
    const border =
      index === currentImageID ? `6px double ${COLORS.mainColor}` : "none";
    const borderHover =
      index === currentImageID
        ? `6px double ${COLORS.mainColor}`
        : `4px double ${COLORS.mainColor}`;
    const cursor = index === currentImageID ? "default" : "pointer";

    return (
      <CustomSmallImage
        alt=""
        src={imageUrl || "/icons/product_placeholder.svg"}
        width={200}
        height={200}
        onClick={() => onImageClick(index)}
        border={border}
        borderhover={borderHover}
        cursor={cursor}
      />
    );
  }
);

SmallImage.displayName = "SmallImage";

type ImageGalleryProps = {
  imageUrls: string[];
};

export const ImageGallery = ({ imageUrls }: ImageGalleryProps) => {
  const [currentImageID, setCurrentImageID] = useState<number>(0);
  const onImageClick = useCallback((id: number) => {
    setCurrentImageID(id);
  }, []);

  return (
    <GalleryContainer>
      <BigImage
        alt=""
        src={imageUrls[currentImageID] || "/icons/product_placeholder.svg"}
        width={400}
        height={400}
      />
      <GridImages>
        {imageUrls &&
          imageUrls.map((imageUrl, index) => (
            <SmallImage
              key={index}
              imageUrl={imageUrl}
              index={index}
              currentImageID={currentImageID}
              onImageClick={onImageClick}
            />
          ))}
      </GridImages>
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BigImage = styled(Image)`
  width: 100%;
  object-fit: contain;
`;

const GridImages = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 10px;
  @media (max-width: ${SIZES.mobileL}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface CustomSmallImageProps {
  border: string;
  borderhover: string;
  cursor: string;
}

const CustomSmallImage = styled(Image)<CustomSmallImageProps>`
  transition: 0.2s ease-out;
  width: 100%;
  object-fit: cover;
  border: ${(props) => props.border};
  cursor: ${(props) => props.cursor};
  &:hover {
    border: ${(props) => props.borderhover};
  }
`;
