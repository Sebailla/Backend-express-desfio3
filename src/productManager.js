import fs from 'fs'


class ProductManager {

    // Variables privadas
    static id = 0;
    #path

    constructor(path) {
        this.#path = path
        this.products = this.#readFile()
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
            this.products.push({
                // Llamammos al id iautoincremental
                id: ProductManager.id, ...newProduscts
            })
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
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

        return !this.exist(id) ? console.log("Not Found") : console.log(this.exist(id))
    }

    //Actualizamos un producto
    updateProduct(id, properties) {
        let info

        const index = this.products.findIndex(i => i.id === id)

        if (index >= 0) {
            const { id, ...rest } = properties
            this.products[index] = { ...this.products[index], ...rest }
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
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
            this.products.splice(index, 1);
            fs.writeFileSync(this.#path, JSON.stringify(this.products))
            info = `El Producto con ID: ${id}, se eliminó correctamente`
        } else {
            info = `El Producto con ID: ${id}, no existe`
        }

        return info;
    }

}

export default ProductManager