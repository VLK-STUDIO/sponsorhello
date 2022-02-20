import React, { useCallback } from "react";
import { DropzoneState } from "react-dropzone";
import { getPackageDependencies } from "../../utils/getPackageDependencies";
import { ProjectInfo } from "../../types/projects";
import { FileUploader, OnUpload } from "../FileUploader";
import styles from "./PackageJsonUploader.module.css";
import Loader from "react-spinners/PacmanLoader";
import clsx from "clsx";

type Props = {
  onUpload: (fundingLinks?: ProjectInfo[]) => void;
  isLoading?: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const PackageJsonUploader: React.VFC<Props> = ({
  onUpload,
  isLoading,
  setIsLoading,
}) => {
  const onReaderLoad = useCallback(
    async (event: ProgressEvent<FileReader>) => {
      if (!event.target || !event.target.result) {
        return;
      }
      try {
        const packageJson = JSON.parse(event.target.result as string);
        const dependencies = getPackageDependencies(packageJson);

        const response = await fetch("/api/get-grouped-funding-links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dependencies, deep: 1 }),
        });
        const groupedFundingLinks = await response.json();

        onUpload(groupedFundingLinks.error ? [] : groupedFundingLinks);
      } catch (e) {
        onUpload([]);
      } finally {
        setIsLoading(false);
      }
    },
    [onUpload, setIsLoading]
  );

  const onDrop: OnUpload = useCallback(
    async (acceptedFiles) => {
      const reader = new FileReader();
      setIsLoading(true);
      reader.onload = onReaderLoad;
      reader.readAsText(acceptedFiles[0]);
    },
    [onReaderLoad, setIsLoading]
  );

  const renderText = useCallback(
    ({ isDragActive }: DropzoneState) => {
      if (isLoading) {
        return <Loader size={24} color="var(--colors-gray-light)" />;
      }

      if (isDragActive) {
        return "Drop your package.json here ...";
      }

      return "Drag 'n' drop your package.json, or click to select it from your computer";
    },
    [isLoading]
  );

  return (
    <FileUploader
      className={clsx(styles.container, isLoading && styles.loading)}
      options={{
        onDrop,
        accept: ".json",
        multiple: false,
        disabled: isLoading,
      }}
    >
      {renderText}
    </FileUploader>
  );
};
