import fs from 'fs'


class ProductManager {

    // Variables privadas
    static id;
    #path

    constructor(path) {
        this.#path = path
        this.products = this.#readFile()
        ProductManager.id = this.products.length > 0 ? this.products[this.products.length - 1].id : 0  
    }

    #readFile() {
        try {
            if (fs.existsSync(this.#path)) {
                const data = fs.readFileSync(this.#path, 'utf8')
                return JSON.parse(data)
            } else {
                return []
            }
        } catch (error) {

        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        let info
        //Confirmamos que el code no se repita
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === code) {
                info = `El código ${code} esta en uso`
                break;
            }
        }

        //Validamos que todos los campos son obligatorios
        const newProduscts = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (!Object.values(newProduscts).includes(undefined)) {
            // Incrementams el id
            ProductManager.id++;
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
            this.products.push({
                // Llamammos al id iautoincremental
                id: ProductManager.id, ...newProduscts
            })
            
        } else {
            info = "Falta completar datos"
        }
        return info
    }

    //Mostramos todos los productos
    getProduct() {
        return this.products;
    }

    // Validamos si existe el Id
    exist(id) {
        return this.products.find((prod) => prod.id === id)
    }

    //Mostramos los productos por ID
    getProductById(id) {
        let info
        return !this.exist(id) ? info = {error: "Not Found"} : this.exist(id)
    }

    //Actualizamos un producto
    updateProduct(id, properties) {
        let info

        const index = this.products.findIndex(i => i.id === id)

        if (index >= 0) {
            const { id, ...rest } = properties
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
            this.products[index] = { ...this.products[index], ...rest }
            
            info = `El Producto con ID: ${index + 1}, se Actualizó correctamente`
        } else {
            info = `El Producto con ID: ${id}, no existe`
        }

        return info
    }

    // Eliminamos un Producto
    deleteProduct(id) {

        let info

        const index = this.products.findIndex(i => i.id === id)

        if (index >= 0) {
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
            this.products.splice(index, 1);
            
            info = `El Producto con ID: ${id}, se eliminó correctamente`
        } else {
            info = `El Producto con ID: ${id}, no existe`
        }

        return info;
    }

}

export default ProductManager