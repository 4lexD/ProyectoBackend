import express from 'express';
import cartRouter from './routes/CartRouter.js';
import productsRouter from './routes/ProductsRouter.js';

const app = express();

const PORT = 8080

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/api/products', productsRouter);

app.use('/api/carts', cartRouter)

app.listen(PORT,()=>{
    console.log(`server runing on http//:localhost:${PORT}`);
});
