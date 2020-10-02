import { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import loadFirebase from "../../configuration/firebaseconfig";
import moment from "moment";
import "moment/locale/es";
import PageChange from "../../components/PageChange/PageChange";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import BugReport from "@material-ui/icons/BugReport";
import useSWR from "swr";
import Link from "next/link";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

function Dashboard({ fetchedSessions }) {
  const [sessions, setSessions] = useState(fetchedSessions);
  const classes = useStyles();
  const fetcher = async (...args) => {
    const res = await fetch(...args);

    return res.json();
  };

  const { data, error } = useSWR(`/api/sessions/`, fetcher);

  if (error) return <div>Error al cargar...</div>;
  if (!data) {
    return "Cargando...";
  }

  // useEffect(() => {
  //   async function loadData() {
  //     const result = await getSessions();
  //     setSessions(result);
  //     // setSessions(Object.values(result));
  //   }

  //   if (fetchedSessions.length == 0) {
  //     loadData();
  //   }
  // }, []);

  // if (!sessions[0]) {
  //   return <PageChange showText={false} />;
  // }

  let tableData = getTableData(data);

  return (
    <div>
      {tableData && tableData.length > 0 ? (
        <>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="dark">
                  <h4 className={classes.cardTitleWhite}>Sesiones</h4>
                  <p className={classes.cardCategoryWhite}>
                    Lista de sesiones creadas en la aplicación móvil.
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={[
                      { title: "Id", field: "id" },
                      { title: "Descripción", field: "description" },
                      { title: "Fecha", field: "date" },
                      { title: "Creada por", field: "creator" },
                    ]}
                    tableData={tableData}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </>
      ) : (
        <>
          <h1 style={{ fontWeight: "bold" }}>
            {" "}
            Todavía no hay sesiones creadas
          </h1>
          <h3>
            {" "}
            ¡Bajá la{" "}
            <a
              //TODO: Poner link a a la app en el href
              href=""
              target="_blank"
            >
              app
            </a>{" "}
            y comenzá a crearlas!
          </h3>
          {/* <h3>¡Bajá la app y comenzá a crearlas!</h3> */}
        </>
      )}
    </div>
  );
}

//TODO: REFACTOR: Move to its own service
function getTableData(data) {
  let tableData = [];
  let i = 1;
  let sessionsArray = Object.values(data);

  if (data && sessionsArray) {
    sessionsArray.map((session) => {
      tableData.push({
        // id: i.toString(),
        id: session.id,
        description: session.description,
        date: "21/08/2019", // moment(session.date.toDate()).format("LL"),
        creator: session.user,
      });
      i++;
    });
  }

  return tableData;
}

//TODO: REFACTOR Move to (shared/services/firebaseService) ?

async function getSessions() {
  // const firebase = await loadFirebase();
  // const db = firebase.firestore();
  // let result = await new Promise((resolve, reject) => {
  //   db.collection("sessions")
  //     .orderBy("date", "desc")
  //     .get()
  //     .then((snapshot) => {
  //       let data = [];
  //       snapshot.forEach((doc) => {
  //         data.push(
  //           Object.assign(
  //             {
  //               id: doc.id,
  //             },
  //             doc.data()
  //           )
  //         );
  //       });
  //       resolve(data);
  //     })
  //     .catch((error) => {
  //       reject([]);
  //     });
  // });
  // return result;
}

// Dashboard.getInitialProps = async (ctx) => {
//   if (!ctx.req) {
//     return { fetchedSessions: [] };
//   }
//   const result = await getSessions();
//   return { fetchedSessions: Object.values(result) };
// };

Dashboard.layout = Admin;

export default Dashboard;
