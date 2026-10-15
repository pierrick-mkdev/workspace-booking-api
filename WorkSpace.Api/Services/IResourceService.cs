using WorkSpace.Api.DTOs;

namespace WorkSpace.Api.Services;

public interface IResourceService
{
    Task<IEnumerable<ResourceDto>> GetAllAsync();
    Task<ResourceDto?> GetByIdAsync(int id);
    Task<ResourceDto> CreateAsync(CreateResourceDto createDto);
    Task<bool> UpdateAsync(int id, UpdateResourceDto updateDto);
    Task<bool> DeleteAsync(int id);
}