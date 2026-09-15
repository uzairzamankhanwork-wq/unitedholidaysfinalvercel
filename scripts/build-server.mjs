import esbuild from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const apiRoot = path.join(root, ".api");

await esbuild.build({
  entryPoints: [path.join(apiRoot, "server.js")],
  bundle: true,
  platform: "node",
  target: "node22",
  format: "esm",
  outfile: path.join(root, "dist", "server.bundle.mjs"),
  packages: "bundle",
  sourcemap: true,
  banner: {
    js: "import { createRequire } from 'node:module';\nconst require = createRequire(import.meta.url);"
  },
  define: {
    "API_ROUTES.BASE": '""',
    "API_ROUTES.BASE_API": '"/api"',
    "API_ROUTES.PUBLIC_DIR": '"dist"'
  },
  plugins: [{
    name: "api-aliases",
    setup(build) {
      build.onResolve({ filter: /^@api\/configure$/ }, () => ({ path: path.join(apiRoot, "configure.js") }));
      build.onResolve({ filter: /^@api\/(handler|routers)$/ }, (args) => ({
        path: path.join(apiRoot, `${args.path.split("/").at(-1)}.js`)
      }));
      build.onResolve({ filter: /^@api\/root\// }, (args) => ({
        path: path.join(root, args.path.slice("@api/root/".length))
      }));
    }
  }]
});

console.log("Server bundle created at dist/server.bundle.mjs");
