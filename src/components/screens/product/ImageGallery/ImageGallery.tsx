import { useState, useCallback, memo } from "react";
import styled from "styled-components";
import Image from "next/image";
import { COLORS } from "@/styles/globalStyles";

interface IProductImageProps {
  imageUrl: string;
  index: number;
  currentImageID: number;
  onImageClick: (id: number) => void;
}

// Small image of product under main image
const GallerySmallImage = memo(
  ({ imageUrl, index, currentImageID, onImageClick }: IProductImageProps) => {
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
        width={100}
        height={100}
        onClick={() => onImageClick(index)}
        border={border}
        borderhover={borderHover}
        cursor={cursor}
      />
    );
  }
);

export const ImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  const [currentImageID, setCurrentImageID] = useState<number>(0);
  const onImageClick = useCallback((id: number) => {
    setCurrentImageID(id);
  }, []);

  return (
    <GalleryContainer>
      <CustomBigImage
        alt=""
        src={imageUrls[currentImageID] || "/icons/product_placeholder.svg"}
        width={400}
        height={400}
      />
      <GridImages>
        {imageUrls &&
          imageUrls.map((imageUrl, index) => (
            <GallerySmallImage
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

interface ICustomSmallImageProps {
  border: string;
  borderhover: string;
  cursor: string;
}

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CustomSmallImage = styled(Image)<ICustomSmallImageProps>`
  transition: 0.2s ease-out;
  width: 100%;
  height: 100%;
  border: ${(props) => props.border};
  cursor: ${(props) => props.cursor};
  &:hover {
    border: ${(props) => props.borderhover};
  }
`;

const GridImages = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 10px;
`;
const CustomBigImage = styled(Image)`
  width: 100%;
`;
