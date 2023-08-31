import IUser from './IUser';

export default interface IUsersModel {
  findByEmail(email: string): Promise<IUser | null>,
}
