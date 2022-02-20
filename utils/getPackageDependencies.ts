type PackageJson = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
};

function getPackageNames(dependencies?: Record<string, string>) {
  if (!dependencies) {
    return [];
  }

  return Object.keys(dependencies);
}

export function getPackageDependencies(packageJson: PackageJson) {
  const { dependencies, devDependencies, peerDependencies } = packageJson;

  return [
    ...getPackageNames(dependencies),
    ...getPackageNames(devDependencies),
    ...getPackageNames(peerDependencies),
  ];
}
