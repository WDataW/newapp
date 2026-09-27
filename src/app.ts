import express from 'express';
import 'dotenv/config';// don't delete
import { v1Router } from './routes/v1.ts';
import helmet from 'helmet';
import cors from 'cors';
import { PORT } from '#root/src/config/constants.ts';
import { errorHandler, notFound } from '#root/src/middleware/index.ts';
const app = express();

// middleware
app.use(helmet());
app.use(cors())
app.use(express.json())
app.use('/api/v1', v1Router);
app.use(notFound);
app.use(errorHandler);


const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start();