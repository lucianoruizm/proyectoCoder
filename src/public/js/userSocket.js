const socket = io()

socket.on('eliminarUser', (userId) => {
  console.log('Cliente. DELETE', userId)

  const table = document.getElementById('users')
  const row = table.querySelector(`tr[rowId="${userId}"]`)
  if (row) {
    console.log("remove row", row)
    row.remove()
  }
})

socket.on('editarUser', (data) => {
  console.log('Cliente. PUT')
  const user = data
  console.log("id del user a actualizar: ", user._id)
  console.log("*** socket updated user: ***", user)

  const table = document.getElementById('users')

  const row = table.querySelector(`tr[rowId="${user._id}"]`)

  if (row) {
    console.log("updated row", row)
    row.innerHTML = `
    <tr>
        <td>${user._id}</td>
        <td>${row.cells[1].outerText}</td>
        <td>${row.cells[2].outerText}</td>
        <td>${row.cells[3].outerText}</td>
        <td>${row.cells[4].outerText}</td>
        ${
          user.premium ? 
          `<td>Premium</td>
            <td>
              <button class="deleteBtn" onclick="deleteUser('${user._id}')">Eliminar</button>
              <button class="editBtn" onclick="editUser('${user._id}','${user.premium}')">Cambiar Rol</button>
            </td>
          ` : 
          `<td>Basico</td>
           <td>
              <button class="deleteBtn" onclick="deleteUser('${user._id}')">Eliminar</button>
              <button class="editBtn" onclick="editUser('${user._id}', 'basic')">Cambiar Rol</button>
           </td>
          `
        }
    </tr>
    `
  }
})
