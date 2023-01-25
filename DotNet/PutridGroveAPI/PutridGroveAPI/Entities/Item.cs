namespace PutridGroveAPI.Entities;

public class Item
{
    public Guid Id { get; set; }
    public DateTime CreatedAt {get;set; } = DateTime.Now;
    public string Name { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public string IconPath { get; set; }
    public bool IsShared { get; set; }
    public bool IsPayedOff { get; set; }
    public ICollection<ItemPayoff> itemPayOffs {get;set;}
    public User PayedBy {get;set;}
    public Guid PayedById {get;set;}
    
}