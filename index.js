// manejo de archivo
// Consigna:
// Implementar programa que contenga una clase llamada CONTENEDOR que reciba el nombre del archivo con el que va ha trabajar e implemente los siguientes metodos
// save(object): number
// getByID(id): Object
// getAll(): Object[]
// deleteById(Number): void
// deleteAll(): void

// Sugerencia de Tutor
// Devolucion del software en cada etapa
// Variable generica para el nombre del archivo
// Debe crear el archivo
// Poner La clase contenedor externa
// Trabajar con save para que reciba un objeto:
//    1. verificar si existan productos si no hay crear uno con id 1
//    2. verificar si existan productos si no hay crear uno con id ++
// Delete all await fs.promise.writeFile(path, '[]')


const contenedor = require('./contenedor.js')

const obj =(title, price, img)=>{
    let obj = new Object();
    obj.title = title;
    obj.price = price;
    obj.img = img;
    return obj;
} 

const file = new contenedor('prueba2')
file.save(obj('Lord of the ring', 115,'img')).then(result => console.log(result))
file.save(obj('Spiderman', 150, 'img')).then(result => console.log(result))


