import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import * as fs from "fs";
import { Middleware } from "next-connect";
import { acceptedFileConfigs } from "../../utils/config";
import { DependenciesFileConfig } from "../../types/dependencies";

function getFileConfig(
  file: formidable.File
): DependenciesFileConfig | undefined {
  if (!file.originalFilename) {
    return undefined;
  }

  return acceptedFileConfigs.find(
    (config) =>
      file.originalFilename &&
      config.name.test(file.originalFilename) &&
      config.mimetype === file.mimetype
  );
}

async function getFileListFromRequest(req: NextApiRequest) {
  const body = await new Promise<formidable.Files>((resolve, reject) => {
    const form = new formidable.IncomingForm({
      multiples: true,
      allowEmptyFiles: false,
      keepExtensions: true,
    });

    form.parse(req, function (err, _, files) {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  });

  const dependenciesFiles = body.file;

  return Array.isArray(dependenciesFiles)
    ? dependenciesFiles[0]
    : dependenciesFiles;
}

const fileParser: Middleware<NextApiRequest, NextApiResponse> = async (
  req,
  _,
  next
) => {
  const file = await getFileListFromRequest(req);

  if (!file) {
    return next(new Error("Unrecognized file"));
  }

  const config = getFileConfig(file);

  if (!config) {
    return next(new Error("File not supported"));
  }

  const content = fs.readFileSync(file.filepath, { encoding: "utf8" });
  fs.unlinkSync(file.filepath);

  req.body = { platform: config.platform, content };

  next();
};

export default fileParser;
