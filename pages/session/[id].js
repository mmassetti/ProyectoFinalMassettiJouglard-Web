import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Admin from "layouts/Admin.js";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "components/CustomButtons/Button.js";

import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (...args) => {
  console.log("entro al fetcher");
  const res = await fetch(...args);

  return res.json();
};

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
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

function SessionDetail() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/api/session/${id}`, fetcher);

  if (!data) {
    return "Loading...";
  }

  const [handleOpen, setHandleOpen] = useState({ open: false });
  const handleClick = () => {
    setHandleOpen({ open: true });
  };
  const matches = useMediaQuery("(max-width:600px)");

  function goToDashboard(e) {
    router.push("/admin/dashboard");
  }

  return (
    <div>
      <p>Description de la session: {data.description}</p>
      {/* <GridItem xs={12} sm={4} md={3}>
        <Button
          simple
          size="lg"
          color="primary"
          onClick={goToDashboard}
          style={{ paddingLeft: "initial" }}
        >
          <i className="material-icons">chevron_left</i> Volver a lista de
          sesiones
        </Button>
      </GridItem>

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
      </GridContainer> */}
    </div>
  );
}

SessionDetail.layout = Admin;

export default SessionDetail;
