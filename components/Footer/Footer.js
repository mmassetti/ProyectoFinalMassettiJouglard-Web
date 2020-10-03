import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";
import Link from "next/link";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link href="/admin/dashboard" className={classes.block}>
                <a>Sesiones</a>
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link href="/admin/user-profile" className={classes.block}>
                <a>Otro menú</a>
              </Link>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://collectednotes.com/cobertura-suelos-inta-uns"
              target="_blank"
              className={classes.a}
            >
              INTA/UNS
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
