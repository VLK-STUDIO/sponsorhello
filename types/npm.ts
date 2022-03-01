interface Publisher {
  username: string;
  email: string;
}

interface Maintainer {
  username: string;
  email: string;
}

interface Repository {
  type: string;
  url: string;
  directory: string;
}

interface Links {
  npm: string;
  homepage: string;
  repository: string;
  bugs: string;
}

type Dependencies = Record<string, string>;

interface Release {
  from: string;
  to: string;
  count: number;
}

interface Metadata {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  publisher: Publisher;
  maintainers: Maintainer[];
  repository: Repository;
  links: Links;
  license: string;
  dependencies: Dependencies;
  devDependencies: Dependencies;
  peerDependencies: Dependencies;
  releases: Release[];
}

interface Download {
  from: string;
  to: string;
  count: number;
}

interface Npm {
  downloads: Download[];
  dependentsCount: number;
  starsCount: number;
}

interface Distribution {
  3600: number;
  10800: number;
  32400: number;
  97200: number;
  291600: number;
  874800: number;
  2624400: number;
  7873200: number;
  23619600: number;
  70858800: number;
  212576400: number;
}

interface Issues {
  count: number;
  openCount: number;
  distribution: Distribution;
  isDisabled: boolean;
}

interface Contributor {
  username: string;
  commitsCount: number;
}

interface Commit {
  from: string;
  to: string;
  count: number;
}

interface Status {
  context: string;
  state: string;
}

interface Github {
  homepage: string;
  starsCount: number;
  forksCount: number;
  subscribersCount: number;
  issues: Issues;
  contributors: Contributor[];
  commits: Commit[];
  statuses: Status[];
}

interface Files {
  readmeSize: number;
  testsSize: number;
  hasNpmIgnore: boolean;
  hasChangelog: boolean;
}

interface IsRoot {
  required: string;
  stable: string;
  latest: string;
}

interface Source {
  files: Files;
  linters: string[];
  outdatedDependencies: Dependencies;
}

interface Collected {
  metadata: Metadata;
  npm: Npm;
  github: Github;
  source: Source;
}

interface Detail {
  quality: number;
  popularity: number;
  maintenance: number;
}

interface Score {
  final: number;
  detail: Detail;
}

interface Quality {
  carefulness: number;
  tests: number;
  health: number;
  branding: number;
}

interface Popularity {
  communityInterest: number;
  downloadsCount: number;
  downloadsAcceleration: number;
  dependentsCount: number;
}

interface Maintenance {
  releasesFrequency: number;
  commitsFrequency: number;
  openIssues: number;
  issuesDistribution: number;
}

interface Evaluation {
  quality: Quality;
  popularity: Popularity;
  maintenance: Maintenance;
}

export interface NpmPackage {
  analyzedAt: string;
  collected: Collected;
  evaluation: Evaluation;
  score: Score;
}

export type NpmResponse = Record<string, NpmPackage>;

export type DependencyType =
  | "dependencies"
  | "devDependencies"
  | "peerDependencies";

export type PackageJson = {
  [K in DependencyType]?: Record<string, string>;
};
