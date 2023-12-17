const logout = async () => {
    console.log("funcion logout")
    try {
      await axios.post(`${process.env.BASE_URL}/api/session/logout`);
      window.location.href = '/'
    } catch (error) {
      console.error(error);
    }
}