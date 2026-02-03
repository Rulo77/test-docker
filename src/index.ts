import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import "dotenv/config";


import MainRoutes from './routes/main.route';
import ProductRoutes from './routes/products.routes';
import { httpRequestCounter, register } from "./metrics";


const app = express();

app.set('trust proxy', true);
app.use(express.json());

async function setupMiddleware() {
    app.use(cors());
    if (process.env.NODE_ENV === 'DEV') {
        const morgan = await import('morgan')
        app.use(morgan.default('dev'));
    }

    app.use((req:Request, res:Response, next:NextFunction) => {
        res.on('finish', ()=>{
            httpRequestCounter.inc({
                method: req.method,
                route: req.route?.path || req.path,
                status: res.statusCode.toString(),
            });
        });
        next();
    })

    app.use('/main', MainRoutes);
    app.use('/product', ProductRoutes);
    //endpoint de metricas
    app.get('/metrics', async (_req, res) => {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    });
}

app.set('port', process.env.PORT || 3050);
const port = app.get('port');

setupMiddleware().then(
   ()=> app.listen(port, ()=> console.log(`app running on: http://localhost:${port}`))
)