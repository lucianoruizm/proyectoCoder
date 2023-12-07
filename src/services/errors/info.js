const generateProductErrorInfo = (product) => {
    // return `
    //     Una o mas de las siguientes propiedades es incorrecta:
    //     * title (required): Debe ser tipo String, se recibio: ${product.data.title}
    //     * description: Debe ser tipo String, se recibio: ${product.data.description}
    //     * price (required): Debe ser tipo Float, se recibio: ${product.data.price}
    //     * stock: Debe ser tipo Integer, se recibio: ${product.data.stock}
    //     * code (required): Debe ser tipo String y unico, se recibio: ${product.data.code}
    //     * status: Debe ser tipo Boolean (true/false, 1/0), se recibio: ${product.data.status}
    //     * category: Debe ser tipo String, se recibio: ${product.data.category}
    //     * owner: Debe ser tipo String, se recibio: ${product.data.owner}
    // `
    return {
        title: `Debe ser tipo String, se recibió: ${product.data.title}`,
        description: `Debe ser tipo String, se recibió: ${product.data.description}`,
        price: `Debe ser tipo Float, se recibió: ${product.data.price}`,
        stock: `Debe ser tipo Integer, se recibió: ${product.data.stock}`,
        code: `Debe ser tipo String y único, se recibió: ${product.data.code}`,
        status: `Debe ser tipo Boolean (true/false, 1/0), se recibió: ${product.data.status}`,
        category: `Debe ser tipo String, se recibió: ${product.data.category}`,
        owner: `Debe ser tipo String, se recibió: ${product.data.owner}`
    }
}

module.exports = generateProductErrorInfo