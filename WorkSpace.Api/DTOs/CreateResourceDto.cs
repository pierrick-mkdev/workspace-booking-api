namespace WorkSpace.Api.DTOs;

public class CreateResourceDto
{
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public IFormFile? Image { get; set; }
}