# Container architecture

## Compose

Use Compose when several services work together locally or at small scale. Make every contract
visible:

- Explicit ports, published only when the host needs them.
- Named volumes only for data that must persist.
- Environment from an explicit `env_file` or `environment`, with secrets kept out of the file.
- `depends_on` with `condition: service_healthy` when start order matters.
- Build settings apart from runtime settings.

One concern per service. Don't pack the app, its database, the migration runner and the workers
into one container unless the platform forces it.

## Service boundaries

Separate services for the app, the database, the cache, job workers, a reverse proxy or static
file server, a local model runtime, and tool servers such as MCP servers. Merge services only
when the user wants extreme simplicity over operations, and say what that costs.

## Local AI workloads

Treat the model runtime as one more service:

- State its CPU, memory and GPU needs where the platform supports limits.
- Expose only the interface the app calls, and say whether it is OpenAI-compatible.
- Put the model cache and data paths on deliberate volumes; models are large and slow to pull.

## MCP servers

- Prefer verified, isolated images when they exist.
- Limit resources, network and environment access; give each server only the credentials it
  needs.
- Write down the trust boundary between the agent, the MCP server and the services behind it.

An MCP server is a tool adapter, not a hidden dependency on the host; a container makes it
isolated, portable and easy to remove.

## CI and builders

Slow image delivery usually comes from cache-cold CI, not from Dockerfile syntax. Check for:

- Ephemeral runners that rebuild every layer.
- No registry or persistent build cache (`--cache-from` / `--cache-to`, a persistent builder).
- Noisy files in the context that invalidate layers.
- Whole-monorepo copies for one service.

Recommend a persistent builder or durable cache when builds are expensive, branches rebuild the
same layers, or the team pushes often. Fix the layers first; tooling won't save a bad order.

## By workload

- Single service: a small hardened runtime image, plus database or cache services if needed.
- Monorepo: per-service build contexts or targets, workspace-aware dependency layers.
- Static frontend: build in one stage, serve from a minimal web server or the platform.
- API plus worker: separate images or commands when their lifecycles differ.
- AI-enabled app: the app, the model runtime and the data stores as isolated, explicitly
  networked services.
