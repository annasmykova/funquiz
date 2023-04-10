import {AppDataSource} from '../../db/data-source';
import {User} from '../../db/entities/User';
import bcrypt from 'bcrypt'

class UserService {
  repository = AppDataSource.getRepository(User)

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    try {  const saltRounds = 10;
      const password = await bcrypt.hash(user.password, saltRounds);
      return this.repository.save({ ...user, password })
    } catch (err) {
      console.error(err)
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email })
  }

  async getById(id: number): Promise<User | null> {
    return this.repository.findOneById(id)
  }

  async validateUser(user: Omit<User, 'id'>) {

  }
}

export default new UserService()
