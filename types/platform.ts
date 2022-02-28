import { RepositoryInfo } from "./repository";

export interface PlatformAdapter {
  dependencies: string[];
  /**
   * This method will parse the content of the received file and extract the dependencies
   * used inside the project and populate the internal variable `dependencies`,
   * it also return the list of the extracted dependencies
   */
  parseFileContent(content: string): string[];
  getDependencies(content: string): string[];
  getRepositories(): Promise<RepositoryInfo[]>;
}
