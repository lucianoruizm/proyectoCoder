const addToCart = async (productId) => {
    console.log(productId)
    const cartId = '64ea4f4893207f61409583a8'
    try {
      await axios.post(`http://localhost:8080/api/carts/${cartId}/product/${productId}`);
    } catch (error) {
      console.error(error);
    }
}