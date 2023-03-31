import {Router} from 'express'
import CartManager from '../CartManager.js'

const cartRouter = Router();
const cm = new CartManager("./db/carts.json");

cartRouter.get('/:id',async (req,res)=>{
    let id = +req.params.id;
    const getCart = await cm.getCartById(id)

    res.send(getCart);
});

cartRouter.post( '/',async(req,res)=>{
    const create = await cm.createCart();
    res.status(201).json("created")
});

cartRouter.post( '/:cid/products/:pid',async(req,res)=>{
    let cid = +req.params.cid;

    let pid = +req.params.pid;

    const addToCart = await cm.addToCart(cid,pid);

    res.status(201).json("added product")
});

export default cartRouter;