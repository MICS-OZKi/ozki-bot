import path from "path";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

const serverPath = (staticFilePath: string) => {
  return path.join(serverRuntimeConfig.PROJECT_ROOT, staticFilePath);
};

export default serverPath;
