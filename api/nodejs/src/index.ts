import express from "express";
import { waitForDatabase } from "./utils/wait-for-db";

import { initializeDatabase } from "./models";
import { umzug } from "./database";

import messageRoutes from "./routes/messageRoutes";

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === "development") {
  console.log("You are using a test environment");
  require("dotenv").config();
}

async function main() {
	const app = express();
	const HOST = process.env.API_HOST as string;
	const PORT = process.env.API_PORT as string;

	app.use(express.json());

	await waitForDatabase();
	await initializeDatabase();

	try {
		console.log("Starting migrations...");
		const executed = await umzug.up();
		console.log("Migrations were executed:", executed);

		const pending = await umzug.pending();
		console.log("Pending migrations:", pending);
	} catch (err) {
		console.error("Migration failed:", err);
		process.exit(1);
	}

	app.use("/api", messageRoutes);

	app.listen(PORT, () => {
		console.log(`⚡️[server]: Server is running at http://${HOST}:${PORT}`);
	});
}

main().catch(err => {
	console.error("Fatal error during startup:", err);
	process.exit(1);
});
