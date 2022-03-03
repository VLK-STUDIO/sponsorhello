import { DependenciesFileConfig } from "../types/dependencies";

export const acceptedFileConfigs: DependenciesFileConfig[] = [
  {
    name: /package.json/g,
    platform: "npm",
    mimetype: "application/json",
    extension: ".json",
  },
  {
    name: /\w*.csproj/g,
    platform: "nuget",
    mimetype: "application/octet-stream",
    extension: ".csproj",
  },
];
