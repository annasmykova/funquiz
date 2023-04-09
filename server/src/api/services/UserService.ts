import {AppDataSource} from '../../db/data-source';
import {User} from '../../db/entities/User';
import bcrypt from 'bcrypt'

class UserService {
  UserRepository = AppDataSource.getRepository(User)

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    try {  const saltRounds = 10;
      const password = await bcrypt.hash(user.password, saltRounds);
      const savedUser = await this.UserRepository.save({ ...user, password })

      return {
        ...savedUser,
        password: undefined
      }
    } catch (err) {
      console.error(err)
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.UserRepository.findOneBy({ email })
  }

  async getById(id: number): Promise<User | null> {
    return this.UserRepository.findOneById(id)
  }

  async validateUser(user: Omit<User, 'id'>) {

  }
}

export default new UserService()
