import { PlatformAdapter } from "../types/platform";
import { RepoInfo } from "../types/projects";
import { githubClient } from "../utils/githubClient";

export class PlatformsClient {
  platforms: Record<string, PlatformAdapter> = {};

  add(platform: string, service: PlatformAdapter) {
    this.platforms[platform] = service;
  }

  get(platform: string) {
    const service = this.platforms[platform];
    if (!service) {
      throw new Error("platform not supported");
    }
    return service;
  }

  parseFileContent(platform: string, content: string) {
    const service = this.get(platform);
    service.parseFileContent(content);
  }

  async getFunding(platform: string) {
    const service = this.get(platform);
    const repositories = await service.getRepositories();

    const groupedFundingLinks = await Promise.all(
      repositories.map(async ({ name, owner }) => {
        const { fundingLinks, image } = await this.fetchGithubRepo(name, owner);
        return { name, owner, fundingLinks, image };
      })
    );

    return groupedFundingLinks.filter(
      (item) => item.fundingLinks && item.fundingLinks.length > 0
    );
  }

  async fetchGithubRepo(name: string, owner: string): Promise<RepoInfo> {
    const repoFundingLinksQuery = `query RepoFundingLinks($name: String!, $owner: String!) {
      repository(name: $name, owner: $owner) {
        fundingLinks {
          platform
          url
        }
        openGraphImageUrl
      }
    }`;
    const response = await githubClient(repoFundingLinksQuery, { name, owner });
    const fundingLinks = response?.data?.repository?.fundingLinks || [];
    const image = response?.data?.repository?.openGraphImageUrl;

    return { image, fundingLinks };
  }
}
