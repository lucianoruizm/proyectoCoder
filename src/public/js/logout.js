const logout = async () => {
    console.log("funcion logout")
    try {
      await axios.post(`http://localhost:8080/api/session/logout`);
      window.location.href = '/login'
    } catch (error) {
      console.error(error);
    }
}