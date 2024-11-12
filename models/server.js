const express = require('express')
const hbs = require('hbs')
const path = require('path')

class Server {
    constructor(){
        this.app = express()
        this.port = 3000
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.urlencoded({ extended: true }))
        this.app.set('view engine', 'hbs')
        hbs.registerPartials(path.join(__dirname, '..', 'views', 'partials'))
        hbs.registerHelper('json', function(context) {
            return JSON.stringify(context);
        });
    }

    routes(){
        this.app.use('/deportes', require('../routes/deportes'))
    }

    listen(){
        this.app.listen(this.port, () => console.log(`Puerto abrido ${this.port}`))
    }

}


module.exports = Server;