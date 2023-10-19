const addToCart = async (productId) => {
  console.log(productId)
  const cartId = document.getElementById('cart-id').value
  console.log(cartId)
  try {
    await axios.post(`http://localhost:8080/api/carts/${cartId}/product/${productId}`);
  } catch (error) {
    console.error(error);
  }
}