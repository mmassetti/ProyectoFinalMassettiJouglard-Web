import React from "react";
import Faq from "react-faq-component";

const data = {
  title: "Preguntas frecuentes",
  rows: [
    {
      title: "Lorem ipsum dolor sit amet,",
      content: "Lorem ipsum dolor sit amet, consectetur ",
    },
    {
      title: "Nunc maximus, magna at ultricies elementum",
      content:
        "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam.",
    },
    {
      title: "Curabitur laoreet, mauris vel blandit fringilla",
      content:
        "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc",
    },
    {
      title: "What is the package version",
      content: "v1.0.5",
    },
  ],
};

export default function FAQ() {
  return (
    <div>
      <Faq
        data={data}
        styles={{
          bgColor: "EEEEE",
          titleTextColor: "#48482a",
          rowTitleColor: "#8a2887",
          rowTitleTextSize: "large",
          rowContentColor: "1D1D1D",
          rowContentTextSize: "16px",
          rowContentPaddingTop: "10px",
          rowContentPaddingBottom: "10px",
          rowContentPaddingLeft: "50px",
          rowContentPaddingRight: "150px",
          arrowColor: "black",
        }}
      />
    </div>
  );
}
