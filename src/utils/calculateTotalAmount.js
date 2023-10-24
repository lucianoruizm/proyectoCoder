
const calculateTotalAmount = (products) => {
    const totalAmount = products.reduce((sum, product) => sum + product.product.price * product.quantity, 0)
    return totalAmount
}

module.exports = calculateTotalAmount