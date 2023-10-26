const cartId = document.getElementById('cart-id').value

const deleteFromCart = async (productId) => {
  console.log("cartId: ", cartId)
  console.log("productId: ", productId)
  try {
    await axios.delete(`http://localhost:8080/api/carts/${cartId}/products/${productId}`);
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

  if (data.quantity <= 0) {
    return deleteFromCart(productId)
  }

  try {
    await axios.put(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, data);
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

  try {
    const response = await axios.put(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, data);
    console.log(response)
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

document.getElementById('purchaseBtn').addEventListener('click', 
async () => {
  let cart;
  try {
    const cartId = document.getElementById('purchaseBtn').dataset.cartId
    console.log("este es cartId: ", cartId)
    const response = await axios.get(`http://localhost:8080/api/carts/${cartId}`)
    cart = response.data
    console.log("Este es el cart", cart)
    
    if (cart) {
      const productsToPurchase = cart.products
      const responsePurchase = await axios.post(`http://localhost:8080/api/carts/${cartId}/purchase`, { products: productsToPurchase })
      console.log("Esta es la respuesta del post de compra: ", responsePurchase.data)

      const headers = {
        'Content-Type': 'application/json',
      }

      const body = responsePurchase.data
      console.log("BODY en JS: ", body)

      if(responsePurchase.status === 200) {
        await axios.post(`http://localhost:8080/api/mail`, body, {header: headers})
      }
      
      window.location.href = '/products'
    } else {
      console.log("No existe el CART")
    }
  } catch (error) {
    console.error('Error al comprar productos: ', error)
  }
})