import ItemPayoff from './itemPayoff';
import User from './user';

export default class Item {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public createdAt: Date,
    public price: number,
    public iconPath: string,
    public isShared: boolean,
    public isPayedOff: boolean,
    public itemPayOffs: ItemPayoff[],
    public payedBy: User,
    public payedById: string
  ) {}
}
