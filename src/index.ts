import { AppDataSource } from "./db/dataSource";
import { app } from "./app";
import config from "./config";

AppDataSource.initialize()

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));

