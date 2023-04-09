import {User} from "../../db/entities/User";

export type UserDTO = Omit<User, 'password'>

export const getUserDTO = (user: User): UserDTO => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
})
