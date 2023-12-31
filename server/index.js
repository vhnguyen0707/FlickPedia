import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './src/routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false})); //use basic querystring to parse url-encoded form data
app.use(cookieParser());

app.use('/api', routes);

const port = process.env.PORT || 8000;
const MONGODB_URL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URL).then(() => {
    console.log('Mongodb connected');
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
    process.exit(1);
})

export default app;