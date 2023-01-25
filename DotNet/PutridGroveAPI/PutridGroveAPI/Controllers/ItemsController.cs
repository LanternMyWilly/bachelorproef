using PutridGroveAPI.Models.Items;

namespace PutridGroveAPI.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PutridGroveAPI.Models.Users;
using PutridGroveAPI.Services;

[ApiController]
[Route("[controller]")]
public class ItemsController : ControllerBase
{
    private IItemService _itemService;
    private IMapper _mapper;

    public ItemsController(
        IItemService itemsService,
        IMapper mapper)
    {
        _itemService = itemsService;
        _mapper = mapper;
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        var items = _itemService.GetAll();
        return Ok(items);
    }

    [HttpGet("count")]
    public IActionResult GetCount()
    {
        var count = _itemService.GetCount();
        return Ok(count);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        var user = _itemService.GetById(id);
        return Ok(user);
    }

    [HttpPost]
    public IActionResult Create(CreateItemRequest model)
    {
        _itemService.Create(model);
        return Ok(new { message = "Item created" });
    }
}