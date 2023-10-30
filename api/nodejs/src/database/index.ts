import { Umzug, SequelizeStorage } from "umzug";
import { sequelize } from "../models";

export const umzug = new Umzug({
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  migrations: { glob: "dist/migrations/*.js" },
  logger: console,
});

if (require.main === module) {
  umzug.up().catch(err => {
    console.error("Migration failed:", err);
    process.exit(1);
  });
}
