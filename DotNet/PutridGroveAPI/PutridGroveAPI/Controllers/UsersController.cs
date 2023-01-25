using PutridGroveAPI.Services;

namespace PutridGroveAPI.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private IUserService _userService;
    private IMapper _mapper;

    public UsersController(
        IUserService userService,
        IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();
        return Ok(users);
    }
    
    [HttpGet("count")]
    public IActionResult GetCount()
    {
        var count = _userService.GetCount();
        return Ok(count);
    }

    [HttpGet("highesttotaluser")]
    public IActionResult GetHighestTotalUser()
    {
        return Ok(_userService.GetHighestTotalUser());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _userService.GetById(id);
        return Ok(user);
    }
}