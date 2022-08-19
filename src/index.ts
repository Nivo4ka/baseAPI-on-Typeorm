import AppDataSource from './db/dataSource';
import app from './app';
import config from './config';

(async () => {
  await AppDataSource.initialize();
  // eslint-disable-next-line no-console
  app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
})();
