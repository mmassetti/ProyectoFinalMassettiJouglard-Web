import React from "react";
import Gallery from "react-grid-gallery";
import Percentages from "./Percentages";

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
          backdropClosesModal={true}
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
      caption: imageData.after
        ? "Imágen " + imageNumber + " - Antes"
        : "Imágen " + imageNumber,
    });

    if (imageData.after) {
      imagesForGallery[0].tags = [{ value: "Antes", title: "Antes" }];

      imagesForGallery.push({
        src: imageData.after.uri,
        thumbnail: imageData.after.uri,
        thumbnailWidth: 243,
        thumbnailHeight: 190,
        caption: "Imágen " + imageNumber + " - Después",
        tags: [{ value: "Después", title: "Después" }],
      });
    }

    return loteGallery(imagesForGallery);
  };

  const imagesCover = () => {
    return <Percentages imageData={imageData} />;
  };

  return (
    <>
      <h6>
        <strong>Imágen {imageNumber} - Detalles</strong>
      </h6>
      {relatedImages()}
      {imagesCover()}
    </>
  );
}
