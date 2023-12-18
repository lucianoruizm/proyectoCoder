
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  const userData = {
    email,
    password
  };

  try {
    const response = await axios.post(`${url}/api/session/login`, userData);
    //alert("Inicio de sesion exitoso")
    console.log("RESPONSE: ", response.status)
    loginForm.reset();
    window.location.href = '/products'
  } catch (error) {
    alert("ERROR")
    console.log("ERROR LOGIN")
    console.error(error);
  }
});