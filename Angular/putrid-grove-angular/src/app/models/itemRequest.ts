export default class ItemRequest {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public iconPath: string,
    public isShared: boolean,
    public isPayedOff: boolean,
    public payedById: string
  ) {}
}
