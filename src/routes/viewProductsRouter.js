import { Router } from 'express';
import ProductManager from '../controller/ProductManager.js';

const viewProductsRouter = Router();
const pm = new ProductManager('./src/db/products.json');

viewProductsRouter.get('/',async (req,res)=>{
    try {
        const products = await pm.getProducts();
        res.render('home', {title:'Lista De Productos',products});
    } catch (error) {
        res.status(500).send(error)
    }
})

export default viewProductsRouter;