import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const PORT = 8080

const pm = new ProductManager('./db/products.json'); 

app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res)=>{
    const limit = +req.query.limit;
    const products = await pm.getProducts();

    !limit ? res.send(products) : res.send(products.slice(0, limit));
    
});

app.get('/products/:id', async (req, res)=>{
    let id = +req.params.id;
    const product = await pm.getProductById(id)
    res.send(product);
});


app.listen(PORT,()=>{
    console.log(`server listen on port ${PORT}`)
});
