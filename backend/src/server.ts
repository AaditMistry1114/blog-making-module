import app from "./app";
import { env } from "./config/env";
import { initAuth } from "./services/auth.service";

async function startServer(): Promise<void> {
  await initAuth();

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
