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
      config.name === file.originalFilename && config.mimetype === file.mimetype
  );
}

async function getFilesFromRequest(
  req: NextApiRequest
): Promise<formidable.File[]> {
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

  if (!dependenciesFiles) {
    return [];
  }

  return Array.isArray(dependenciesFiles)
    ? dependenciesFiles
    : [dependenciesFiles];
}

const fileParser: Middleware<NextApiRequest, NextApiResponse> = async (
  req,
  _,
  next
) => {
  const files = await getFilesFromRequest(req);

  if (files.length === 0) {
    return next(new Error("No files received"));
  }

  const configs = files.map(getFileConfig);

  if (configs.some((config) => !config)) {
    return next(new Error("One or more files are not supported"));
  }

  const platforms = new Set(configs.map((config) => config!.platform));
  if (platforms.size > 1) {
    return next(
      new Error("All uploaded files must belong to the same platform")
    );
  }

  const platform = configs[0]!.platform;

  const contents = files.map((file) => {
    const content = fs.readFileSync(file.filepath, { encoding: "utf8" });
    fs.unlinkSync(file.filepath);
    return content;
  });

  req.body = { platform, contents };

  next();
};

export default fileParser;
