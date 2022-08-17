import { AppDataSource } from "./db/dataSource";
import { app } from "./app";
import config from "./config";

AppDataSource.initialize().then(() => {
  app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
})
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })



