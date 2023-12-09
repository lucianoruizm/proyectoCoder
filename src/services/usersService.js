const UsersRepository = require('../repositories/user.repository')

class UsersService {
    constructor() {
        this.repository = new UsersRepository()
    }

    async getUsers (filter, params) {
      try {
        
        const users = await this.repository.getAll(filter, params)

        return users
      } catch (err) {
        return `No se encontraron users, ${err}`;
      }
    }

    async getUserById(id) {
      try {
        const user = await this.repository.getOne(id);

        console.log('Producto encontrado por ID:', id)
        return user
        
      } catch (e) {
        console.log('Error: ', e);
        return `Error al obtener user con ID: ${id}`;
      }
    }

    async updateUser (id, data) {
          try {
            const user = await this.getUserById(id)
    
            if (!user) {
              console.log('No se encuentra user a actualizar con ID:', id)
              return `No se encuentra user a actualizar con ID: ${id}`
            }

            const userUpdated = {
              _id: user._id,
              admin: data.admin,
              premium: data.admin,
            }

            await this.repository.update({ _id: id}, userUpdated)
            console.log('User actualizado correctamente con ID:', id, data)
            return userUpdated
          }
          catch (e) {
            console.log('Error al actualizar el user', e)
            return `Error al actualizar el user: ${e}`
          }
      }

      async deleteUser (id) {
        try {
          const user = await this.getUserById(id);
  
          if (!user) {
            console.log('No se encuentra user a eliminar con ID:', id)
            return `No se encuentra user a eliminar con ID: ${id}`
          }

          await this.repository.delete({ _id: id})
          console.log('user eliminado con ID:', id)
          return true
        }
        catch (e) {
          console.log('Error al eliminar el user', e)
          return `Error al eliminar el user: ${e}`
        }
      }
}

module.exports = UsersService;