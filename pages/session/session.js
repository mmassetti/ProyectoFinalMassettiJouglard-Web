import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AccessTime from "@material-ui/icons/AccessTime";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import { styles } from "./styles";

const useStyles = makeStyles(styles);

function SessionDetail() {
  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="dark">
              <h4 className={classes.cardTitleWhite}>Sesión 1</h4>
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
                    tabContent: <p>Imágenes</p>,
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
