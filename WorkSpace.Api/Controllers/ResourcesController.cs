using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkSpace.Api.Data;
using WorkSpace.Api.DTOs;
using WorkSpace.Api.Models;
using WorkSpace.Api.Services;

namespace WorkSpace.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResourcesController : ControllerBase
{
    private readonly IResourceService _resourceService;
    private readonly IValidator<CreateResourceDto> _validator;

    public ResourcesController(
        IResourceService resourceService,
        IValidator<CreateResourceDto> validator)
    {
        _resourceService = resourceService;
        _validator = validator;
    }

    // GET: api/resources
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Resource>>> GetResources()
    {
        IEnumerable<ResourceDto> resources = await _resourceService.GetAllAsync();
        return Ok(resources);
    }

    // GET: api/resources/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Resource>> GetResource(int id)
    {
        ResourceDto? resource = await _resourceService.GetByIdAsync(id);
        
        if (resource == null)
        {
            return NotFound();
        }

        return Ok(resource);
    }
    
    // POST: api/resources
    [HttpPost]
    public async Task<ActionResult<Resource>> CreateResource(CreateResourceDto createDto)
    {
        var validationResult = await _validator.ValidateAsync(createDto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.ToDictionary());
        }
        
        ResourceDto createdResource = await _resourceService.CreateAsync(createDto);
        return CreatedAtAction(nameof(GetResource), new { id = createdResource.Id }, createdResource);
    }
    
    // PUT: api/resources/1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateResource(int id, ResourceDto updateDto)
    {
        if (id != updateDto.Id)
        {
            return BadRequest("URL ID does not match object ID");
        }

        bool updated = await _resourceService.UpdateAsync(id, updateDto);
        
        if (!updated) return NotFound();

        return NoContent(); // Code HTTP 204
    }
    
    // DELETE: api/resources/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteResource(int id)
    {
        bool deleted = await _resourceService.DeleteAsync(id);
        
        if (!deleted) return NotFound();

        return NoContent(); // Code HTTP 204
    }
}