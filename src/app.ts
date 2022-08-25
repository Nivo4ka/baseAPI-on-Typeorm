import express from 'express';
import cors from 'cors';
import router from './routes';
import errorHandler from './middelwares/errorHandler';
import types from './types'; // eslint-disable-line @typescript-eslint/no-unused-vars

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', router);

app.use(errorHandler);

export default app;
