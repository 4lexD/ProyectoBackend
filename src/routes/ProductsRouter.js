import { Router } from 'express';
import ProductManager from '../controller/ProductManager.js';

const productsRouter = Router();
const pm = new ProductManager('./db/products.json');

productsRouter.get('/', async (req, res) => {
  try {
    const limit = +req.query.limit;

    const products = await pm.getProducts();

    !limit ? res.send(products) : res.send(products.slice(0, limit));
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

productsRouter.get('/:id', async (req, res) => {
  try {
    let id = +req.params.id;

    const product = await pm.getProductById(id);

    res.send(product);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;

    const product = { title, description, price, thumbnail, code, stock };

    const addproduct = await pm.addProducts(product);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

productsRouter.put('/:id', async (req, res) => {
  try {
    let id = +req.params.id;
    const { title, description, price, thumbnail, code, stock } = req.body;

    const productUpdated = { title, description, price, thumbnail, code, stock };

    const updateProduct = await pm.updateProduct(id, productUpdated);

    res.status(200).json(productUpdated);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

productsRouter.delete('/:id', async (req, res) => {
  try {
    let id = +req.params.id;
    const deleteProduct = await pm.deleteProduct(id);

    res.status(204);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

export default productsRouter;
