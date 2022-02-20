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

  const packagesInfo = await Object.keys(response).reduce(
    async (accPromise, packageName) => {
      const acc = await accPromise;
      const packageInfo = response[packageName];

      const currentPackageNameAndOwners =
        getRepositoryNameAndOwnerFromNpmResponse(packageInfo);

      if (currentPackageNameAndOwners) {
        return [...acc, currentPackageNameAndOwners];
      }

      return acc;
    },
    Promise.resolve([] as PackageInfo[])
  );

  return packagesInfo;
}
