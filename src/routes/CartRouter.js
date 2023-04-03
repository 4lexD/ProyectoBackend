import { Router } from 'express'
import CartManager from '../controller/CartManager.js'

const cartRouter = Router();
const cm = new CartManager("./models/carts.json");

cartRouter.get('/:id', async (req, res) => {
  try {
    let id = +req.params.id;
    const getCart = await cm.getCartById(id);
    res.send(getCart);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

cartRouter.post('/', async (req, res) => {
  try {
    const create = await cm.createCart();
    res.status(201).json(create);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

cartRouter.post('/:cid/products/:pid', async (req, res) => {
  try {
    let cid = +req.params.cid;
    let pid = +req.params.pid;
    const addToCart = await cm.addToCart(cid, pid);
    res.status(201).json("added product");
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

export default cartRouter;