using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PutridGroveAPI.Entities;
using PutridGroveAPI.Helpers;
using PutridGroveAPI.Models.Items;
using PutridGroveAPI.Models.Users;

namespace PutridGroveAPI.Services;

public interface IItemService
{
    IEnumerable<Item> GetAll();
    Item GetById(Guid id);
    void Create(CreateItemRequest model);
    int GetCount();
}

public class ItemService : IItemService
{
    private DataContext _context;
    private readonly IMapper _mapper;

    public ItemService(
        DataContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public IEnumerable<Item> GetAll()
    {
        return _context.Items
            .Include(x => x.PayedBy)
            .Include(x => x.itemPayOffs)
            .ThenInclude(x => x.User);
    }
    
    public int GetCount()
    {
        return _context.Items.Count();
    }

    public Item GetById(Guid id)
    {
        return GetItem(id);
    }

    public void Create(CreateItemRequest model)
    {
        // map model to new user object
        var item = new Item {
            Name= model.Name,
            Description = model.Description,
            Price = model.Price,
            IsShared = model.IsShared,
            IsPayedOff = model.IsPayedOff,
            IconPath = model.IconPath,
            PayedById = model.PayedById
        };

        // save user
        _context.Items.Add(item);
        _context.SaveChanges();
    }
    
    private Item GetItem(Guid id)
    {
        var item = _context.Items
            .Include(x => x.PayedBy)
            .Include(x => x.itemPayOffs)
            .FirstOrDefault(i => i.Id.Equals(id));
        if (item == null) throw new KeyNotFoundException("Item not found");
        
        return item;
    }
}