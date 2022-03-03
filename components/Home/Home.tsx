import React from "react";
import { useProjects } from "../../contexts/ProjectsContext";

import { FundingGroup } from "../FundingGroup";
import { FileUploader } from "../FileUploader";

import styles from "./Home.module.css";
import Bleed from "nextra-theme-docs/bleed";

export const Home: React.VFC = () => {
  const { fundingLinks, setFundingLinks, isLoading, setIsLoading } =
    useProjects();

  return (
    <Bleed full>
      <div className={styles.container}>
        <h1 className={styles.title}>Sponsorhello</h1>
        <FileUploader
          onUpload={setFundingLinks}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <FundingGroup fundingLinks={fundingLinks} isLoading={isLoading} />
      </div>
    </Bleed>
  );
};
