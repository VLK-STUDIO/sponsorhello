import {
  NpmPackage,
  NpmResponse,
  PackageJson,
  DependencyType,
} from "../types/npm";
import { PlatformAdapter } from "../types/platform";
import { RepositoryInfo } from "../types/repository";

type Options = {
  deep?: boolean;
};

export class NpmAdapter implements PlatformAdapter {
  dependencies: string[] = [];
  repositories: RepositoryInfo[] = [];
  cache = new Map<string, NpmPackage>();

  parseFileContent(content: string) {
    const packageJson = JSON.parse(content);
    this.dependencies = this.getPackageJsonDependencies(packageJson);
    return this.getDependencies();
  }

  getDependencies() {
    return this.dependencies;
  }

  async getRepositories() {
    const response = await this.fetchNpm(this.dependencies, { deep: true });

    const packagesInfo = Object.keys(response).reduce((acc, packageName) => {
      const packageInfo = response[packageName];

      const currentPackageNameAndOwners =
        this.getRepositoryNameAndOwnerFromNpmResponse(packageInfo);

      if (currentPackageNameAndOwners) {
        return [...acc, currentPackageNameAndOwners];
      }

      return acc;
    }, [] as RepositoryInfo[]);

    return (
      packagesInfo
        // Filtering the list to not have duplicates
        .filter((item, index, array) => {
          const partial = array.slice(0, index);

          return !partial.find((curr) => curr.name === item.name);
        })
        .sort((first, second) => first.owner.localeCompare(second.owner))
    );
  }

  getPackageNames(dependencies?: Record<string, string>) {
    if (!dependencies) {
      return [];
    }

    return Object.keys(dependencies);
  }

  getPackageJsonDependencies(
    packageJson: PackageJson,
    pick: DependencyType[] = [
      "dependencies",
      "devDependencies",
      "peerDependencies",
    ]
  ) {
    return pick.reduce(
      (acc, curr) => [...acc, ...this.getPackageNames(packageJson[curr])],
      [] as string[]
    );
  }

  getRepositoryNameAndOwnerFromNpmResponse(
    npmResponse: NpmPackage
  ): RepositoryInfo | undefined {
    const { url } = npmResponse?.collected?.metadata?.repository || {};

    if (typeof url !== "string" || !url.includes("github")) {
      return undefined;
    }

    // The format of the repository url is something like
    // git+https://github.com/{owner}/{name}.git
    const [owner, name] = url.replace(".git", "").split("/").slice(-2);

    if (!name || !owner) {
      return undefined;
    }

    return { name, owner };
  }

  async fetchNpm(
    packageNames: string[],
    { deep = false }: Options = {}
  ): Promise<NpmResponse> {
    const notInCachePackages = packageNames.filter(
      (packageName) => !this.cache.has(packageName)
    );

    const response = await fetch("https://api.npms.io/v2/package/mget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(notInCachePackages),
    });

    const newPackages: NpmResponse = await response.json();

    const packages: NpmResponse = {
      ...newPackages,
      ...Object.fromEntries(this.cache.entries()),
    };

    Object.entries(newPackages).forEach(([name, npmPackage]) => {
      this.cache.set(name, npmPackage);
    });

    if (deep) {
      const packagesWithDependencies: NpmResponse = await Object.keys(
        newPackages
      ).reduce(async (oldPromise, curr) => {
        const acc = await oldPromise;
        const packageInfo = newPackages[curr];

        const dependencies = this.getPackageJsonDependencies(
          packageInfo?.collected?.metadata || {},
          ["dependencies", "peerDependencies"]
        );

        const dependingPackages = await this.fetchNpm(dependencies, {
          deep: false,
        });

        return {
          ...acc,
          ...dependingPackages,
        };
      }, Promise.resolve(packages));

      return packagesWithDependencies;
    }

    return packages;
  }
}
