import express from "express";
import "dotenv/config";


import MainRoutes from './routes/main.route';
import ProductRoutes from './routes/products.routes';


const app = express();
app.use(express.json());

async function setupMiddleware() {
    if (process.env.NODE_ENV === 'DEV') {
        const morgan = await import('morgan')
        app.use(morgan.default('dev'));
    }

    app.use('/main', MainRoutes);
    app.use('/product', ProductRoutes);
}

app.set('port', process.env.PORT || 3050);
const port = app.get('port');

setupMiddleware().then(
   ()=> app.listen(port, ()=> console.log(`app running on: http://localhost:${port}`))
)