import {Router} from 'express'
import ProductManager from '../ProductManager.js'

const productsRouter = Router();
const pm = new ProductManager('./db/products.json'); 

productsRouter.get('/', async (req, res)=>{
    const limit = +req.query.limit;

    const products = await pm.getProducts();

    !limit ? res.send(products) : res.send(products.slice(0, limit));
    
});

productsRouter.get('/:id', async (req, res)=>{
    let id = +req.params.id;

    const product = await pm.getProductById(id)

    res.send(product);
});

productsRouter.post('/', async (req,res)=>{
    const {title,description, price, thumbnail, code, stock } = req.body;

    const product = {title,description, price, thumbnail, code, stock};

    const addproduct = await pm.addProducts(product);

    res.status(201).json(product);
});

productsRouter.put('/:id', async (req,res)=>{
    let id = +req.params.id;
    const {title,description, price, thumbnail, code, stock } = req.body;

    const productUpdated = {title,description, price, thumbnail, code, stock};

    const updateProduct = await pm.updateProduct(id, productUpdated);
    
    res.status(200).json(productUpdated);
});

productsRouter.delete('/:id', async (req,res)=>{
    let id = +req.params.id;
    const deleteProduct = await pm.deleteProduct(id);
    
    res.status(204);
});

export default productsRouter;