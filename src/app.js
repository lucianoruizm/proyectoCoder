const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const handlebars = require('express-handlebars')
const passport = require('passport')

const initializePassport = require('./config/passport.config')

const viewsRouter = require('./routers/viewsRouter')
const productsRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
const sessionRouter = require('./routers/sessionRouter')

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const MONGODB_CONNECT = 'mongodb+srv://gordon_free3:GreciasenEgal789@cluster0.nfgcx.gcp.mongodb.net/ecommerce?retryWrites=true&w=majority'
mongoose.connect(MONGODB_CONNECT)
.then(()=>console.log('conexion DB'))
.catch((error) => console.log(error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser('secretkey'))

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGODB_CONNECT,
        tlt: 15
    }),
    secret: 'secretSessoin',
    resave: true,
    saveUninitialized: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto: ${PORT}`))

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/session', sessionRouter)
