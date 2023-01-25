namespace PutridGroveAPI.Entities;

public class ItemPayoff
{
    public Guid Id { get; set; }
    public DateTime CreatedAt {get;set; } = DateTime.Now;
    public double Amount { get; set; }
    public User User { get; set; }
    public Guid UserId { get; set; }
    public Item Item { get; set; }
    public Guid ItemId { get; set; }
}