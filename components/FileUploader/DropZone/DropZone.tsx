import React from "react";
import {
  DropEvent,
  useDropzone,
  FileRejection,
  DropzoneOptions,
  DropzoneState,
} from "react-dropzone";
import styles from "./DropZone.module.css";
import clsx from "clsx";

export type OnUpload = <T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent
) => void;

type Props = {
  children: (state: DropzoneState) => string | React.ReactElement;
  options?: DropzoneOptions;
  className?: string;
};

export const DropZone: React.VFC<Props> = ({
  options,
  children,
  className,
}) => {
  const dropZoneState = useDropzone({
    ...options,
  });
  const { getRootProps, getInputProps } = dropZoneState;

  return (
    <div {...getRootProps()} className={clsx(styles.container, className)}>
      <input {...getInputProps()} />
      <div className={styles.textContainer}>{children(dropZoneState)}</div>
    </div>
  );
};
