import "../css/main.css";
import IconButton from '@material-ui/core/IconButton';
import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import Head from "next/head";
import Table from "../pages/table";
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListIcon from '@material-ui/icons/List';



const Index = (props: any) => {
  return (
    <div>
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:title" content="IntaApp" />
        <meta
          property="og:description"
          content="IntaApp"
        />

        <title>Blog – Tailwind CSS</title>
      </Head>
	 <Drawer
        variant="permanent"
        open={true}
      >
        <div >
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
          <IconButton>
            <ListIcon />
          </IconButton>
	     <p>Hola</p>
        <Divider />
	     <p>Hola</p>
      </Drawer>
    </div>
  );
};

export default Index;
