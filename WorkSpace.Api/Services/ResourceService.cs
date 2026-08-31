using Microsoft.EntityFrameworkCore;
using WorkSpace.Api.Data;
using WorkSpace.Api.DTOs;
using WorkSpace.Api.Models;

namespace WorkSpace.Api.Services;

public class ResourceService : IResourceService
{
    private readonly AppDbContext _context;
    
    public ResourceService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ResourceDto>> GetAllAsync()
    {
        return await _context.Resources
            .Select(r => new ResourceDto
            {
                Id = r.Id,
                Name = r.Name,
                Capacity = r.Capacity,
                IsAvailable = r.IsAvailable
            })
            .ToListAsync();
    }

    public async Task<ResourceDto?> GetByIdAsync(int id)
    {
        var resource = await _context.Resources.FindAsync(id);
        
        if (resource == null) return null;

        return new ResourceDto
        {
            Id = resource.Id,
            Name = resource.Name,
            Capacity = resource.Capacity,
            IsAvailable = resource.IsAvailable
        };
    }

    public async Task<ResourceDto> CreateAsync(CreateResourceDto createDto)
    {
        var resource = new Resource
        {
            Name = createDto.Name,
            Capacity = createDto.Capacity,
            IsAvailable = createDto.IsAvailable
        };

        _context.Resources.Add(resource);
        await _context.SaveChangesAsync();

        return new ResourceDto
        {
            Id = resource.Id,
            Name = resource.Name,
            Capacity = resource.Capacity,
            IsAvailable = resource.IsAvailable
        };
    }

    public async Task<bool> UpdateAsync(int id, ResourceDto updateDto)
    {
        var resource = await _context.Resources.FindAsync(id);
        
        if (resource == null) return false;

        resource.Name = updateDto.Name;
        resource.Capacity = updateDto.Capacity;
        resource.IsAvailable = updateDto.IsAvailable;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var resource = await _context.Resources.FindAsync(id);
        
        if (resource == null) return false;

        _context.Resources.Remove(resource);
        await _context.SaveChangesAsync();
        return true;
    }
}