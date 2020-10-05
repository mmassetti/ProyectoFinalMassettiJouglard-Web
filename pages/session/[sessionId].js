import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";

import { useRouter } from "next/router";
import useSWR from "swr";
import LoteInfo from "../../components/LoteInfo/LoteInfo";

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

function SessionDetail() {
  const classes = useStyles();
  const router = useRouter();
  const { sessionId } = router.query;
  const fetcher = async (...args) => {
    const res = await fetch(...args);

    return res.json();
  };

  const { data, error } = useSWR(`/api/sessions/${sessionId}`, fetcher);

  if (error) return <div>Error al cargar...</div>;
  if (!data) {
    return "Cargando...";
  }

  function goToDashboard(e) {
    router.push("/admin/dashboard");
  }

  const lotesInfo = () => {
    return (
      <>
        {data.lotes.map((lote) => (
          <LoteInfo key={lote.id} descriptionLote={lote.description} />
        ))}
      </>
    );
  };

  return (
    <div>
      <GridItem xs={12} sm={4} md={3}>
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
                Sesión creada el VER QUE ONDA LA FECHA
              </h4>
              <p
                className={classes.cardCategoryWhite}
                style={{ fontWeight: "bold" }}
              >
                Creada por {data.user}
              </p>
            </CardHeader>
          </Card>
          <p>
            <strong>Descripción: </strong> {data.description}
          </p>
        </GridItem>

        {lotesInfo()}
      </GridContainer>
    </div>
  );
}

SessionDetail.layout = Admin;

export default SessionDetail;
