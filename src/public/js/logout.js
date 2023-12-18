const logout = async () => {
    console.log("funcion logout")
    try {
      await axios.post(`${url}/api/session/logout`);
      window.location.href = '/'
    } catch (error) {
      console.error(error);
    }
}