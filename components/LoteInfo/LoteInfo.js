import React, { useState } from "react";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AccessTime from "@material-ui/icons/AccessTime";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import { makeStyles } from "@material-ui/core/styles";
import Gallery from "react-grid-gallery";

const styles = {
  cardCategoryWhite: {
    color: "rgb(239,219,46)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const IMAGES = [
  {
    src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
    thumbnail:
      "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
    thumbnailWidth: 243,
    thumbnailHeight: 190,
    caption: "286H (gratisography.com)",
  },
  {
    src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    thumbnail:
      "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
    thumbnailWidth: 243,
    thumbnailHeight: 190,
    caption: "201H (gratisography.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
    thumbnail:
      "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
    thumbnailWidth: 244,
    thumbnailHeight: 190,
    caption: "Big Ben (Tom Eversley - isorepublic.com)",
  },
];

const useStyles = makeStyles(styles);

export default function LoteInfo(props) {
  const { data } = props;

  const classes = useStyles();

  const showImageInfo = (index) => {
    console.log("show image info for index: ", index);
  };

  return (
    <>
      <GridItem xs={12} sm={12} md={6}>
        <Card chart>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{data.description} </h4>
          </CardHeader>
          <GridItem xs={12} sm={12} md={12}>
            <h5>
              <strong>{data.images.length} imágenes</strong> y{" "}
              <strong>{data.pasturas.length} pasturas</strong> asociadas
            </h5>
          </GridItem>

          <CardBody>
            <CustomTabs
              title="Ver:"
              headerColor="dark"
              tabs={[
                {
                  tabName: "Cubrimiento",
                  tabIcon: BugReport,
                  tabContent: <p>Cubrimiento</p>,
                },
                {
                  tabName: "Imágenes",
                  tabIcon: Code,
                  tabContent: (
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
                        images={IMAGES}
                        enableImageSelection={false}
                        enableLightbox={false}
                        onClickThumbnail={(index) => {
                          showImageInfo(index);
                        }}
                      />
                    </div>
                  ),
                },
                {
                  tabName: "Notas",
                  tabIcon: Cloud,
                  tabContent: <p>Notas</p>,
                },
              ]}
            />
          </CardBody>
          <CardFooter chart>
            <div className={classes.stats}>
              <AccessTime /> Actualizado por última vez el 21/08/2020
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <h5>
          <strong>Seleccióna una imágen</strong> para mostrar su información
        </h5>
      </GridItem>
    </>
  );
}
