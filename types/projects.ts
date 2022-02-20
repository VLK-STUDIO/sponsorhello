export type FundingObject = {
  platform: string;
  url: string;
};

export type RepoInfo = {
  fundingLinks: FundingObject[];
  image?: string;
};

export type ProjectInfo = {
  name: string;
  owner: string;
  image?: string;
  fundingLinks: FundingObject[];
};
