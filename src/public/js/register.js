const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.querySelector('input[name="name"]').value;
  const lastname = document.querySelector('input[name="lastname"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const age = document.querySelector('input[name="age"]').value;
  const password = document.querySelector('input[name="password"]').value;
  let premium = document.getElementById('premiumCheckbox').checked;

  const userData = {
    name,
    lastname,
    email,
    age,
    password,
    premium,
  };

  try {
    const response = await axios.post(`${url}/api/session/register`, userData);
    console.log("DATOS CON LOS CUALES SE REGISTRO", userData)
    const body = {
      email: userData.email
    }
    console.log("email: ", email)
    const createCart = await axios.post(`${url}/api/carts`, body)
    console.log(createCart)

    alert("Registro exitoso")
    registerForm.reset();
    window.location.href = '/'
  } catch (error) {
    console.error("ERROR: ", error);
    alert("Error, verifique su email y/o si el password es valido")
  }
});