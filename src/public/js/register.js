const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.querySelector('input[name="name"]').value;
  const lastname = document.querySelector('input[name="lastname"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const age = document.querySelector('input[name="age"]').value;
  const password = document.querySelector('input[name="password"]').value;

  const userData = {
    name,
    lastname,
    email,
    age,
    password
  };

  try {
    await axios.post('http://localhost:8080/api/session/register', userData);
    alert("Registro exitoso")
    registerForm.reset();
    window.location.href = '/login'
  } catch (error) {
    console.error("ERROR: ", error);
    alert("Error, verifique su email y/o si el password es valido")
  }
});