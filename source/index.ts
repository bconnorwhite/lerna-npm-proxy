import { join } from "path";
import { tmpdir } from "os";
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
   * Prevent logging. Default: false.
   */
  silent?: boolean;
};

export async function start(options: Options = {}): Promise<FastifyInstance> {
  const server = fastify({
    logger: options.silent !== true
  });

  return list().then(async ({ packages, error: listError }) => {
    if(listError) {
      server.log.error(listError);
    } else {
      packages?.forEach(({ name, version, location }) => {
        server.log.info(`Serving ${name}`);
        server.get(`/${name.replace("/", "%2f")}`, async (request, reply) => {
          const destination = join(tmpdir(), `${name}-v${version}.tgz`);
          const { packument, error: packError } = await pack({
            name,
            version,
            directory: location,
            destination
          });
          if(packError) {
            server.log.error(packError);
          }
          server.log.info(packument.versions[packument["dist-tags"].latest].dist.tarball);
          reply.send(packument);
        });
      });
    }

    const registry = options.registry ?? (await getRegistry()).registry ?? "https://registry.npmjs.org";
    server.log.info(`Proxying ${registry}`);
    server.register(proxy, {
      upstream: registry,
      prefix: "/"
    });

    server.listen(options.port ?? 4873);
    return server;
  });
}

export {
  FastifyInstance
};
