#!/usr/bin/env node
import program from "commander-version";
import { start, Options } from "../";

program(__dirname)
  .name("lerna-npm-proxy")
  .description("Serve Lerna packages as an NPM proxy.")
  .option("-p --port <port>", "Port to listen on. Default: 4873")
  .option("-r --registry <registry>", "Registry to proxy from")
  .option("-s --silent", "Prevent all output. Default: false")
  .option("-w --while <script>", "Script to run once server starts. Server will be killed once the script exits.")
  .action((options: Options) => {
    start(options);
  })
  .parse();
