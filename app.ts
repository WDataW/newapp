import express from "express";
import config from "dotenv/config";// don't delete
import { PORT } from "./config/constants.ts";
const app = express();
const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start();