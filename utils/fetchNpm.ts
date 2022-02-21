import { NpmPackage, NpmResponse } from "../types/npm";
import { getPackageDependencies } from "./getPackageDependencies";

type Options = {
  deep?: boolean;
};

const cache = new Map<string, NpmPackage>();

export async function fetchNpm(
  packageNames: string[],
  { deep = false }: Options = {}
): Promise<NpmResponse> {
  const notInCachePackages = packageNames.filter(
    (packageName) => !cache.has(packageName)
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
    ...Object.fromEntries(cache.entries()),
  };

  Object.entries(newPackages).forEach(([name, npmPackage]) => {
    cache.set(name, npmPackage);
  });

  if (deep) {
    const packagesWithDependencies: NpmResponse = await Object.keys(
      newPackages
    ).reduce(async (oldPromise, curr) => {
      const acc = await oldPromise;
      const packageInfo = newPackages[curr];

      const dependencies = getPackageDependencies(
        packageInfo?.collected?.metadata || {},
        ["dependencies", "peerDependencies"]
      );

      const dependingPackages = await fetchNpm(dependencies, {
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
