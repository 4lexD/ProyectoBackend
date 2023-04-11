import express from 'express';
import cartRouter from './routes/CartRouter.js';
import productsRouter from './routes/ProductsRouter.js';
import {Server} from 'socket.io';
import {engine} from 'express-handlebars'
import{resolve} from 'path'
import viewProductsRouter from './routes/viewProductsRouter.js';
import realTimeProductsRouter from './routes/realTimeProductRouter.js';
import ProductManager from './controller/ProductManager.js';

const app = express();

const PORT = 8080

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/',viewProductsRouter);
app.use('/api/realtimeproducts', realTimeProductsRouter);
app.use('/api/products', productsRouter);

app.use('/api/carts', cartRouter)



const viewsPath= resolve('src/views');

app.engine('handlebars',engine({
    layoutsDir:`${viewsPath}/layouts`,
    defaultLayout:`${viewsPath}/layouts/main.handlebars`
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath);

const httpServer = app.listen(PORT,()=>{
    console.log(`server runing on http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);
export default socketServer;
const pm = new ProductManager('./src/db/products.json');
socketServer.on('connection',  async socket => {
    console.log('Cliente Conectado');
});

