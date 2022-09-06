import express from 'express';
import cors from 'cors';
import router from './routes';
import errorHandler from './middelwares/errorHandler';
import config from './config';
import types from './types'; // eslint-disable-line @typescript-eslint/no-unused-vars

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(cors(config.cors));

app.use('/static', express.static(`${__dirname}/source/images`));

app.use('/api', router);

app.use(errorHandler);

export default app;
