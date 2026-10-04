import express from 'express';
import 'dotenv/config';// don't delete
import { v1Router } from './routes/v1.ts';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler, notFound } from '#root/src/middleware/index.ts';
import { LPORT } from '#root/src/config/constants.ts';
const app = express();

// middleware
app.use(helmet());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1', v1Router);
app.use(notFound);
app.use(errorHandler);


const start = async () => {
    try {
        app.listen(LPORT, () => console.log(`Server listening on port ${LPORT}`));
    } catch (error) {
        console.log(error);
    }
}
start();