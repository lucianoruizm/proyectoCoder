
const userFormDelete = document.getElementById('userFormDelete')
userFormDelete.addEventListener('submit', async (event) => {
  event.preventDefault()

  const idUser = document.querySelector('input[name="id"]').value;
  console.log(idUser)

  try {
    await axios.delete(`http://localhost:8080/api/users/${idUser}`);
    alert("User Eliminado")
    socket.emit('eliminarUser', idUser)
    userFormDelete.reset()
  } catch (error) {
    console.error(error)
  }
});

const userFormEdit = document.getElementById('userFormEdit');
userFormEdit.addEventListener('submit', async (event) => {
  event.preventDefault();

  const idUser = document.querySelector('input[name="idEdit"]').value;
  console.log(idUser)

  const rol = document.querySelector('select[name="rol"]').value;
  let premium
  
  const userUpdated = {
    _id: idUser,
    premium: rol === 'basic' ? premium === false : premium = true
  }

  console.log(userUpdated)

  try {
    socket.emit('editarUser', JSON.stringify(userUpdated))
    await axios.put(`http://localhost:8080/api/users/${idUser}`, userUpdated);
    alert("User actualizado")
    userFormEdit.reset();
  } catch (error) {
    alert("No se pudo actualizar el User")
    console.log(error);
  }
});