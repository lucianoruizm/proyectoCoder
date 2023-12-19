
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
  const owner = "admin";

  const productData = {
    title,
    description,
    thumbnail,
    price,
    code,
    stock,
    status,
    category,
    owner
  };

  try {
    await axios.post(`${url}/api/products`, productData)
    alert("Producto Agregado")
    socket.emit('nuevoProducto', JSON.stringify(productData))
    productForm.reset()
  } catch (error) {
    alert("Error, no se pudo procesar datos del producto")
    console.error(error);
  }
});

const deleteProduct = async (idProduct, rol) => {
  console.log("DELETE PRODUCT, ", idProduct, rol)
  let body
  console.log("rol: ", rol)

  try {

    if (rol) {
      const getProduct = await axios.get(`${url}/api/products/${idProduct}`)
      body = getProduct.data
      console.log("BODY en delete product: ", body)
    }

    const deleteProduct = await axios.delete(`${url}/api/products/${idProduct}`)

    if (deleteProduct.status === 200) {
      alert("Producto Eliminado")
      socket.emit('eliminarProducto', idProduct)
      rol === 'admin' ? console.log("Se elimino producto de admin") : await axios.post(`${url}/api/mail`, body)
    }

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
    socket.emit('editarProducto', JSON.stringify(productUpdated))
    await axios.put(`${url}/api/products/${idProduct}`, productUpdated);
    alert("Producto Editado")
    productFormEdit.reset();
  } catch (error) {
    alert("No se pudo actualizar el producto")
    console.log(error);
  }
});