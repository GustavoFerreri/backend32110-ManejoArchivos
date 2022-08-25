const fs = require('fs');

Array.prototype.remove =
    Array.prototype.remove ||
    function () {
        this.splice(0, this.length);
    };

// Se inicia el codigo en 1
let cod = 1
const obj =(title, price, img)=>{
    let obj = new Object();
    obj.id = cod++;
    obj.title = title;
    obj.price = price;
    obj.img = img;
    return obj;
} 

class Contenedor {
    constructor(nombre){
        this.nameFile = `./${nombre}.json`;
    }
    save = async (obj) =>{
        try{
            // console.log(`Se agrega al archivo: \n
            //             ${obj.title} con codigo ${obj.id}`)
            if (this.getAll()!=false) {
                let dataObj = new Object();
                dataObj = await this.getAll();
                console.log(dataObj);
                dataObj.push(obj);
                console.log(dataObj);
                fs.writeFile(this.nameFile, JSON.stringify(dataObj), 'utf-8', (err)=>{if(err) console.log(err)})
            } else {
                console.log('El archivo no existe')
            }
            
        }
        catch (e){
            console.log('Error en la escritura del archivo', e)
        }
    }
    getAll = async () =>{
        try {
            if (fs.existsSync(this.nameFile)){
                let dataReturn = await fs.promises.readFile(this.nameFile, 'utf-8')
                return JSON.parse(dataReturn)
            } else {
                console.log('El archivo no existe');
                return false;
            }

        }
        catch (e) {
            console.log('Error en la lectura del archivo', e)
        }
        
    }
    deleteAll = async () =>{
        this.objData.remove()
        await fs.promises.writeFile(this.nameFile, JSON.stringify(this.objData, null, 2))
    }
    getByid = async (id) => {
        try{
            const dataReturn = await fs.promises.readFile(this.nameFile, 'utf-8');
            console.log(`\nBuscamos el registro con id: ${id}`);
            console.log(JSON.parse(dataReturn, null, ' ').filter(x=>x.id ==id));
        }
        catch(e){
            console.log('Error al buscar el id', e)
        }
    }
    deleteById = async(id) => {
        try{
            const dataReturn = await fs.promises.readFile(this.nameFile, 'utf-8');
            let newArray = JSON.parse(dataReturn, null, ' ');
            newArray.forEach((element, index)=>{
                if(element.id==id){
                    newArray.splice(index, 1)
                }})
            console.log(newArray)
            await fs.promises.writeFile(this.nameFile, JSON.stringify(newArray, null, ' '), 'utf-8')
        }
        catch(e){
            console.log('Error al buscar la id', e)
        }
    }

}

const file = new Contenedor('prueba2')
file.save(obj('Lord of the ring', 115,'img'))
file.save(obj('Spiderman', 150, 'img'))
file.save(obj('Superman', 123, 'img'))
