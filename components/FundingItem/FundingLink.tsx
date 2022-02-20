import React from "react";
import { Icon } from "../Icon";
import styles from "./FundingLink.module.css";

type Props = {
  url: string;
  platform: string;
};

export const FundingLink: React.VFC<Props> = ({ platform, url }) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Icon name={platform} />
      </div>
      <div className={styles.linkContainer}>
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </div>
    </div>
  );
};
