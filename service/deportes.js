const fs = require('fs/promises');
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const findAll = async () => {
    try {
        const filePath = path.join(__dirname, '..', 'data', 'deportes.json')
        const datos = await fs.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(datos) 
        const deportes = parsedData.deportes
        return deportes.length > 0
        ? {
            msg: 'El listado de todos los deportes es: ',
            status: 201,
            datos: deportes
        }
        : {
            msg: 'Datos no encontrados',
            status: 204,
            datos: []
        }
    } catch (error) {
        console.log('Error service: ', error);
        return{
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}

const findById = async (id) => {
    try {
        const filePath = path.join(__dirname, '..', 'data', 'deportes.json')
        const datos = await fs.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(datos) 
        const deportes = parsedData.deportes
        const deporteFiltrado = deportes.filter(d => d.id === id)
        return deporteFiltrado
        ? {
            msg: `El deporte con id: ${id} es: `,
            status: 201,
            datos: deporteFiltrado
        }
        : {
            msg: `Deporte con id: ${id} no encontrado`,
            status: 204,
            datos: []
        }
    } catch (error) {
        console.log('Error service: ', error);
        return{
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}

const insert = async (nombre, precio) => {
    try {
        const id = uuidv4().slice(0, 10)
        const filePath = path.join(__dirname, '..', 'data', 'deportes.json')
        const datos = await fs.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(datos) 
        const deportes = parsedData.deportes

        deportes.push({id, nombre, precio})
        await fs.writeFile(filePath, JSON.stringify(parsedData, null, 2))

        return{
            msg: `Nuevo deporte con id: ${id}, nombre: ${nombre} y precio: ${precio} añadidos correctamente`,
            status: 200,
            datos: deportes
        }
    } catch (error) {
        console.log('Error service: ', error);
        return{
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}


const update = async (id, nombre, precio) => {
    try {
        const filePath = path.join(__dirname, '..', 'data', 'deportes.json')
        const datos = await fs.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(datos) 
        const deportes = parsedData.deportes

        const deporteActualizar = deportes.find(d => d.id == id)

        if (deporteActualizar) {
            nombre && (deporteActualizar.nombre = nombre);
            precio && (deporteActualizar.precio = precio);
            await fs.writeFile(filePath, JSON.stringify(parsedData, null, 2))
            return {
                msg: `El deporte con id: ${id}, se actualizo`,
                status: 200,
                datos: deporteActualizar
            }
        } return{
            msg: `El deporte con id: ${id} no se ha encontrado`,
            status: 204,
            datos: []
        }
    } catch (error) {
        console.log('Error service: ', error);
        return{
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}

const deleteById = async (id) => {
    try {
        const filePath = path.join(__dirname, '..', 'data', 'deportes.json')
        const datos = await fs.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(datos) 
        const deportes = parsedData.deportes

        const deporteExiste = deportes.find(d => d.id == id)
        if (!deporteExiste) {
            return{
                msg: `Deporte con id: ${id} no encontrado`,
                status: 204,
                datos: []
            }
        }

        const listadoNuevo = deportes.filter(d => d.id != id)
        parsedData.deportes = listadoNuevo

        await fs.writeFile(filePath, JSON.stringify(parsedData, null, 2))
        return{
            msg: `Deporte con id: ${id} se elimino correctamente`,
            status: 200,
            datos: listadoNuevo
        }
    } catch (error) {
        console.log('Error service: ', error);
        return{
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        }
    }
}



module.exports = {
    findAll, findById, insert, update, deleteById
}