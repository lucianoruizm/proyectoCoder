const cartId = document.getElementById('cart-id').value

const deleteFromCart = async (productId) => {
  console.log("cartId: ", cartId)
  console.log("productId: ", productId)
  try {
    await axios.delete(`${process.env.BASE_URL}/api/carts/${cartId}/product/${productId}`);
    socket.emit('eliminarProductoDelCart', JSON.stringify(productId))
  } catch (error) {
    console.error(error);
  }
}
  
const substractFunction = async (productId, quantity) => {
  console.log("cartId: ", cartId)
  console.log("productId: ", productId)
  console.log("quantity: ", quantity)

  const data = {
    "quantity": parseInt(quantity) - 1
  }

  let dataSocket = {
    productId: productId,
    quantity: data.quantity
  }

  if (data.quantity <= 0) {
    dataSocket = {
      productId: productId,
      quantity: 0
    }
    socket.emit('restarProducto', JSON.stringify(dataSocket))
    return deleteFromCart(productId)
  }
  
  try {
    await axios.put(`${process.env.BASE_URL}/api/carts/${cartId}/product/${productId}`, data);
    socket.emit('restarProducto', JSON.stringify(dataSocket))
  } catch (error) {
    console.error(error);
  }
}

const sumFunction = async (productId, quantity) => {
  console.log("cartId: ", cartId)
  console.log("productId: ", productId)
  console.log("quantity: ", quantity)

  const data = {
    "quantity": parseInt(quantity) + 1
  }

  const dataSocket = {
    productId: productId,
    quantity: data.quantity
  }

  try {
    const response = await axios.put(`${process.env.BASE_URL}/api/carts/${cartId}/product/${productId}`, data);
    console.log(response)
    socket.emit('sumarProducto', JSON.stringify(dataSocket))
  } catch (error) {
    console.error('Error al sumar producto:', error.message);
    
    if (error.response && error.response.status === 400) {
      console.log('No hay suficiente stock disponible');
      alert('No hay suficiente stock disponible');
    } else {
      console.error('Error desconocido:', error.message);
    }
  }
}

document.getElementById('clearCart').addEventListener('click', 
async () => {
  try {
    const cartId = document.getElementById('clearCart').dataset.cartId
    await axios.delete(`${process.env.BASE_URL}/api/carts/${cartId}`)
    console.log("Se limpio CART")
    socket.emit('limpiarCart')
  } catch (error) {
    console.error('Error al limpiar productos del cart: ', error)
  }
})

document.getElementById('purchaseBtn').addEventListener('click', 
async () => {
  let cart;
  try {
    const cartId = document.getElementById('purchaseBtn').dataset.cartId
    console.log("este es cartId: ", cartId)
    const response = await axios.get(`${process.env.BASE_URL}/api/carts/${cartId}`)
    cart = response.data
    console.log("Este es el cart", cart)
    
    if (cart) {
      const productsToPurchase = cart.products
      const responsePurchase = await axios.post(`${process.env.BASE_URL}/api/carts/${cartId}/purchase`, { products: productsToPurchase })
      console.log("Esta es la respuesta del post de compra: ", responsePurchase.data)

      const headers = {
        'Content-Type': 'application/json',
      }

      const body = responsePurchase.data
      console.log("BODY en JS: ", body)

      if(responsePurchase.status === 200) {
        await axios.post(`${process.env.BASE_URL}/api/mail`, body, {header: headers})
        //await axios.get(`http://localhost:8080/api/sms/${body.userId}/${body.ticket.code}`, body, {header: headers})
      }
      
      window.location.href = '/products'
    } else {
      console.log("No existe el CART")
    }
  } catch (error) {
    console.error('Error al comprar productos: ', error)
  }
})