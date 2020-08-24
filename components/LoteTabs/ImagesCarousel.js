import React from "react";

import { red, blue, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import test1 from "../../assets/img/test1.jpeg";

const ImagesCarousel = ({ handleOpen, setHandleOpen, isMobile }) => {
  return (
    <div>
      <AutoRotatingCarousel
        label="Cerrar"
        open={handleOpen.open}
        onClose={() => setHandleOpen({ open: false })}
        onStart={() => setHandleOpen({ open: false })}
        autoplay={false}
        mobile={isMobile}
        style={{ position: "absolute" }}
      >
        <Slide
          media={<img src={test1} />}
          mediaBackgroundStyle={{ backgroundColor: red[400] }}
          style={{ backgroundColor: red[600] }}
          title="Cubrimiento"
          subtitle="Mostrar porcentajes de Vivo, Seco, Muerto."
        />
        <Slide
          media={
            <img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />
          }
          mediaBackgroundStyle={{ backgroundColor: blue[400] }}
          style={{ backgroundColor: blue[600] }}
          title="Ever wanted to be popular?"
          subtitle="Well just mix two colors and your are good to go!"
        />
        <Slide
          media={
            <img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" />
          }
          mediaBackgroundStyle={{ backgroundColor: green[400] }}
          style={{ backgroundColor: green[600] }}
          title="May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
        />
      </AutoRotatingCarousel>
    </div>
  );
};

export default ImagesCarousel;
