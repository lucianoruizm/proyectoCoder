const deleteUser = async (userId) => {
  console.log(userId)
  try {
    await axios.delete(`http://localhost:8080/api/users/${userId}`);
    alert("User Eliminado")
    socket.emit('eliminarUser', userId)
  } catch (error) {
    console.error(error)
  }
}

const editUser = async (idUser, rol) => {
  console.log(idUser)
  
  const userUpdated = {
    _id: idUser,
    premium: rol === 'basic' ? true : false
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
}