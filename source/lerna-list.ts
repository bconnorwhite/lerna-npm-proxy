import run from "package-run";
import { parseJSONArray } from "parse-json-object";

export type LernaPackage = {
  name: string;
  version: string;
  private: boolean;
  location: string;
};

export async function list() {
  return run({
    command: "lerna",
    args: [
      "list", {
        all: true,
        long: true,
        json: true,
        loglevel: "error"
      }
    ],
    silent: true
  }, {
    silent: true
  }).then(({ textError, textOutput }) => {
    return {
      packages: parseJSONArray<LernaPackage[]>(textOutput),
      error: textError ? textError : undefined
    };
  });
}
