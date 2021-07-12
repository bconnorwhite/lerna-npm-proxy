import { getPackageManagerName } from "which-pm-lockfile";
import { exec } from "@bconnorwhite/exec";

export async function getRegistry() {
  const pm = await getPackageManagerName();
  if(pm === "yarn" || pm === "npm") {
    return exec(pm, [
      "config",
      "get",
      "registry"
    ], {
      silent: true
    }).then(({ textError, textOutput }) => {
      return {
        error: textError ? textError : undefined,
        registry: textOutput
      };
    });
  } else {
    return {
      error: "Unknown package manager",
      registry: undefined
    };
  }
}
