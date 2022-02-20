import { RepoInfo } from "../types/projects";
import { githubClient } from "./githubClient";

function getRepoFundingLinksQuery(name: string, owner: string) {
  return `query RepoFundingLinks {
  repository(name: "${name}", owner: "${owner}") {
    fundingLinks {
      platform
      url
    }
    openGraphImageUrl
  }
}`;
}

export async function getRepoFundingLinks(
  name: string,
  owner: string
): Promise<RepoInfo> {
  const query = getRepoFundingLinksQuery(name, owner);
  const response = await githubClient(query);
  const fundingLinks = response?.data?.repository?.fundingLinks || [];
  const image = response?.data?.repository?.openGraphImageUrl;

  return { image, fundingLinks };
}
