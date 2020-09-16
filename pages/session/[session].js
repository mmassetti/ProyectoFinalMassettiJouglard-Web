import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
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
import { styles } from "./styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "components/CustomButtons/Button.js";
import { useRouter } from "next/router";
const useStyles = makeStyles(styles);

function SessionDetail() {
  const classes = useStyles();
  const router = useRouter();

  const [handleOpen, setHandleOpen] = useState({ open: false });
  const handleClick = () => {
    setHandleOpen({ open: true });
  };
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="dark">
              <h4 className={classes.cardTitleWhite}>
                Sesión {router.query.session}
              </h4>
              <p className={classes.cardCategoryWhite}>
                Creada el 21/02/2019 por Usuario1
              </p>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Lote 1</h4>
            </CardHeader>
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
      </GridContainer>
    </div>
  );
}

SessionDetail.layout = Admin;

export default SessionDetail;
