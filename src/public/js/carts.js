
const deleteFromCart = async (productId) => {
    const cartId = '64ea4f4893207f61409583a8'
    console.log("cartId: ", cartId)
    console.log("productId: ", productId)
    try {
      await axios.delete(`http://localhost:8080/api/carts/${cartId}/products/${productId}`);
    } catch (error) {
      console.error(error);
    }
  }
  
const substractFunction = async (productId, quantity) => {
  const cartId = '64ea4f4893207f61409583a8'
  console.log("cartId: ", cartId)
  console.log("productId: ", productId)
  console.log("quantity: ", quantity)

  const data = {
    "quantity": parseInt(quantity) - 1
  }

  if (data.quantity === -1) {
    return deleteFromCart(productId)
  }

  try {
    await axios.put(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, data);
  } catch (error) {
    console.error(error);
  }
}

const sumFunction = async (productId, quantity) => {
  const cartId = '64ea4f4893207f61409583a8'
  console.log("cartId: ", cartId)
  console.log("productId: ", productId)
  console.log("quantity: ", quantity)

  const data = {
    "quantity": parseInt(quantity) + 1
  }

  try {
    await axios.put(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, data);
  } catch (error) {
    console.error(error);
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
      const response2 = await axios.post(`http://localhost:8080/api/carts/${cartId}/purchase`, { products: productsToPurchase })
      console.log("Esta es la respuesta del post de compra: ", response2.data)
  
      window.location.href = '/products'
    } else {
      console.log("NOOOOOOOOOOOOOOOOOOOOOO")
    }
  } catch (error) {
    console.error('Error al comprar productos: ', error)
  }
})