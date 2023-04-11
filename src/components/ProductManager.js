import { promises as fs, unwatchFile } from "fs"

export default class ProductManager {
    constructor() {
        this.path = "./productos.txt"
        this.products = []
    }


    static id = 0

    addProduct = async (title, description, price, image, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)


        await fs.writeFile(this.path, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8")
        return JSON.parse(respuesta);
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        if (!respuesta3.find(products => products.id === id)) {
            console.log("Producto no encontrado")
        } else {
            console.log(respuesta3.find(products => products.id === id))
        }
    };

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto eliminado");
    };

    updateProducts = async ({ id, ...producto }) => {

        await this.deleteProductsById(id);
        let productOld = await this.readProducts()

        let productModif = [
            {...producto, id},
            ...productOld
        ]
        await fs.writeFile(this.path, JSON.stringify(productModif));
    };
}

/* const productos = new ProductManager() */

/* productos.addProduct("Titulo1", "Zapato1", 14999, "img1", "asd56", 25)
productos.addProduct("Titulo2", "Zapato2", 14999, "img2", "asd566", 26)
productos.addProduct("Titulo3", "Zapato3", 14999, "img3", "asd567", 27) 
productos.addProduct("Titulo4", "Zapato4", 14999, "img4", "asd568", 28)
productos.addProduct("Titulo5", "Zapato5", 14999, "img5", "asd569", 29)
productos.addProduct("Titulo6", "Zapato6", 14999, "img6", "asd570", 30)
productos.addProduct("Titulo7", "Zapato7", 14999, "img7", "asd571", 31)
productos.addProduct("Titulo8", "Zapato8", 14999, "img8", "asd572", 32)
productos.addProduct("Titulo9", "Zapato9", 14999, "img9", "asd573", 33)
productos.addProduct("Titulo10", "Zapato10", 14999, "img10", "asd574", 34) */

/* productos.getProducts(); */

/* productos.getProductsById(3); */

/* productos.deleteProductsById(2); */

/* productos.updateProducts({
    title: 'Titulo3',
    description: 'Zapato3',
    price: 4500,
    image: 'img3',
    code: 'asd567',
    stock: 27,
    id: 3
}); */
