import { RepoInfo } from "../types/projects";
import { githubClient } from "./githubClient";

const repoFundingLinksQuery = `query RepoFundingLinks($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    fundingLinks {
      platform
      url
    }
    openGraphImageUrl
  }
}`;

export async function getRepoFundingLinks(
  name: string,
  owner: string
): Promise<RepoInfo> {
  const response = await githubClient(repoFundingLinksQuery, { name, owner });
  const fundingLinks = response?.data?.repository?.fundingLinks || [];
  const image = response?.data?.repository?.openGraphImageUrl;

  return { image, fundingLinks };
}
