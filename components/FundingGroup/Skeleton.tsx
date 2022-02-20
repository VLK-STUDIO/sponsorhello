import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const CalloutSkeleton: React.VFC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height={40}
    backgroundColor="var(--colors-gray-light)"
    foregroundColor="var(--colors-gray-lighter)"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
  </ContentLoader>
);

export const RepoSkeleton: React.VFC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={2}
    width="100%"
    height={260}
    backgroundColor="var(--colors-gray-light)"
    foregroundColor="var(--colors-gray-lighter)"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="88" height="12" />
    <rect x="0" y="25" rx="3" ry="3" width="100%" height="150" />
    <circle cx="12" cy="210" r="12" />
    <rect x="40" y="203" rx="3" ry="3" width="100" height="12" />
    <circle cx="12" cy="245" r="12" />
    <rect x="40" y="238" rx="3" ry="3" width="178" height="12" />
  </ContentLoader>
);
