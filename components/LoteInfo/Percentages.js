import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

import CardIcon from "../../components/Card/CardIcon.js";
import CardFooter from "../../components/Card/CardFooter.js";

import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import Store from "@material-ui/icons/Store";

const cardStyle = { width: "20rem" };

export default function Percentages(props) {
  const { imageData } = props;

  const percentage = 66;

  const useStyles = makeStyles(styles);

  const showPercentages = () => {
    const classes = useStyles();

    return (
      <>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}></GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  <h4>
                    {" "}
                    <strong>Porcentajes de cobertura</strong> - Antes{" "}
                  </h4>
                </div>
                {/* <div>
                  <h5>Porcentajes de cobertura</h5>
                </div> */}
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: 110,
                        height: 110,
                        marginBottom: 30,
                        marginRight: 10,
                      }}
                    >
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={5}
                      />
                    </div>
                    <div
                      style={{
                        width: 110,
                        height: 110,
                        marginBottom: 30,
                        marginRight: 10,
                      }}
                    >
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={{
                          // Customize the root svg element
                          root: {},
                          // Customize the path, i.e. the "completed progress"
                          path: {
                            // Path color
                            stroke: `green`,
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: "butt",
                            // Customize transition animation
                            transition: "stroke-dashoffset 0.5s ease 0s",
                            // Rotate the path
                            transform: "rotate(0.25turn)",
                            transformOrigin: "center center",
                          },
                          // Customize the circle behind the path, i.e. the "total progress"
                          trail: {
                            // Trail color
                            stroke: "#d6d6d6",
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: "butt",
                            // Rotate the trail
                            transform: "rotate(0.25turn)",
                            transformOrigin: "center center",
                          },
                          // Customize the text
                          text: {
                            // Text color
                            fill: "green",
                            // Text size
                            fontSize: "22px",
                          },
                        }}
                      />
                    </div>
                    <div style={{ width: 110, height: 110, marginBottom: 30 }}>
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                      />
                    </div>
                  </div>

                  {/* <h4 className={classes.cardTitle}>Imagen 1 - Antes</h4>
                  <p className={classes.cardCategory}>
                    increase in today sales.
                  </p> */}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </>
    );
  };

  return <>{showPercentages()}</>;
}
