import React from "react";
import Gallery from "react-grid-gallery";

export default function SideImageInfo(props) {
  const { imageNumber, imageData } = props;

  const loteGallery = (imagesForGallery) => {
    return (
      <div
        style={{
          display: "block",
          minHeight: "1px",
          width: "100%",
          border: "1px solid #ddd",
          overflow: "auto",
        }}
      >
        <Gallery
          images={imagesForGallery}
          enableImageSelection={false}
          enableLightbox={false}
          //   onClickThumbnail={(index) => {
          //     props.onImageSelected(index + 1, imagesForGallery[index].src);
          //   }}
        />
      </div>
    );
  };

  const relatedImages = () => {
    let imagesForGallery = [];

    imagesForGallery.push({
      src: imageData.before.uri,
      thumbnail: imageData.before.uri,
      thumbnailWidth: 243,
      thumbnailHeight: 190,
      caption: "Imágen antes",
    });

    if (imageData.after) {
      imagesForGallery.push({
        src: imageData.after.uri,
        thumbnail: imageData.after.uri,
        thumbnailWidth: 243,
        thumbnailHeight: 190,
        caption: "Imágen después",
      });
    }

    return loteGallery(imagesForGallery);
  };

  return (
    <>
      <h6>
        <strong>Imágen {imageNumber}</strong>
      </h6>
      {relatedImages()}
    </>
  );
}
