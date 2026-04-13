import { buildServer } from "./server.js";

const app = buildServer();
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

app
  .listen({ port, host })
  .then(() => {
    process.stdout.write(`equipments-service listening on http://${host}:${port}\n`);
  })
  .catch((error) => {
    process.stderr.write(`${error}\n`);
    process.exit(1);
  });
