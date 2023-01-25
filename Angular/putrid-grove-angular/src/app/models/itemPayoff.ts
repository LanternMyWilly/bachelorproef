import User from './user';

export default class ItemPayoff {
  constructor(
    public id: string,
    public createdAt: string,
    public amount: number,
    public user: User,
    public userId: string,
    public itemId: string
  ) {}
}
