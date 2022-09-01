const fs = require('fs');
const path = require('path');

class contenedor {
    constructor(name){
        this.nameFile = path.format({
            root: './',
            name: name,
            ext: '.json'
        });
        console.log(this.nameFile);
    }
    save = async (product) => {
        if (!product.title || !product.title || !product.price || !product.img) return {status: "error", message: "Debe cargar todos los campos"};
        try {
            if (fs.existsSync(this.nameFile)){
                let data= await fs.promises.readFile(this.nameFile, 'utf8');
                let products = JSON.parse(data);
                console.log(products.length)
                let id = products[products.length - 1].id + 1;
                product.id = id;
                products.push(product);
                await fs.promises.writeFile(this.nameFile, JSON.stringify(products, null, 2))
                return {status: "success", message: `product numero ${product.id} Agregado`};
            }  else {
                product.id = 1
                await fs.promises.writeFile(this.nameFile, JSON.stringify([product], null, 2));
                return {status: "success", message: `product numero ${product.id} Agregado`}
            }
        }
        catch (e) { return {status: "error", message: e.message}; }
    }
    getById = async (id) => {
        if (!id) return {status: "error", message: "favor ingresar ID"}
        if (fs.existsSync(this.nameFile)) {
            let data = await fs.promises.readFile(this.nameFile, 'utf-8')
            let products = JSON.parse(data)
            let product = products.find(product => product.id === id)
            if (product) return {status: "success", message: product}
            return {status: "error", message: "null"}
        } else {
            return {status: "error", message: err.message}
        }
    }
    getAll = async () => {
        if (fs.existsSync(this.nameFile)) {
            let data = await fs.promises.readFile(this.nameFile, 'utf-8')
            let products = JSON.parse(data)
            return {status: "success", message: products}
        } else {
            return {status: "error", message: err.message}
        }
    }
    deleteById = async (id) => {
        if (!id) return {status: "error", message: "favor ingresar ID" }
        if (fs.existsSync(this.nameFile)) {
            let data = await fs.promises.readFile(this.nameFile, 'utf-8')
            let products = JSON.parse(data)
            let newproducts = products.filter(product => product.id !== id)
            await fs.promises.writeFile(this.nameFile, JSON.stringify(newproducts, null, 2))
            return {status: "success", message: "producto Eliminado"}
        } else {
            return {status: "error", message: err.message}
        }
    }
    deleteAll = async () => {
        if (fs.existsSync(this.nameFile)) {
            let data = await fs.promises.readFile(this.nameFile, 'utf-8')
            let products = JSON.parse(data)
            let newProducts = products.filter(product => product.length)
            await fs.promises.writeFile(this.nameFile, JSON.stringify(newProducts, null, 2))
            return {status: "success", message: "productos Eliminados"}
        } else {
            return {status: "error", message: err.message}
        }
    }
}


module.exports = contenedor;