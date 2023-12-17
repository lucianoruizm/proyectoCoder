const addToCart = async (productId) => {
  console.log(productId)
  const cartId = document.getElementById('cart-id').value
  console.log(cartId)
  try {
    await axios.post(`${process.env.BASE_URL}api/carts/${cartId}/product/${productId}`);
  } catch (error) {
    console.error('Error al agregar producto:', error.message);
    
    if (error.response && error.response.status === 400) {
      console.log('El producto no esta disponible');
      alert('El producto no esta disponible');
    } else {
      console.error('Error desconocido:', error.message);
    }
  }
}