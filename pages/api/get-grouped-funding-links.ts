import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import nc from "next-connect";
import fileParser, { type ApiRequestBody } from "../../middlewares/fileParser";
import platformsClient from "../../services";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const handler = nc<NextApiRequest, NextApiResponse>({
  onError(err, _, res) {
    console.error(err.stack);
    res.status(500).end("Internal server error");
  },
  onNoMatch(_, res) {
    res.status(400).end("Bad request");
  },
})
  .use(fileParser)
  .post(async (req, res) => {
    const { platform, contents } = req.body as ApiRequestBody;
    platformsClient.parseFilesContent(platform, contents);

    const groupedFundingLinks = await platformsClient.getFunding(platform);

    res.status(200).json(groupedFundingLinks);
  });

export default handler;
