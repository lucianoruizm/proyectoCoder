
const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const description = document.querySelector('input[name="description"]').value;
  const thumbnail = document.querySelector('input[name="thumbnail"]').value;
  const price = document.querySelector('input[name="price"]').value;
  const code = document.querySelector('input[name="code"]').value;
  const stock = document.querySelector('input[name="stock"]').value;
  const status = document.querySelector('select[name="status"]').value;
  const category = document.querySelector('input[name="category"]').value;

  const productData = {
    title,
    description,
    thumbnail,
    price,
    code,
    stock,
    status,
    category,
  };

  try {
    const response = await axios.post(`${url}/api/products`, productData)
  
    if (response.status === 201) {
      alert("Producto Agregado")
      socket.emit('nuevoProductoPremium', JSON.stringify(productData))
    }
    productForm.reset()
  } catch (error) {
    console.error(error);
  }
});

const deleteProduct = async (idProduct) => {
  console.log(idProduct)

  try {
    await axios.delete(`${url}/api/products/${idProduct}`);
    alert("Producto Eliminado")
    socket.emit('eliminarProducto', idProduct)
  } catch (error) {
    console.error(error)
  }
}

const productFormEdit = document.getElementById('productFormEdit');
productFormEdit.addEventListener('submit', async (event) => {
  event.preventDefault();

  const idProduct = document.querySelector('input[name="idEdit"]').value;
  console.log(idProduct)

  const title = document.querySelector('input[name="titleEdit"]').value;
  const description = document.querySelector('input[name="descriptionEdit"]').value;
  const thumbnail = document.querySelector('input[name="thumbnailEdit"]').value;
  const price = document.querySelector('input[name="priceEdit"]').value;
  const code = document.querySelector('input[name="codeEdit"]').value;
  const stock = document.querySelector('input[name="stockEdit"]').value;
  const status = document.querySelector('select[name="statusEdit"]').value;
  const category = document.querySelector('input[name="categoryEdit"]').value;

  const productUpdated = {
    _id: idProduct,
    title,
    description,
    thumbnail,
    price,
    code,
    stock,
    status,
    category
  }

  console.log(productUpdated)

  try {
    await axios.put(`${url}/api/products/${idProduct}`, productUpdated);
    alert("Producto Editado")
    socket.emit('editarProductoPremium', JSON.stringify(productUpdated))
    productFormEdit.reset();
  } catch (error) {
    console.log(error);
  }
});