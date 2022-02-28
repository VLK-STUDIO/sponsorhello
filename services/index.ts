import { NpmAdapter } from "./NpmAdapter";
import { PlatformsClient } from "./PlatformsClient";

const platformsClient = new PlatformsClient();

const supportedPlatforms = [{ platform: "npm", handler: new NpmAdapter() }];

supportedPlatforms.forEach(({ platform, handler }) => {
  platformsClient.add(platform, handler);
});

export default platformsClient;
