import React from "react";

import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Admin from "layouts/Admin.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Dashboard() {
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
                    tableData={[
                      ["1", "Dakota Rice", "$36,738", "Niger"],
                      ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                      ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                      ["4", "Philip Chaney", "$38,735", "Korea, South"],
                    ]}
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
                    tableData={[
                      ["1", "Dakota Rice", "$36,738", "Niger"],
                      ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                      ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                      ["4", "Philip Chaney", "$38,735", "Korea, South"],
                    ]}
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

Dashboard.layout = Admin;

export default Dashboard;
