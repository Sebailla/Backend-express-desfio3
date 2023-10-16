import ProductManager from './src/productManager.js';

const products = new ProductManager('BD.json');

console.log(products.getProduct());