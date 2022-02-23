import clsx from "clsx";
import React from "react";

import styles from "./BriefGuide.module.css";

export const BriefGuide: React.VFC = () => {
  return (
    <div className={styles.container}>
      <h2>How it works</h2>
      <ul>
        <li className={clsx(styles.listItem, styles.save)}>
          upload your package.json to Sponsorhello
        </li>
        <li className={clsx(styles.listItem, styles.fund)}>
          fund your favorite projects
        </li>
        <li className={clsx(styles.listItem, styles.enjoy)}>
          Enjoy being a better person
        </li>
      </ul>
      <div className={styles.readMore}>
        <a href="/how-it-works"> Read more</a>
      </div>
    </div>
  );
};
