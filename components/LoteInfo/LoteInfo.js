import React, { useState } from "react";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ImagesCarousel from "components/LoteTabs/ImagesCarousel";
import AccessTime from "@material-ui/icons/AccessTime";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

export default function LoteInfo(props) {
  const { data } = props;

  const classes = useStyles();

  const [handleOpen, setHandleOpen] = useState({ open: false });
  const handleClick = () => {
    setHandleOpen({ open: true });
  };
  const matches = useMediaQuery("(max-width:600px)");

  return (
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
                  <GridItem xs={6} sm={6} md={6}>
                    <CardFooter>
                      <Button color="success" onClick={handleClick}>
                        Ver imágenes
                      </Button>
                    </CardFooter>

                    <ImagesCarousel
                      isMobile={matches}
                      handleOpen={handleOpen}
                      setHandleOpen={setHandleOpen}
                    />
                  </GridItem>
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
  );
}
