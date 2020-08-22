import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import loadFirebase from "../../configuration/firebaseconfig";
import moment from "moment";
import "moment/locale/es";

function Dashboard({ sessions }) {
  //TODO: REFACTOR
  let tableData = [];
  let i = 1;

  sessions.map((session) => {
    tableData.push([
      i.toString(),
      session.description,
      moment(session.date.toDate()).format("LL"),
      session.user,
    ]);
    i++;
  });

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Sesiones:"
            headerColor="dark"
            tabs={[
              {
                tabName: "Mías",
                tabIcon: BugReport,
                tabContent: (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["ID", "Descripción", "Fecha", "Usuario"]}
                    tableData={tableData}
                  />
                ),
              },
              {
                tabName: "Todas",
                tabIcon: Code,
                tabContent: (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["ID", "Descripción", "Fecha", "Usuario"]}
                    tableData={tableData}
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

//TODO: REFACTOR (shared/services/firebaseService)
Dashboard.getInitialProps = async () => {
  const firebase = await loadFirebase();
  const db = firebase.firestore();
  let result = await new Promise((resolve, reject) => {
    db.collection("sessions")
      .get()
      .then((snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
          data.push(
            Object.assign(
              {
                id: doc.id,
              },
              doc.data()
            )
          );
        });
        resolve(data);
      })
      .catch((error) => {
        reject([]);
      });
  });
  return { sessions: Object.values(result) };
};

Dashboard.layout = Admin;

export default Dashboard;
