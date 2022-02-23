import type { NextApiRequest, NextApiResponse } from "next";
import { getNpmPackagesInfo } from "../../utils/getNpmPackagesInfo";
import { getRepoFundingLinks } from "../../utils/getRepoFundingLinks";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!Array.isArray(req.body.dependencies)) {
    return res.status(400).json({ error: "Bad request" });
  }

  //  List of packages used by the project
  const nameAndOwners = await getNpmPackagesInfo(req.body.dependencies);

  // Fetch from github the project image and the funding links for each repository
  const groupedFundingLinks = (
    await Promise.all(
      nameAndOwners.map(async ({ name, owner }) => {
        const { fundingLinks, image } = await getRepoFundingLinks(name, owner);
        return { name, owner, fundingLinks, image };
      })
    )
  )
    // Not all the projects are searching for funding!
    .filter((item) => item.fundingLinks && item.fundingLinks.length > 0);

  res.status(200).json(groupedFundingLinks);
}
