import React, { useCallback } from "react";
import { DropzoneState } from "react-dropzone";
import Loader from "react-spinners/PacmanLoader";
import clsx from "clsx";
import { ProjectInfo } from "../../types/projects";
import { acceptedFileConfigs } from "../../utils/config";
import { FileUploader, OnUpload } from "../FileUploader";
import styles from "./PackageJsonUploader.module.css";

type Props = {
  onUpload: (fundingLinks?: ProjectInfo[]) => void;
  isLoading?: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

function getAcceptedFileExtensions() {
  return acceptedFileConfigs.map((config) => {
    const parts = config.name.split(".");

    return `.${parts[parts.length - 1]}`;
  });
}

export const PackageJsonUploader: React.VFC<Props> = ({
  onUpload,
  isLoading,
  setIsLoading,
}) => {
  const onDrop: OnUpload = useCallback(
    async (acceptedFiles) => {
      setIsLoading(true);
      try {
        const formData = new FormData();

        acceptedFiles.forEach((file) => {
          formData.append("file", file);
        });

        const response = await fetch("/api/get-grouped-funding-links", {
          method: "POST",
          body: formData,
        });

        const groupedFundingLinks = await response.json();

        onUpload(groupedFundingLinks || []);
      } catch (e) {
        onUpload([]);
      } finally {
        setIsLoading(false);
      }
    },
    [onUpload, setIsLoading]
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
        accept: getAcceptedFileExtensions(),
        multiple: false,
        disabled: isLoading,
      }}
    >
      {renderText}
    </FileUploader>
  );
};
