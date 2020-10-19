import React, { useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AccessTime from "@material-ui/icons/AccessTime";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import { makeStyles } from "@material-ui/core/styles";
import LoteImages from "../LoteImages/LoteImages";
import SideImageInfo from "./SideImageInfo";
import LotePasturas from "../LotePasturas/LotePasturas";
import MinimizeIcon from "@material-ui/icons/Minimize";
import AddIcon from "@material-ui/icons/Add";
import ImageIcon from "@material-ui/icons/Image";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import moment from "moment";
import "moment/locale/es";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteLote } from "../../lib/db-client";

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

export default function LoteInfo(props) {
  const { data, detailDocRef } = props;
  const [showSideImageInfo, setShowSideImageInfo] = useState(false);
  const [imageData, setImageData] = useState("");
  const [imageNumber, setImageNumber] = useState("");
  const [showHelp, setShowHelp] = useState(true);
  const [pasturasDetails, setPasturasDetails] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const classes = useStyles();

  async function handleDeleteLote(loteId) {
    return confirmAlert({
      title: "Eliminar lote",
      message:
        "¡Atención! Se eliminará este lote junto a sus imágenes y pasturas asociadas, tanto aquí como en la aplicación móvil.",
      buttons: [
        {
          label: "Si, eliminar lote",
          onClick: async () => {
            props.onLoteDeleted();
            await deleteLote(detailDocRef, loteId, pasturasDetails);
          },
        },
        {
          label: "No eliminar",
          onClick: () => {},
        },
      ],
    });
  }

  function showSideInfo(imageNumber, imageData) {
    setImageData(imageData);
    setImageNumber(imageNumber);
    setShowSideImageInfo(true);
    setShowHelp(false);
  }

  const showLoteImageInfo = (imageNumber, imageData) => {
    showSideInfo(imageNumber, imageData);
  };

  const showPasturaImageInfo = (imageNumber, imageData) => {
    //The code is the same that for a lote but I need to know the difference of the method's name for other components (smell code maybe)
    showSideInfo(imageNumber, imageData);
  };

  useEffect(() => {
    let pasturasUrl = "";
    if (data.pasturas && data.pasturas.length > 0) {
      data.pasturas.map((pastura) => {
        pasturasUrl = pasturasUrl + "/" + pastura.id;
      });

      async function getPasturasDetails() {
        let res = await fetch(`/api/pasturasDetails` + pasturasUrl);
        let pasturasDetails = await res.json();
        setPasturasDetails(pasturasDetails);
      }

      getPasturasDetails();
    }
  }, []);

  const cardHeader = () => {
    return (
      <CardHeader color="primary">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className={classes.cardTitleWhite}>
            {data.description} - Creado a las{" "}
            {moment(
              new Date(data.creationDate._seconds * 1000),
              "dd/mm/yyyy"
            ).format("HH:mm")}{" "}
            hs
          </h4>
          {isMinimized ? (
            <AddIcon onClick={() => setIsMinimized(false)} />
          ) : (
            <MinimizeIcon
              onClick={() => {
                setIsMinimized(true);
              }}
            />
          )}
        </div>
      </CardHeader>
    );
  };

  const cardFooter = () => {
    return (
      <CardFooter chart>
        <div>
          <DeleteIcon
            onClick={() => {
              handleDeleteLote(data.id);
            }}
            color="error"
            style={{ marginBottom: -2 }}
          />{" "}
          <strong>Eliminar lote</strong>
        </div>
      </CardFooter>
    );
  };

  const showContent = () => {
    if (isMinimized) {
      return (
        <>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              {cardHeader()}
              {cardFooter()}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}></GridItem>
        </>
      );
    } else {
      return (
        <>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              {cardHeader()}
              <GridItem xs={12} sm={12} md={12}>
                <h5>
                  <strong>{data.images.length} imágenes</strong> y{" "}
                  <strong>{data.pasturas.length} pasturas</strong> asociadas
                </h5>
              </GridItem>

              <CardBody>
                <CustomTabs
                  title="Ver:"
                  headerColor="dark"
                  tabs={[
                    {
                      tabName: "Imágenes",
                      tabIcon: ImageIcon,
                      tabContent: (
                        <LoteImages
                          images={data.images}
                          onImageSelected={showLoteImageInfo}
                        />
                      ),
                    },
                    {
                      tabName: "Pasturas",
                      tabIcon: ArtTrackIcon,
                      tabContent: (
                        <LotePasturas
                          pasturas={pasturasDetails}
                          onPasturaImageSelected={showPasturaImageInfo}
                        />
                      ),
                    },
                  ]}
                />
              </CardBody>
              {cardFooter()}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            {showHelp ? (
              <h5>
                <strong>{data.description} </strong> - Seleccioná una imágen
                para mostrar su información
              </h5>
            ) : (
              ""
            )}

            {showSideImageInfo ? (
              <SideImageInfo imageNumber={imageNumber} imageData={imageData} />
            ) : (
              ""
            )}
          </GridItem>
        </>
      );
    }
  };

  return showContent();
}
