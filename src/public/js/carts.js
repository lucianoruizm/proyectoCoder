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