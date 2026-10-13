namespace WorkSpace.Api.DTOs;

public class UpdateResourceDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public IFormFile? Image { get; set; }
}