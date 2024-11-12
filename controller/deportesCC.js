const { findAll, update, findById, insert, deleteById } = require("../service/deportes")


const findAllCC = async (req, res) => {
    try {
        const respuesta = await findAll()
        res.render('index', {respuesta})
    } catch (error) {
        console.log('Error controller: ', error)
        res.status(500).render('index', {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        })
    }
}

const findByIdCC = async (req, res) => {
    try {
        const id = req.query.id
        const respuesta = await findById(id)
        res.render('index', {respuesta})
    } catch (error) {
        console.log('Error controller: ', error)
        res.status(500).render('index', {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        })
    }
}

const preInsertCC = (req, res) => {
    try {
        res.render('insert')
    } catch (error) {
        console.log('Error controller: ', error)
        res.status(500).render('insert', {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        })
    }
}


const insertCC = async (req, res) => {
    try {
        const { nombre, precio } = req.body
        const respuesta = await insert(nombre, precio)
        res.render('insert', {respuesta})
    } catch (error) {
        console.log('Error controller: ', error)
        res.status(500).render('insert', {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        })
    }
}

const preUpdateCC = async (req, res) => {
    try {
        const { id } = req.query
        const respuesta = await findById( id )
        res.render('update', {respuesta: {
            datos: respuesta.datos[0]
        }})
    } catch (error) {
        console.log('Error controller: ', error)
        res.status(500).render('update', {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        })
    }
}


const updateCC = async (req, res) => {
    try {
        const { id, nombre, precio } = req.body
        const respuesta = await update( id, nombre, precio )
        res.render('update', {respuesta})
    } catch (error) {
        console.log('Error controller: ', error)
        res.status(500).render('update', {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        })
    }
}

const deleteByIdCC = async (req, res) => {
    try {
        const { id } = req.query;
        const respuesta = await deleteById(id)
        res.render('index', {respuesta})
    } catch (error) {
        console.log('Error controller: ', error)
        res.status(500).render('index', {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        })
    }
}

module.exports = {
    findAllCC, findByIdCC, preInsertCC, insertCC, preUpdateCC, updateCC, deleteByIdCC
}