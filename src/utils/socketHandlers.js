
const handleSocketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado a WebSocket.');
      
        socket.on('nuevoProducto', (data) => {
          const product = JSON.parse(data);
          io.emit('nuevoProducto', product);
        });

        socket.on('nuevoProductoPremium', (data) => {
          const product = JSON.parse(data);
          io.emit('nuevoProductoPremium', product);
        });
      
        socket.on('eliminarProducto', (productId) => {
          io.emit('eliminarProducto', productId);
        });
    
        socket.on('editarProducto', (data) => {
          io.emit('editarProducto', JSON.parse(data));
        });

        socket.on('editarProductoPremium', (data) => {
          io.emit('editarProductoPremium', JSON.parse(data));
        });
    
        socket.on('eliminarProductoDelCart', (data) => {
          io.emit('eliminarProductoDelCart', JSON.parse(data));
        });
    
        socket.on('sumarProducto', (data) => {
          io.emit('sumarProducto', JSON.parse(data));
        });
    
        socket.on('restarProducto', (data) => {
          io.emit('restarProducto', JSON.parse(data));
        });
    
        socket.on('limpiarCart', () => {
          io.emit('limpiarCart');
        });
    
        socket.on('eliminarUser', (userId) => {
          io.emit('eliminarUser', userId);
        });
    
        socket.on('editarUser', (data) => {
          io.emit('editarUser', JSON.parse(data));
        });
      
        socket.on('disconnect', () => {
          console.log('Cliente desconectado.');
        });
    });
}

module.exports = handleSocketEvents