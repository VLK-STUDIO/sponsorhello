import { RepositoryInfo } from "./repository";

export interface PlatformAdapter {
  dependencies: string[];
  /**
   * Parses one or more file contents, merges and deduplicates dependencies,
   * populates `dependencies`, and returns the resulting list.
   */
  parseFilesContent(contents: string[]): string[];
  getDependencies(): string[];
  getRepositories(): Promise<RepositoryInfo[]>;
}
