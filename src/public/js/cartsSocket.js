const socket = io()

socket.on('eliminarProductoDelCart', (productId) => {
    console.log('Cliente. DELETE FROM CART', productId)
  
    const table = document.getElementById('cartTable')
    const row = table.querySelector(`tr[rowId="${productId}"]`)
    if (row) {
      console.log("remove row", row)
      row.remove()
    }
  
})

socket.on('sumarProducto', (data) => {
  console.log('Cliente. Sumar cantidad del Producto')
  console.log("id del producto a actualizar: ", data.productId)
  console.log("*** socket updated product quantity: ***", data.quantity)

  const table = document.getElementById('cartTable')

  const row = table.querySelector(`tr[rowId="${data.productId}"]`)

  if (row) {
    console.log("updated row", row)

    // Obtén los valores originales de la fila
    const originalTitle = row.querySelector('td:nth-child(1)').textContent;
    const originalDescription = row.querySelector('td:nth-child(2)').textContent;
    const originalPrice = row.querySelector('td:nth-child(3)').textContent;
    const originalStatus = row.querySelector('td:nth-child(4)').textContent;
    const originalCategory = row.querySelector('td:nth-child(5)').textContent;

    // Actualiza solo la cantidad manteniendo los otros valores
    row.innerHTML = `
      <td>${originalTitle}</td>
      <td>${originalDescription}</td>
      <td>${originalPrice}</td>
      <td>${originalStatus}</td>
      <td>${originalCategory}</td>
      <td>${data.quantity}</td>
      <td>
          <button class="substractBtn" onclick="substractFunction('${data.productId}','${data.quantity}')">-</button>
      </td>
      <td>
          <button class="addBtn" onclick="sumFunction('${data.productId}','${data.quantity}')">+</button>
      </td>
      <td>
          <button class="deleteBtn" onclick="deleteFromCart('${data.productId}')">Eliminar</button>
      </td>
    `;
  }
})

socket.on('restarProducto', (data) => {
    console.log('Cliente. Restar cantidad del Producto')
    console.log("id del producto a actualizar: ", data.productId)
    console.log("*** socket updated product quantity: ***", data.quantity)

    const table = document.getElementById('cartTable')
  
    const row = table.querySelector(`tr[rowId="${data.productId}"]`)
  
    if (row) {
      console.log("updated row", row)
  
      // Obtén los valores originales de la fila
      const originalTitle = row.querySelector('td:nth-child(1)').textContent;
      const originalDescription = row.querySelector('td:nth-child(2)').textContent;
      const originalPrice = row.querySelector('td:nth-child(3)').textContent;
      const originalStatus = row.querySelector('td:nth-child(4)').textContent;
      const originalCategory = row.querySelector('td:nth-child(5)').textContent;
  
      // Actualiza solo la cantidad manteniendo los otros valores
      row.innerHTML = `
        <td>${originalTitle}</td>
        <td>${originalDescription}</td>
        <td>${originalPrice}</td>
        <td>${originalStatus}</td>
        <td>${originalCategory}</td>
        <td>${data.quantity}</td>
        <td>
            <button onclick="substractFunction('${data.productId}','${data.quantity}')">-</button>
        </td>
        <td>
            <button onclick="sumFunction('${data.productId}','${data.quantity}')">+</button>
        </td>
        <td>
            <button onclick="deleteFromCart('${data.productId}')">Delete</button>
        </td>
      `;
    }
})

socket.on('limpiarCart', () => {
    console.log('Cliente. CLEAR CART')
  
    const table = document.getElementById('cartTable')

    if (table) {
      console.log("remove table", table)
      table.remove()
    }
  
})