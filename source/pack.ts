import { dirname } from "path";
import packlist from "npm-packlist";
import tar from "tar";
import { get } from "sha";
import { Packument } from "pacote";
import { writeDir } from "write-dir-safe";

export type PackResult = {
  packument: Packument;
  error: Error | null;
};

export type PackOptions = {
  name: string;
  version: string;
  directory: string;
  destination: string;
};

export async function pack({ name, version, directory, destination }: PackOptions) {
  const files = await packlist({ path: directory });
  const destinationDirectory = dirname(destination);
  await writeDir(destinationDirectory);
  await tar.create({
    prefix: "package",
    cwd: directory,
    file: destination,
    gzip: true
  }, files);
  return new Promise<PackResult>((resolve) => {
    get(destination, (error, sha) => {
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
              name,
              version,
              _id: `${name}@${version}`,
              dist: {
                shasum: sha,
                tarball: `file://${destination}`
              }
            }
          }
        }
      });
    });
  });
}
