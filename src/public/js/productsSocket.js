const socket = io()

socket.on('nuevoProducto', (data) => {
  console.log('Cliente. POST')
  const product = data
  console.log("*** socket new product: ***", product)
  const isAdmin = !product.owner

  const productHTML = `
  <tr>
      <td>${product._id}</td>
      <td>${product.title}</td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>${product.category}</td>
      <td>${product.status}</td>
      <td>${product.code}</td>
      ${isAdmin ? '<td>admin</td>' : `<td>${product.owner}</td>`}
      <td>
        <button onclick="deleteProduct('{{product._id}}')">Eliminar</button>
      </td>
  </tr>
  `

  const table = document.getElementById('productos')

  table.innerHTML += productHTML

})

socket.on('eliminarProducto', (productId) => {
  console.log('Cliente. DELETE', productId)

  const table = document.getElementById('productos')
  const row = table.querySelector(`tr[rowId="${productId}"]`)
  if (row) {
    console.log("remove row", row)
    row.remove()
  }

})

socket.on('editarProducto', (data) => {
  console.log('Cliente. PUT')
  const product = data
  console.log("id del producto a actualizar: ", product._id)
  console.log("*** socket updated product: ***", product)

  const table = document.getElementById('productos')

  const row = table.querySelector(`tr[rowId="${product._id}"]`)

  if (row) {
    console.log("updated row", row)
    row.innerHTML = `
    <tr>
        <td>${product._id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td>${product.status}</td>
        <td>${product.code}</td>
        <td>
          <button onclick="deleteProduct('{{product._id}}')">Eliminar</button>
        </td>
    </tr>
    `
  }
})