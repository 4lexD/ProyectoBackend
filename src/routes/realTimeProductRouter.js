import { Router } from 'express';
import ProductManager from '../controller/ProductManager.js';

const realTimeProductsRouter = Router();
const pm = new ProductManager('./src/db/products.json');

realTimeProductsRouter.get('/',async (req,res)=>{
    try {
        const products = await pm.getProducts();
        res.render('realTimeProducts', {title:'Lista De Productos en tiempo real',products});
    } catch (error) {
        res.status(500).send(error)
    }
})

export default realTimeProductsRouter;