import { tarball, Packument, manifest } from "pacote";
import { get } from "sha";

export type PackResult = {
  packument: Packument;
  error: Error | null;
};

export type PackOptions = {
  name: string;
  version: string;
  directory: string;
  destination: string;
  path?: string;
};

export async function pack({ name, version, directory, destination, path }: PackOptions) {
  const { integrity } = await tarball.file(directory, destination);
  const pkgJSON = await manifest(destination);
  return new Promise<PackResult>((resolve) => {
    get(destination, (error, shasum) => {
      resolve({
        error,
        packument: {
          "_id": name,
          name,
          "dist-tags": {
            latest: version
          },
          "versions": {
            [version]: {
              ...pkgJSON,
              _integrity: undefined,
              _resolved: undefined,
              _from: undefined,
              dist: {
                integrity,
                shasum,
                tarball: path ?? `file://${destination}`
              }
            }
          }
        }
      });
    });
  });
}
