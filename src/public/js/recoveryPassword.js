const recoveryForm = document.getElementById('recoveryForm');
recoveryForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="recoveryPassword"]').value;

  const userData = {
    email,
    password
  };

  try {
    const response = await axios.post(`${url}/api/session/recovery-password`, userData);
    
    recoveryForm.reset();
    window.location.href = '/'
  } catch (error) {
    alert("ERROR")
    console.error(error);
  }
});