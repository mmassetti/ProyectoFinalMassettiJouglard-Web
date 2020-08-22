/*eslint-disable*/
import React, { Component } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";

import imagine1 from "assets/img/sidebar-1.jpg";
import imagine2 from "assets/img/sidebar-2.jpg";
import imagine3 from "assets/img/sidebar-3.jpg";
import imagine4 from "assets/img/sidebar-4.jpg";

import Button from "components/CustomButtons/Button.js";

export default function FixedPlugin(props) {
  const [classes, setClasses] = React.useState("dropdown show");
  const [bg_checked, setBg_checked] = React.useState(true);
  const [bgImage, setBgImage] = React.useState(props.bgImage);
  const handleClick = () => {
    props.handleFixedClick();
  };
  return (
    <div className={classnames("fixed-plugin")}>
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={handleClick}>
          <i className="fa fa-cog fa-2x" />
        </div>
        <ul className="dropdown-menu">
          <li className="header-title">Ayuda</li>

          <li className="button-container">
            <div className="button-container">
              <Button
                color="success"
                href="https://www.creative-tim.com/product/nextjs-material-dashboard?ref=njsmd-fixed-plugin"
                target="_blank"
                fullWidth
              >
                Descargar app Android
              </Button>
            </div>
          </li>
          <li className="button-container">
            <div className="button-container">
              <Button
                color="warning"
                href="https://www.creative-tim.com/product/nextjs-material-dashboard-pro?ref=njsmd-fixed-plugin"
                target="_blank"
                fullWidth
              >
                Dar feedback
              </Button>
            </div>
          </li>
          <li className="button-container">
            <Button
              color="info"
              fullWidth
              href="https://www.creative-tim.com/learning-lab/nextjs/overview/material-dashboard?ref=njsmd-fixed-plugin"
              target="_blank"
            >
              Ver Demo Youtube
            </Button>
          </li>

          <li className="adjustments-line" />
        </ul>
      </div>
    </div>
  );
}

FixedPlugin.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf([
    "white",
    "purple",
    "blue",
    "green",
    "orange",
    "red",
  ]),
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func,
};
