import React, { useState } from "react";
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
import DescriptionIcon from "@material-ui/icons/Description";
import EventIcon from "@material-ui/icons/Event";
import PersonIcon from "@material-ui/icons/Person";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import SessionNoteModal from "../../components/Modal/SessionNoteModal";
import moment from "moment";
import "moment/locale/es";
import { getAllSessions, getSessionDetails } from "../../lib/db-admin";
import { removeItemFromArrayByDescription } from "../../lib/db-client";

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
  rows: {
    display: "inline-block",
  },
  row: {
    display: "inline-block",
  },
};

const useStyles = makeStyles(styles);

// This function gets called at build time
export async function getStaticPaths() {
  const sessions = await getAllSessions();

  //Get the paths we want to pre-render based on sessionsIds
  const paths = sessions.map((session) => ({
    params: { sessionId: session.sessionDetailId },
  }));

  // We'll pre-render only these paths at build time.
  //{ fallback: false } means other routes should 404.
  // fallback: true will generate that path for next time
  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { sessionId } = params;

  let sessionDetails = await getSessionDetails(sessionId);
  sessionDetails = JSON.stringify(sessionDetails);

  return {
    props: { sessionDetails }, // will be passed to the page component as props
    revalidate: 1, // In seconds
  };
}

function SessionDetail({ sessionDetails }) {
  const classes = useStyles();
  const [showNotes, setShowNotes] = useState(false);
  const router = useRouter();

  if (router.isFallback) return <h3> Cargando... </h3>;

  //TODO: Poner esto en un use Effect?
  let sessionDetailsJSON = JSON.parse(sessionDetails);

  //Only make request if sessionDetailsJson lotes length > 0 ?
  const { data: dataLotes, error: errorLotes } = useSWR(
    "/api/lotesDetails/" + router.query.sessionId,
    { refreshInterval: 1000 }
  );

  if (!dataLotes) {
    return <h3>Cargando...</h3>;
  }

  if (errorLotes) {
    return <h3>Error al obtener la información de los lotes</h3>;
  }

  function goToDashboard(e) {
    router.push("/admin/sesiones");
  }

  const lotesInfo = () => {
    dataLotes.sort(
      (a, b) =>
        new Date(b.loteData.creationDate._seconds * 1000).getTime() -
        new Date(a.loteData.creationDate._seconds * 1000).getTime()
    );

    if (dataLotes.length > 0) {
      return (
        <>
          {dataLotes.map((lote) => (
            <LoteInfo key={lote.id} {...lote} />
          ))}
        </>
      );
    } else {
      //La sesión no tiene lotes
      return (
        <GridItem xs={12} sm={12} md={12}>
          <h4>
            Esta sesión todavía <strong>no tiene ningún lote</strong> cargado.
            ¡Comenza a crearlos desde la aplicación móvil!
          </h4>
        </GridItem>
      );
    }
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
        <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 20 }}>
          <Card plain>
            <CardHeader plain color="dark">
              <h4 className={classes.cardTitleWhite}>
                <EventIcon style={{ marginBottom: -5 }} /> Sesión creada el{" "}
                <strong>
                  {moment(
                    new Date(sessionDetailsJSON.date._seconds * 1000)
                  ).format("L")}
                </strong>{" "}
                a las{" "}
                {moment(
                  new Date(sessionDetailsJSON.date._seconds * 1000),
                  "dd/mm/yyyy"
                ).format("HH:mm")}{" "}
                hs
              </h4>
              <p className={classes.cardCategoryWhite}>
                <PersonIcon style={{ marginBottom: -4 }} /> Creada por{" "}
                <strong>{sessionDetailsJSON.user}</strong>
              </p>
            </CardHeader>
          </Card>

          {/* Session Description and Notes */}
          <div className={classes.rows}>
            <div className={classes.row} style={{ marginBottom: 2 }}>
              <DescriptionIcon style={{ marginBottom: -2 }} />{" "}
              <strong>Descripción: </strong>
              {sessionDetailsJSON.description}
            </div>
            <div className="row" onClick={() => setShowNotes(true)}>
              <SpeakerNotesIcon style={{ marginBottom: -2 }} />{" "}
              <a href="#" style={{ color: "black" }}>
                Ver{" "}
                <strong style={{ textDecoration: "underline" }}>
                  notas ({sessionDetailsJSON.notes.length})
                </strong>{" "}
                de la sesión
              </a>
            </div>
          </div>
        </GridItem>

        {showNotes ? (
          <SessionNoteModal
            onDelete={async (note) => {
              await removeItemFromArrayByDescription(
                "notes",
                "sessionsDetails",
                sessionDetailsJSON.id,
                note
              );
            }}
            onCloseModal={async () => {
              setShowNotes(false);
            }}
            title="Notas de la sesión"
            notes={sessionDetailsJSON.notes}
            sessionDetailsId={sessionDetailsJSON.id}
          />
        ) : (
          ""
        )}

        {lotesInfo()}
      </GridContainer>
    </div>
  );
}

SessionDetail.layout = Admin;

export default SessionDetail;
