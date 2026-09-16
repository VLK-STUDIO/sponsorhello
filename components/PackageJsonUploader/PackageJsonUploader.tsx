import React, { useCallback, useState } from "react";
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

const acceptedFileExtensions = acceptedFileConfigs.map((config) => {
  const parts = config.name.split(".");
  return `.${parts[parts.length - 1]}`;
});

function validateFileName(file: File) {
  const isAccepted = acceptedFileConfigs.some(
    (config) => config.name === file.name
  );
  return isAccepted
    ? null
    : {
        code: "wrong-file-name",
        message: `Only ${acceptedFileConfigs.map((c) => c.name).join(", ")} files are accepted`,
      };
}

function isSameFile(a: File, b: File) {
  return (
    a.name === b.name && a.size === b.size && a.lastModified === b.lastModified
  );
}

export const PackageJsonUploader: React.VFC<Props> = ({
  onUpload,
  isLoading,
  setIsLoading,
}) => {
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [rejectionError, setRejectionError] = useState<string | null>(null);

  const onDrop: OnUpload = useCallback((acceptedFiles, fileRejections) => {
    setRejectionError(
      fileRejections.length > 0 ? fileRejections[0].errors[0].message : null
    );
    setStagedFiles((prev) => {
      const newFiles = acceptedFiles.filter(
        (incoming) => !prev.some((existing) => isSameFile(existing, incoming))
      );
      return [...prev, ...newFiles];
    });
  }, []);

  const removeFile = useCallback((index: number) => {
    setStagedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      stagedFiles.forEach((file) => formData.append("file", file));

      const response = await fetch("/api/get-grouped-funding-links", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong, please try again");
      }

      const groupedFundingLinks = await response.json();
      onUpload(groupedFundingLinks || []);
      setStagedFiles([]);
    } catch (e) {
      setRejectionError(e instanceof Error ? e.message : "Something went wrong, please try again");
      onUpload([]);
    } finally {
      setIsLoading(false);
    }
  }, [stagedFiles, onUpload, setIsLoading]);

  const renderDropzoneText = useCallback(
    ({ isDragActive }: DropzoneState) => {
      if (isLoading) {
        return <Loader size={24} color="var(--colors-gray-light)" />;
      }
      if (isDragActive) {
        return "Drop your package.json files here ...";
      }
      return stagedFiles.length > 0
        ? "Add more package.json files"
        : "Drag 'n' drop your package.json files, or click to select them";
    },
    [isLoading, stagedFiles.length]
  );

  return (
    <div className={styles.wrapper}>
      <FileUploader
        className={clsx(styles.container, isLoading && styles.loading)}
        options={{
          onDrop,
          accept: acceptedFileExtensions,
          multiple: true,
          disabled: isLoading,
          validator: validateFileName,
        }}
      >
        {renderDropzoneText}
      </FileUploader>

      {rejectionError && (
        <div className={styles.rejectionError}>
          <span>{rejectionError}</span>
          <button
            className={styles.removeButton}
            onClick={() => setRejectionError(null)}
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}

      {stagedFiles.length > 0 && (
        <>
          <ul className={styles.fileList}>
            {stagedFiles.map((file, index) => (
              <li
                key={`${file.name}-${file.lastModified}`}
                className={styles.fileItem}
              >
                <span className={styles.fileName}>{file.name}</span>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFile(index)}
                  disabled={isLoading}
                  aria-label={`Remove ${file.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            className={styles.submitButton}
            onClick={onSubmit}
            disabled={isLoading}
          >
            Find funding
          </button>
        </>
      )}
    </div>
  );
};
