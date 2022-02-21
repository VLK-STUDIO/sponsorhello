type DependencyType = "dependencies" | "devDependencies" | "peerDependencies";

type PackageJson = {
  [K in DependencyType]?: Record<string, string>;
};

function getPackageNames(dependencies?: Record<string, string>) {
  if (!dependencies) {
    return [];
  }

  return Object.keys(dependencies);
}

export function getPackageDependencies(
  packageJson: PackageJson,
  pick: DependencyType[] = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
  ]
) {
  return pick.reduce(
    (acc, curr) => [...acc, ...getPackageNames(packageJson[curr])],
    [] as string[]
  );
}
