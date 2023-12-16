const deleteUser = async (userId) => {
  try {
    const deleteUser = await axios.delete(`http://localhost:8080/api/users/${userId}`)
    if (deleteUser.status === 200) {
      alert("User Eliminado")
      socket.emit('eliminarUser', userId)

      const fechaHoraActual = new Date();

      const dia = fechaHoraActual.getDate().toString().padStart(2, '0')
      const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0')
      const anio = fechaHoraActual.getFullYear();
      const horas = fechaHoraActual.getHours().toString().padStart(2, '0')
      const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0')
      const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0')

      const datetime = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`

      let body = {
        id: userId,
        datetime: datetime,
      }

      await axios.post(`http://localhost:8080/api/mail`, body)
    }
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