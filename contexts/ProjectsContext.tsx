import React, { createContext, useState, useMemo, useContext } from "react";
import { ProjectInfo } from "../types/projects";

type ProjectContextType = {
  isLoading: boolean;
  fundingLinks?: ProjectInfo[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFundingLinks: React.Dispatch<
    React.SetStateAction<ProjectInfo[] | undefined>
  >;
};

const ProjectsContext = createContext<ProjectContextType>(
  {} as ProjectContextType
);

export const ProjectProvider: React.FC = ({ children }) => {
  const [fundingLinks, setFundingLinks] = useState<ProjectInfo[]>();
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(
    () => ({
      fundingLinks,
      isLoading,
      setIsLoading,
      setFundingLinks,
    }),
    [fundingLinks, isLoading]
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export function useProjects() {
  return useContext(ProjectsContext);
}
