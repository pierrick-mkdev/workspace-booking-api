using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkSpace.Api.Data;
using WorkSpace.Api.Models;

namespace WorkSpace.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResourcesController : ControllerBase
{
    private readonly AppDbContext _context;
    
    public ResourcesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/resources
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Resource>>> GetResources()
    {
        return await _context.Resources.ToListAsync();
    }

    // GET: api/resources/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Resource>> GetResource(int id)
    {
        var resource = await _context.Resources.FindAsync(id);
        
        if (resource == null)
        {
            return NotFound();
        }

        return resource;
    }
    
    // POST: api/resources
    [HttpPost]
    public async Task<ActionResult<Resource>> CreateResource(Resource resource)
    {
        _context.Resources.Add(resource);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetResource), new { id = resource.Id }, resource);
    }
    
    // PUT: api/resources/1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateResource(int id, Resource resource)
    {
        if (id != resource.Id)
        {
            return BadRequest("L'ID de l'URL ne correspond pas à l'ID de l'objet.");
        }

        _context.Entry(resource).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ResourceExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent(); // Code HTTP 204
    }
    
    // DELETE: api/resources/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteResource(int id)
    {
        var resource = await _context.Resources.FindAsync(id);
        
        if (resource == null)
        {
            return NotFound();
        }

        _context.Resources.Remove(resource);
        await _context.SaveChangesAsync();

        return NoContent(); // Code HTTP 204
    }
    
    private bool ResourceExists(int id)
    {
        return _context.Resources.Any(e => e.Id == id);
    }
}