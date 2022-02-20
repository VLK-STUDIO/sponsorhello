import clsx from "clsx";
import React from "react";
import styles from "./Card.module.css";

export const Card: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  return <div {...props} className={clsx(styles.container, props.className)} />;
};
