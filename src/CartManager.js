import fs from "fs";

class CartManager {
  constructor(path) {
    this._path = path;
  }

  async createCart() {
    try {
      let carts = [];
      if (fs.existsSync(this._path)) {
        carts = await this.getCarts();
      }
  
      const newCart = {
        id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
        products: []
      };
  
      carts.push(newCart);
  
      await fs.promises.writeFile(this._path, JSON.stringify(carts, null, 2));
  
      return "Carrito creado correctamente.";
    } catch (error) {
      return "No se pudo crear el carrito.";
    }
  }

  async getCarts() {
    try {
      const content = await fs.promises.readFile(this._path, "utf-8");
      if (content.length > 0) {
        const carts = JSON.parse(content);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      return "No se pudo leer el archivo de carritos";
    }
  }
  async addToCart(cid, pid) {
    try {
      const carts = await this.getCarts();
      const index = carts.findIndex((cart) => cart.id === cid);
  
      if (index === -1) {
        return "El carrito no existe";
      }
  
      const products = carts[index].products;
      const productIndex = products.findIndex((product) => product.id === pid);
  
      if (productIndex === -1) {
        const productToAdd = { id: pid, quantity: 1 };
        carts[index].products.push(productToAdd);
      } else {
        carts[index].products[productIndex].quantity++;
      }
  
      await fs.promises.writeFile(this._path, JSON.stringify(carts, null, 2));
  
      return "Producto agregado al carrito correctamente";
    } catch (error) {
      return "No se pudo agregar el producto al carrito";
    }
  }

  async getCartById(id){
        try{
            const carts = await this.getCarts();
            const cart = carts.find(element=>element.id === id)
            return cart;
        }  catch(error){
            return "el archivo no  ha podido ser leido"
        }
    }
}

export default CartManager;