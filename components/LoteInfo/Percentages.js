import React from "react";
import "react-circular-progressbar/dist/styles.css";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem.js";
import PercentagesCard from "./PercentagesCard/PercentagesCard";

export default function Percentages(props) {
  const { imageData } = props;

  const showPercentages = () => {
    return (
      <>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <PercentagesCard
                percentages={imageData.before.percentages}
                title={imageData.after ? "- Antes" : ""}
              />
            </GridItem>

            {imageData.after ? (
              <GridItem xs={12} sm={12} md={6}>
                <PercentagesCard
                  percentages={imageData.after.percentages}
                  title="- Después"
                />
              </GridItem>
            ) : (
              ""
            )}
          </GridContainer>
        </div>
      </>
    );
  };

  return <>{showPercentages()}</>;
}
