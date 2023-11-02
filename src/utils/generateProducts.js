const { faker } = require('@faker-js/faker')

const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.commerce.isbn(),
        stock: faker.string.numeric(1),
        department: faker.commerce.department(),
    }
}

module.exports = generateProduct