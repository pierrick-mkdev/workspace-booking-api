namespace WorkSpace.Api.DTOs;

public class ResourceDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public bool IsAvailable { get; set; }
}