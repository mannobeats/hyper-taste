# Dockerfiles

## Layer order

Copy the least-changing inputs first and the fastest-changing last:

1. `FROM`, pinned.
2. OS packages that rarely change, in one `RUN` that cleans its own cache.
3. Dependency manifests and lockfiles: `package.json` + lockfile, `requirements.txt` /
   `poetry.lock` / `uv.lock`, `go.mod` + `go.sum`, `Cargo.toml` + `Cargo.lock`.
4. The dependency install.
5. The application source.
6. The build that needs the source.
7. Runtime user, ports, health check, entrypoint.

```dockerfile
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
```

In a monorepo, copy only the workspace manifests the service needs before the install, and use a
build context or target scoped to that service.

## Cache mounts

With BuildKit, keep package manager caches between builds without putting them in a layer:
`RUN --mount=type=cache,target=/root/.npm npm ci`. Use the cache path of the package manager in
use (pip, uv, Go modules, Cargo registry, apt).

## Multi-stage builds

A build stage has the SDK, the compiler and the source; the runtime stage gets only the
artifacts. Copy named paths with `COPY --from=build`, never the whole build stage.

```dockerfile
FROM node:22-bookworm-slim@sha256:<digest> AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine@sha256:<digest>
COPY --from=build /app/dist /usr/share/nginx/html
```

## Deterministic installs

- Node: `npm ci`, `pnpm install --frozen-lockfile`, `yarn install --immutable`.
- Python: locked installs (`uv sync --frozen`, `pip install -r` with pinned versions and hashes).
- Go: `go mod download` from `go.mod` and `go.sum`.
- Rust: build with `--locked`.

## .dockerignore

Exclude `.git`, `node_modules` (when installed in the image), virtual environments, build output,
test and coverage artifacts, local caches, `.env` files and anything secret. Check the context
size the build reports; a large context slows every build.

## Runtime defaults

- Set `WORKDIR`.
- Exec-form `CMD` / `ENTRYPOINT` (`["node", "server.js"]`), so signals reach the app.
- Create a user and switch to it; the command differs between Debian, Alpine and distroless
  images (distroless ships a `nonroot` user).
- `EXPOSE` only the port the service uses; document every environment variable it reads.

## Health checks

Strong: an HTTP readiness endpoint that checks what the service needs to serve (its database,
its model), or a command that fails when the app can't serve. Weak: a PID check, an open-port
check. If the app has no health endpoint, add one or say which readiness signal the platform
must use instead.

## Review questions

- Does a one-line source change reuse the dependency layer?
- Is the final image free of compilers and dev-only packages?
- Does the container run as a non-root user?
- Is the base image chosen on purpose and pinned where it matters?
- Does `.dockerignore` keep the context small and secret-free?
- Does the health check test real readiness?
- Is the final command explicit and in exec form?
- Does `docker build --check` report no warnings?
