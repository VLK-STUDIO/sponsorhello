import clsx from "clsx";
import React from "react";

import styles from "./BriefGuide.module.css";

export const BriefGuide: React.VFC = () => {
  return (
    <div className={styles.container}>
      <h2>How it works</h2>
      <ul>
        <li className={clsx(styles.listItem, styles.save)}>
          Upload your package.json
        </li>
        <li className={clsx(styles.listItem, styles.fund)}>
          Pick the projects you want to support
        </li>
        <li className={clsx(styles.listItem, styles.enjoy)}>
          Donate and enjoy the open source community
        </li>
      </ul>
      <div className={styles.readMore}>
        <a href="/how-it-works"> Read more</a>
      </div>
    </div>
  );
};
