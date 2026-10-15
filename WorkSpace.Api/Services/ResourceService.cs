using Microsoft.EntityFrameworkCore;
using WorkSpace.Api.Data;
using WorkSpace.Api.DTOs;
using WorkSpace.Api.Models;

namespace WorkSpace.Api.Services;

public class ResourceService : IResourceService
{
    private readonly AppDbContext _context;
    private readonly IFileStorageService _fileStorageService;
    
    public ResourceService(AppDbContext context, IFileStorageService fileStorageService)
    {
        _context = context;
        _fileStorageService = fileStorageService;
    }

    public async Task<IEnumerable<ResourceDto>> GetAllAsync()
    {
        return await _context.Resources
            .Select(r => new ResourceDto
            {
                Id = r.Id,
                Name = r.Name,
                Capacity = r.Capacity,
                ImageUrl = r.ImageUrl
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
            ImageUrl = resource.ImageUrl
        };
    }

    public async Task<ResourceDto> CreateAsync(CreateResourceDto createDto)
    {
        string? imageUrl = null;
        
        if (createDto.Image != null)
        {
            imageUrl = await _fileStorageService.UploadFileAsync(createDto.Image);
        }
        
        var resource = new Resource
        {
            Name = createDto.Name,
            Capacity = createDto.Capacity,
            ImageUrl = imageUrl
        };

        _context.Resources.Add(resource);
        await _context.SaveChangesAsync();

        return new ResourceDto
        {
            Id = resource.Id,
            Name = resource.Name,
            Capacity = resource.Capacity,
            ImageUrl = resource.ImageUrl
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdateResourceDto updateDto)
    {
        var resource = await _context.Resources.FindAsync(id);
        
        if (resource == null) return false;

        resource.Name = updateDto.Name;
        resource.Capacity = updateDto.Capacity;
        
        if (updateDto.Image != null && updateDto.Image.Length > 0)
        {
            //Delete old image
            if (!string.IsNullOrEmpty(resource.ImageUrl))
            {
                await _fileStorageService.DeleteFileAsync(resource.ImageUrl);
            }

            //Upload new image
            resource.ImageUrl = await _fileStorageService.UploadFileAsync(updateDto.Image);
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var resource = await _context.Resources.FindAsync(id);
        
        if (resource == null) return false;

        if (!string.IsNullOrEmpty(resource.ImageUrl))
        {
            await _fileStorageService.DeleteFileAsync(resource.ImageUrl);
        }

        _context.Resources.Remove(resource);
        await _context.SaveChangesAsync();
        return true;
    }
}