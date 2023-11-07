const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const dotenv = require('dotenv')
const configFn = require('./config')
const MongoStore = require('connect-mongo')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')

const initializePassport = require('./config/passport.config')

const viewsRouter = require('./routers/viewsRouter')
const productsRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
const sessionRouter = require('./routers/sessionRouter')
const mailRouter = require('./routers/mailRouter')
const SMSRouter = require('./routers/SMSRouter')
const mockingRouter = require('./routers/mockingRouter')
const ErrorMiddleware = require('./middlewares/errorMiddleware')
const addLogger = require('./utils/logger')


const app = express()

dotenv.config()
const config = configFn()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const MONGODB_CONNECT = `mongodb+srv://${config.db_user}:${config.db_password}@${config.db_host}/${config.db_name}?retryWrites=true&w=majority`
mongoose.connect(MONGODB_CONNECT)
.then(()=>console.log('conexion DB'))
.catch((error) => console.log(error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser('secretkey'))
initializePassport(passport)

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGODB_CONNECT,
        ttl: 5 * 60
    }),
    secret: 'secretSession',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(addLogger)

const httpServer = app.listen(config.PORT, () => console.log(`Servidor Express escuchando en el puerto: ${config.PORT}`))
const io = new Server(httpServer)

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/session', sessionRouter)
app.use('/api/mail', mailRouter)
app.use('/api/sms', SMSRouter)
app.use('/mockingproducts', mockingRouter)

app.get('/logger', (req, res) => {
  req.logger.warning("¡Alerta!")
  res.send({mesagge: "¡Prueba de LOGGER!"})
})

//app.use(ErrorMiddleware)

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado a WebSocket.');
  
    socket.on('nuevoProducto', (data) => {
      const product = JSON.parse(data);
      io.emit('nuevoProducto', product);
    });
  
    socket.on('eliminarProducto', (productId) => {
      io.emit('eliminarProducto', productId);
    });

    socket.on('editarProducto', (data) => {
      io.emit('editarProducto', JSON.parse(data));
    });
  
    socket.on('disconnect', () => {
      console.log('Cliente desconectado.');
    });
});