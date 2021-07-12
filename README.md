<div align="center">
  <h1>lerna-npm-proxy</h1>
  <a href="https://npmjs.com/package/lerna-npm-proxy">
    <img alt="NPM" src="https://img.shields.io/npm/v/lerna-npm-proxy.svg">
  </a>
  <a href="https://github.com/bconnorwhite/lerna-npm-proxy">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/lerna-npm-proxy.svg">
  </a>
  <a href="https://coveralls.io/github/bconnorwhite/lerna-npm-proxy?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/bconnorwhite/lerna-npm-proxy/badge.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/lerna-npm-proxy">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/lerna-npm-proxy?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Serve Lerna packages without publishing to a registry.

## Installation

```sh
yarn add lerna-npm-proxy
```

```sh
npm install lerna-npm-proxy
```

## CLI Usage

Running the server will allow you to use `http://localhost:4873` to serve packages in your Lerna monorepo:

```sh
yarn lerna-npm-proxy
```

Then, in another terminal window:

```sh
yarn add @my-org/my-package --registry http://localhost:4873
```

This is especially useful for installing packages inside a docker container during development.

### CLI Options

```
Usage: lerna-npm-proxy [options]

Serve Lerna packages as an NPM proxy.

Options:
  -v --version              Output the version number
  -p --port <port>          Port to listen on. Default: 4873
  -r --registry <registry>  Registry to proxy from. Default: false
  -s --silent               Prevent logging
  -h --help                 Display help for command

Commands:
  help [command]            Display help for command
```

## Node API
```ts
import { start } from "lerna-npm-proxy";

start();
```

### Types
```ts
import { start, Options, FastifyInstance } from "lernal-npm-proxy";

function start(options?: Options): Promise<FastifyInstance>;

type Options = {
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
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/lerna-npm-proxy.svg"></h2>

- [@bconnorwhite/exec](https://www.npmjs.com/package/@bconnorwhite/exec): Execute commands while keeping flags easily configurable as an object
- [commander-version](https://www.npmjs.com/package/commander-version): A wrapper for Commander that automatically sets the version based on your package.json
- [fastify](https://www.npmjs.com/package/fastify): Fast and low overhead web framework, for Node.js
- [fastify-http-proxy](https://www.npmjs.com/package/fastify-http-proxy): proxy http requests, for Fastify
- [npm-packlist](https://www.npmjs.com/package/npm-packlist): Get a list of the files to add from a folder into an npm package
- [package-run](https://www.npmjs.com/package/package-run): Node API for running package.json scripts
- [parse-json-object](https://www.npmjs.com/package/parse-json-object): Parse a typed JSON object
- [sha](https://www.npmjs.com/package/sha): Check and get file hashes
- [tar](https://www.npmjs.com/package/tar): tar for node
- [which-pm-lockfile](https://www.npmjs.com/package/which-pm-lockfile): Check if a project uses yarn, npm, or pnpm
- [write-dir-safe](https://www.npmjs.com/package/write-dir-safe): Create directories and their parents recursively

<br />

<h2>Peer Dependencies<img align="right" alt="David" src="https://img.shields.io/david/peer/bconnorwhite/lerna-npm-proxy.svg"></h2>

- [lerna](https://www.npmjs.com/package/lerna): A tool for managing JavaScript projects with multiple packages.

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/lerna-npm-proxy.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects
- [@types/mock-fs](https://www.npmjs.com/package/@types/mock-fs): TypeScript definitions for mock-fs
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js
- [@types/npm-packlist](https://www.npmjs.com/package/@types/npm-packlist): TypeScript definitions for npm-packlist
- [@types/pacote](https://www.npmjs.com/package/@types/pacote): TypeScript definitions for pacote
- [@types/sha](https://www.npmjs.com/package/@types/sha): TypeScript definitions for sha
- [@types/tar](https://www.npmjs.com/package/@types/tar): TypeScript definitions for tar
- [mock-fs](https://www.npmjs.com/package/mock-fs): A configurable mock file system.  You know, for testing.

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/lerna-npm-proxy.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)
