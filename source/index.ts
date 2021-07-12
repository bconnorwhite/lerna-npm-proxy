import { join } from "path";
import { tmpdir } from "os";
import { createReadStream } from "fs";
import { spawn } from "child_process";
import { dim } from "chalk";
import { fastify, FastifyInstance } from "fastify";
import proxy from "fastify-http-proxy";
import { list } from "./lerna-list";
import { pack } from "./pack";
import { getRegistry } from "./get-registry";

export type Options = {
  /**
   * Port to listen on. Default: 4873.
   */
  port?: number;
  /**
   * Registry to proxy from.
   */
  registry?: string;
  /**
   * Prevent all output. Default: false.
   */
  silent?: boolean;
  /**
   * Script to run once server starts. Server will be killed once the script exits.
   * This also disables server logging.
   * NOTE: this is passed directly to `child_process.spawn`.
   */
  while?: string;
};

export async function start(options: Options = {}): Promise<FastifyInstance> {
  const server = fastify({
    logger: options.while ? false : options.silent !== true
  });

  return list().then(async ({ packages, error: listError }) => {
    if(listError) {
      server.log.error(listError);
    } else {
      packages?.forEach(({ name, version, location }) => {
        server.log.info(`Serving ${name}`);
        const tarName = `${name}-v${version}.tgz`;
        const destination = join(tmpdir(), tarName);
        const base = `/${name.replace("/", "%2f")}`;
        const tarPath = `${base}/${tarName}`;
        // Get packument
        server.get(base, async (request, reply) => {
          server.log.info(`Packing ${destination}`);
          const { packument, error: packError } = await pack({
            name,
            version,
            directory: location,
            destination,
            path: request.headers.host ? `http://${request.headers.host}${tarPath}` : undefined
          });
          if(packError) {
            server.log.error(packError);
          }
          server.log.info(`Linking ${packument.versions[packument["dist-tags"].latest].dist.tarball}`);
          reply.send(packument);
        });
        // Get tarfile
        server.get(tarPath, async (_request, reply) => {
          const readStream = createReadStream(destination);
          reply.send(readStream);
        });
      });
    }

    const registry = options.registry ?? (await getRegistry()).registry ?? "https://registry.npmjs.org";
    server.log.info(`Proxying ${registry}`);
    server.register(proxy, {
      upstream: registry,
      prefix: "/"
    });

    await server.listen(options.port ?? 4873);

    if(options.while) {
      if(options.silent !== true) {
        console.info(dim(`$ ${options.while}`));
      }
      const child = spawn(options.while, {
        stdio: options.silent === true ? "ignore" : "inherit",
        shell: true
      });
      child.on("close", () => {
        server.close();
      });
    }

    return server;
  });
}

export {
  FastifyInstance
};
