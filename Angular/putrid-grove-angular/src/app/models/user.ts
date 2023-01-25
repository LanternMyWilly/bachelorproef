import Item from './item';
import ItemPayoff from './itemPayoff';

export default class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public createdAt: Date,
    public email: string,
    public phoneNumber: string,
    public items: Item[],
    public itemPayOffs: ItemPayoff[],
    public payedBy: User
  ) {}
}
