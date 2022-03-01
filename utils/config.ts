import { DependenciesFileConfig } from "../types/dependencies";

export const acceptedFileConfigs: DependenciesFileConfig[] = [
  {
    name: "package.json",
    mimetype: "application/json",
    platform: "npm",
  },
];
