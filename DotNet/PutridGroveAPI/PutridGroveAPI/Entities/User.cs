namespace PutridGroveAPI.Entities;

public class User
{
    public Guid Id { get; set; }
    public DateTime CreatedAt {get;set; } = DateTime.Now;
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber {get;set;}
    public ICollection<Item> Items {get;set;}
    public ICollection<ItemPayoff> ItemPayoffs {get;set;}
}