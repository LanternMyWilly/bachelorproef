using System.ComponentModel.DataAnnotations;

namespace PutridGroveAPI.Models.Items;

public class CreateItemRequest
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public double Price { get; set; } 
    [Required]
    public bool IsShared { get; set; }
    [Required]
    public bool IsPayedOff { get; set; }
    [Required]
    public Guid PayedById { get; set; }
    [Required]
    public string IconPath { get; set; }
}