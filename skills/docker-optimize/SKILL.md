---
name: docker-optimize
description: Design, review and improve Dockerfiles, container images, Compose stacks and container builds so they are fast, small, repeatable and safe in production - layer order, multi-stage builds, cache reuse, non-root users, real health checks, pinned base images, lean build contexts, and containers for AI model runtimes and MCP servers. Use when writing or fixing a Dockerfile or compose.yml, when an image is too big, a build is slow or rebuilds everything, a container runs as root or has no health check, or when containerizing a service.
---

# Docker optimize

The outcome: a container setup that builds fast on a small change, ships only what runs, runs as
a non-root user, says truthfully when it is healthy, and builds the same image again next month.
Delivered as a working Dockerfile or Compose change, with numbers before and after, not a list
of advice.

## 1. Read before you change

- Name the workload: a single service, a static site, a compiled service, a monorepo, an API
  plus worker, a local model runtime, an MCP server, or a multi-service Compose stack.
- Read the `Dockerfile`, `.dockerignore`, `compose.yml` / `docker-compose.yml`, the CI workflow
  that builds the image, the lockfiles, and how the app starts and reports health.
- Measure today: image size (`docker image ls`), the layers (`docker history`), a cold build and
  a warm build after a one-line source change, the build context size, and the user the container
  runs as. These are the numbers you will beat.

## 2. Fix the build order first

Copy what changes least first and what changes most last: OS packages, then dependency manifests
and lockfiles, then the dependency install, then the source, then the build. A one-line source
change must not reinstall dependencies. Details in
[dockerfile.md](references/dockerfile.md).

## 3. Ship only what runs

Use a multi-stage build whenever the final image does not need compilers, package managers or
the source tree. Copy only the built artifacts into a small runtime stage. Keep the build
context lean with `.dockerignore`.

## 4. Harden the runtime

Run as a non-root user, with an exec-form entrypoint, explicit ports, no secrets in any layer,
and a health check that proves the service can do its job, not just that the process is alive.
Details in [security.md](references/security.md).

## 5. Make it repeatable

Choose the base image on purpose and pin it by digest when stability matters. Install
dependencies from the lockfile only. Keep build-time and runtime concerns apart.

## 6. Make delivery fast

When CI is slow, check whether it builds cache-cold, what keeps invalidating layers, and whether
a persistent builder or a registry cache would help. Fix the Dockerfile before reaching for new
tooling. For Compose stacks, model runtimes and MCP servers, see
[architecture.md](references/architecture.md).

## 7. Prove it

Build again and compare with step 1: image size, cold and warm build time, the runtime user, the
health check passing (and failing when the dependency it checks is down). Run the app's tests
against the new image. If a number is unknown, say so; never invent one.

## Never

- `COPY . .` before the dependency install.
- Compilers, package managers, shells or debug tools in a production image without a reason.
- `latest` or a moving major tag where the build has to be repeatable.
- Secrets in `ARG`, `ENV` or any layer; pass them as build secrets or at runtime.
- A health check that only checks the process or the open port.
- Root in the final image without a written reason.
- A bigger change than the problem needs: a layer fix before a new build system.

## Done when

The new setup builds and runs, the before and after numbers are reported, the container runs as
a non-root user with a health check that tests real readiness, the base image is chosen on
purpose, and any tradeoff (size against debuggability, pinning against upkeep) is named in a
line.
