import React, { useCallback } from "react";
import Loader from "react-spinners/PacmanLoader";
import clsx from "clsx";
import { ProjectInfo } from "../../types/projects";
import { acceptedFileConfigs } from "../../utils/config";
import { DropZone, OnUpload } from "./DropZone";
import styles from "./FileUploader.module.css";

type Props = {
  onUpload: (fundingLinks?: ProjectInfo[]) => void;
  isLoading?: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

function getAcceptedFileExtensions() {
  return acceptedFileConfigs.map(({ extension }) => extension);
}

export const FileUploader: React.VFC<Props> = ({
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
    ({ isDragActive }) => {
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
    <DropZone
      className={clsx(styles.container, isLoading && styles.loading)}
      options={{
        onDrop,
        accept: getAcceptedFileExtensions(),
        multiple: false,
        disabled: isLoading,
      }}
    >
      {renderText}
    </DropZone>
  );
};
