
const deleteUser = async (userId) => {
  try {
    const deleteUser = await axios.delete(`${process.env.BASE_URL}/api/users/${userId}`)
    if (deleteUser.status === 200) {
      alert("User Eliminado")
      socket.emit('eliminarUser', userId)

      const newDate = new Date()

      const day = newDate.getDate().toString().padStart(2, '0')
      const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
      const year = newDate.getFullYear();
      const hour = newDate.getHours().toString().padStart(2, '0')
      const minutes = newDate.getMinutes().toString().padStart(2, '0')
      const seconds = newDate.getSeconds().toString().padStart(2, '0')
      
      const datetime = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`

      let body = {
        id: userId,
        datetime: datetime,
      }

      await axios.post(`${process.env.BASE_URL}/api/mail`, body)
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
    await axios.put(`${process.env.BASE_URL}/api/users/${idUser}`, userUpdated);
    alert("User actualizado")
  } catch (error) {
    alert("No se pudo actualizar el User")
    console.log(error);
  }
}