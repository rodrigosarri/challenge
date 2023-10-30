import { sequelize } from "../models";

const MAX_RETRIES = 30;
const WAIT_INTERVAL = 3000;

export async function waitForDatabase(tries: number = 0): Promise<void> {
  if (tries > MAX_RETRIES) {
    console.error("Maximum retries reached, exiting.");
    process.exit(1);
  }

  try {
    console.log("Trying to connect to the database...");
    await sequelize.authenticate();
    console.log("Database is up and running!");
  } catch (error) {
    console.error("Could not connect to the database, retrying in 3 seconds...");
    await new Promise(resolve => setTimeout(resolve, WAIT_INTERVAL));
    await waitForDatabase(tries + 1);
  }
}