
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

  const name = document.querySelector('input[name="nameEdit"]').value;
  const lastname = document.querySelector('input[name="lastnameEdit"]').value;
  const email = document.querySelector('input[name="emailEdit"]').value;
  const admin = document.querySelector('input[name="adminEdit"]').value;
  const premium = document.querySelector('input[name="premiumEdit"]').value;

  const userUpdated = {
    _id: idUser,
    name,
    lastname,
    email,
    admin,
    premium
  }

  console.log(userUpdated)

  try {
    await axios.put(`http://localhost:8080/api/users/${idUser}`, userUpdated);
    alert("User Editado")
    socket.emit('editarUser', JSON.stringify(userUpdated))
    userFormEdit.reset();
  } catch (error) {
    console.log(error);
  }
});