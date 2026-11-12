# Security and repeatability

## Choosing the base image

Pick the smallest image that still runs the app and lets you debug it the way the team does:

- Slim Debian images are a practical default.
- Alpine is smaller but uses musl; native modules and some tools break or behave differently.
- Distroless images have no shell or package manager; good when the build and operations already
  work without them.

Match the choice to the libc the app needs, its package ecosystem and how it is debugged, not to
fashion.

## Pin by digest

Tags move; digests don't. Use `python:3.13-slim@sha256:<digest>` where repeatability, audits or
supply-chain control matter, and name the cost: pinned digests must be updated on purpose (a
dependency bot can do it).

## Runtime hardening

Baseline:

- A non-root user.
- Only the packages the app needs; no shell or package manager in the final image unless
  required.
- Explicit writable paths when the app writes anything.
- No secrets in the image: use `RUN --mount=type=secret` at build time and environment or
  mounted secrets at runtime.

Where the platform supports it and the app allows it: a read-only root filesystem, dropped Linux
capabilities (`cap_drop: [ALL]`, add back only what is needed), `no-new-privileges`, seccomp or
AppArmor profiles, user namespace remapping.

## Supply chain

Look for mutable `latest` or major-only tags, unpinned package installs, `curl | sh` installers
without a checksum, and oversized base images. On security-sensitive work, scan the image (for
example `docker scout cves` or Trivy) and review dependencies; on a plain build-speed task, note
the risks without turning it into a full audit.

## Checklist

- Is the base image chosen on purpose, and pinned where it matters?
- Does the final image run as a non-root user?
- Are secrets out of the build context and every layer?
- Can the same inputs build the same image later?
- Is the health check strong enough for the orchestrator to trust?
