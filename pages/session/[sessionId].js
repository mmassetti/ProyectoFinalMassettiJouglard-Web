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

function SessionDetail({ sessionDetails, lotesInfos }) {
  console.log("SessionDetail -> lotesInfos", lotesInfos);
  console.log("SessionDetail -> sessionDetails", sessionDetails);
  const classes = useStyles();
  const router = useRouter();
  // const { sessionId } = router.query;
  const fetcher = async (...args) => {
    const res = await fetch(...args);

    return res.json();
  };

  // const { data: dataSession, error: errorSession } = useSWR(
  //   `/api/sessions/${sessionId}`,
  //   fetcher
  // );

  // const { data: dataLotes, error: errorLotes } = useSWR(
  //   `/api/lotes/${sessionId}`,
  //   fetcher
  // );

  // if (errorSession) return <div>Error al cargar...</div>;
  // if (!dataSession) {
  //   return "Cargando...";
  // }

  function goToDashboard(e) {
    router.push("/admin/dashboard");
  }

  // const lotesInfo = () => {
  //   return (
  //     <>
  //       {dataSession.lotes.map((lote) => (
  //         <LoteInfo key={lote.id} descriptionLote={lote.description} />
  //       ))}
  //     </>
  //   );
  // };

  return (
    <div>
      <p> test </p>
      {/* <p>{dataLotes.length}</p> */}
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
                Sesión creada el VER QUE ONDA LA FECHA
              </h4>
              <p
                className={classes.cardCategoryWhite}
                style={{ fontWeight: "bold" }}
              >
                Creada por {dataSession.user}
              </p>
            </CardHeader>
          </Card>
          <p>
            <strong>Descripción: </strong> {dataSession.description}
          </p>
        </GridItem>

        {lotesInfo()} 
      </GridContainer> */}
    </div>
  );
}
// This function gets called at build time
export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3000/api/sessions`);
  const sessions = await res.json();
  // console.log("getStaticPaths -> sessionDetailsData", sessions);

  //Get the paths we want to pre-render based on posts
  const paths = sessions.map((session) => ({
    params: { sessionId: session.id },
  }));

  // We'll pre-render only these paths at build time.
  //{ fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { sessionId } = params;

  const res = await fetch(
    `http://localhost:3000/api/sessionsDetails/${sessionId}`
  );
  const sessionDetails = await res.json();

  let lotesInfos = [];
  if (sessionDetails) {
    sessionDetails.data.lotes.map(async (lote) => {
      let resLotesDetails = await fetch(
        `http://localhost:3000/api/lotesDetails/${lote.id}`
      );
      lotesInfos.push(await resLotesDetails.json());
    });
  }

  // console.log("getStaticProps -> sessionDetails", sessionDetails);

  return {
    props: { sessionDetails, lotesInfos }, // will be passed to the page component as props
  };
}

SessionDetail.layout = Admin;

export default SessionDetail;
