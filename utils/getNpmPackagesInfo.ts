import { NpmPackage } from "../types/npm";
import { fetchNpm } from "./fetchNpm";

type PackageInfo = { name: string; owner: string };

function getRepositoryNameAndOwnerFromNpmResponse(
  npmResponse: NpmPackage
): PackageInfo | undefined {
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

export async function getNpmPackagesInfo(
  packageNames: string[]
): Promise<PackageInfo[]> {
  const response = await fetchNpm(packageNames, { deep: true });

  const packagesInfo = Object.keys(response).reduce((acc, packageName) => {
    const packageInfo = response[packageName];

    const currentPackageNameAndOwners =
      getRepositoryNameAndOwnerFromNpmResponse(packageInfo);

    if (currentPackageNameAndOwners) {
      return [...acc, currentPackageNameAndOwners];
    }

    return acc;
  }, [] as PackageInfo[]);

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
