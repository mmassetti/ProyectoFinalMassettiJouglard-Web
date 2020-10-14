import React, { useState } from "react";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import LoteImages from "../LoteImages/LoteImages";
import MinimizeIcon from "@material-ui/icons/Minimize";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import "moment/locale/es";

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

const useStyles = makeStyles(styles);

export default function PasturaInfo(props) {
  const {
    averagePaster,
    averageBefore,
    creationDate,
    description,
    id,
    images,
    totalImagesAfter,
    totalImagesBefore,
    onPasturaImageSelected,
  } = props;

  const [isMinimized, setIsMinimized] = useState(false);

  const classes = useStyles();

  const cardHeader = () => {
    return (
      <CardHeader color="primary">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className={classes.cardTitleWhite}>
            {description} - Creada a las{" "}
            {moment(
              new Date(creationDate._seconds * 1000),
              "dd/mm/yyyy"
            ).format("HH:mm")}{" "}
            hs{" "}
          </h4>
          {isMinimized ? (
            <AddIcon onClick={() => setIsMinimized(false)} />
          ) : (
            <MinimizeIcon
              onClick={() => {
                setIsMinimized(true);
              }}
            />
          )}
        </div>
      </CardHeader>
    );
  };

  const showTextNumberImages = () => {
    if (images.length > 1) {
      return (
        <h5>
          Esta pastura tiene <strong>{images.length} imágenes</strong>
        </h5>
      );
    } else if (images.length === 1) {
      return (
        <h5>
          Esta pastura tiene <strong> 1 imágen </strong>
        </h5>
      );
    } else {
      return (
        <h5>
          Esta pastura todavía <strong> no tiene imágenes</strong>
        </h5>
      );
    }
  };

  const showContent = () => {
    if (isMinimized) {
      return (
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <GridItem xs={12} sm={12} md={12}>
              {cardHeader()}
            </GridItem>
          </Card>
        </GridItem>
      );
    } else {
      return (
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <GridItem xs={12} sm={12} md={12}>
              {cardHeader()}
              {showTextNumberImages()}
            </GridItem>

            <CardBody>
              <LoteImages
                images={images}
                onImageSelected={onPasturaImageSelected}
              />
            </CardBody>
          </Card>
        </GridItem>
      );
    }
  };

  return showContent();
}
