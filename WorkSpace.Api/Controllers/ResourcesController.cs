using Microsoft.AspNetCore.Mvc;
using WorkSpace.Api.Models;

namespace WorkSpace.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResourcesController : ControllerBase
{
    // Temporary in-memory storage for testing before connecting EF Core
    private static readonly List<Resource> Resources = new()
    {
        new Resource { Id = 1, Name = "Meeting Room A", Capacity = 10, IsAvailable = true },
        new Resource { Id = 2, Name = "Desk 42", Capacity = 1, IsAvailable = true }
    };

    // GET: api/resources
    [HttpGet]
    public ActionResult<IEnumerable<Resource>> GetAll()
    {
        return Ok(Resources);
    }

    // GET: api/resources/1
    [HttpGet("{id:int}")]
    public ActionResult<Resource> GetById(int id)
    {
        var resource = Resources.FirstOrDefault(r => r.Id == id);
        
        if (resource == null)
        {
            return NotFound();
        }

        return Ok(resource);
    }
}